import { IonIcon } from '@ionic/react'
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useAuthStore from '~/store/auth.store'
import useConversationStore from '~/store/conversation.store'
import { formatDate } from '~/utils/helpers'

import { getProfileFromLocalStorage } from '~/utils/auth'
import { Link } from 'react-router-dom'
import { useQueryMessage } from '~/pages/Message/hooks/useQueryMessage'
import { useQueryInfinifyMessage } from '~/pages/Message/hooks/useQueryInfinifyMessage'
import Spinner from '~/pages/Message/components/Skelaton/Spinner'
import { AudioMsg, FileMsg, ImageMsg, TextMsg, VideoCallMsg, VideoMsg } from './TypeMessageFix'
import { MessageFix } from '~/store/messageFix.store'
import messageApi from '~/apis/message.api'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

interface ChatMessageProps {
  showScrollBtn: boolean
  isAtBottom: boolean
  message_fix: MessageFix
  infoMessage: InfoMessage
}

// Tin nhan theo ngay
const groupMessagesByDate = (messages: TypeMessage[]): Record<string, TypeMessage[]> => {
  return messages.reduce(
    (acc, message) => {
      const date = new Date(message?.createdAt).toDateString()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(message)
      return acc
    },
    {} as Record<string, TypeMessage[]>
  )
}

const shouldShowTime = (currentMessage: TypeMessage, previousMessage?: TypeMessage): boolean => {
  if (!previousMessage) return true
  const currentTime = new Date(currentMessage.createdAt).getTime()
  const previousTime = new Date(previousMessage.createdAt).getTime()
  return currentTime - previousTime >= 5 * 60 * 1000 // 5 minutes in milliseconds
}

const ChatMessage: React.FC<ChatMessageProps> = ({ showScrollBtn, isAtBottom, message_fix, infoMessage }) => {
  const { profile } = useAuthStore()
  const bottomRef = useRef<HTMLDivElement>(null)

  const fetchMessage = async ({ pageParam }: { pageParam: number }) => {
    if (message_fix.type === 1) {
      const data = await messageApi.getOneToOneMessage(message_fix.id, pageParam, 30)
      return data.data.data.messages
    } else if (message_fix.type === 2) {
      const data = await messageApi.getGroupMessage(message_fix.id, pageParam, 30)
      return data.data.data.messages
    }
  }

  const {
    data: dataMsg,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['messageInfinity', message_fix.id],
    queryFn: fetchMessage,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length === 30) {
        return allPages.length + 1
      } else {
        return undefined
      }
    }
  })

  const { ref, inView } = useInView({ threshold: 0.25 })
  const [showNewMsg, setShowNewMsg] = useState(false)
  const { user_id } = getProfileFromLocalStorage()
  const newArr = useMemo(() => {
    if (dataMsg?.pages?.length) {
      return dataMsg.pages.slice().reverse()
    }
    return []
  }, [dataMsg])

  const lastArrRefs = newArr[0]
  const lastRef = lastArrRefs && lastArrRefs[0]

  const scrollIntoViewFn = useCallback(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ block: 'end' })
    }
  }, [])

  useLayoutEffect(() => {
    scrollIntoViewFn()
  }, [message_fix.group_id])

  useEffect(() => {
    if (!isAtBottom && isFetchingNextPage) {
      scrollIntoViewFn()
    }
  }, [newArr.flat().length])

  useEffect(() => {
    if (isAtBottom) {
      scrollIntoViewFn()
    } else {
      setShowNewMsg(true)
    }
  }, [newArr?.flat().slice(-1)[0]])

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('fire')
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  useEffect(() => {
    isAtBottom && setShowNewMsg(false)
  }, [isAtBottom])

  const groupedMessagesByDate = useMemo(() => groupMessagesByDate(newArr.flat() as TypeMessage[]), [newArr])
  const showStatus =
    newArr.flat()[newArr.flat().length - 1]?.createdBy === user_id && newArr.flat()[newArr.flat().length - 1]?.type != 0

  return (
    <div className='relative'>
      {!hasNextPage && (
        <div className='py-5 text-center text-sm lg:pt-8'>
          <img src={infoMessage?.avatar} className='mx-auto mb-3 h-24 w-24 rounded-full object-cover' />
          <div className='mt-2'>
            <div className='text-[12px] text-base font-medium text-black dark:text-white '>
              {infoMessage?.group_name}
            </div>
            {message_fix.type != 2 && (
              <div className='text-[12px] text-gray-500 dark:text-white/80'>@{infoMessage?.group_id}</div>
            )}
          </div>

          {message_fix.type != 2 && (
            <div className='mt-2.5'>
              {infoMessage?.group_id && (
                <Link
                  to={`/profile/${infoMessage.group_id}`}
                  className='inline-block rounded-lg bg-secondery px-2 py-1 text-sm font-semibold'
                >
                  View profile
                </Link>
              )}
            </div>
          )}
        </div>
      )}
      {isFetchingNextPage && (
        <Spinner classNames='flex items-center justify-center' w='6' h='6' title='Đang tải tin nhắn' />
      )}
      <div className='space-y-2 text-sm font-medium'>
        {Object.entries(groupedMessagesByDate).map(([date, dayMessages]) => (
          <div className='space-y-2' key={date}>
            <div className='text-center text-xs text-gray-500 dark:text-gray-400'>{formatDate(date)}</div>
            {dayMessages.map((item, index) => {
              const previousMessage = index > 0 ? dayMessages[index - 1] : undefined
              const nextMessage = index < dayMessages.length - 1 ? dayMessages[index + 1] : undefined
              const showTime = shouldShowTime(item, previousMessage)
              const showImg =
                !nextMessage || nextMessage.createdBy !== item.createdBy || shouldShowTime(nextMessage, item)
              return (
                <div key={item.message_id}>
                  {showTime && (
                    <div className='text-center text-[10px] text-gray-500 dark:text-gray-400'>
                      {new Date(item?.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                  {item.message_id === lastRef?.message_id ? <div className='ref' ref={ref} /> : null}
                  {item.type === 0 && <p className='my-2 text-center text-[8px]'>{item.body}</p>}
                  {item.type === 1 && <TextMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 2 && <ImageMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 3 && <FileMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 4 && <VideoMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 5 && <AudioMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 6 && <VideoCallMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                </div>
              )
            })}
          </div>
        ))}
        {/* <PreviewFileUpload /> */}
      </div>
      <div
        className={`${showScrollBtn ? 'visible' : 'hidden'} fixed bottom-[100px] left-[70%] flex cursor-pointer items-center rounded-full bg-white p-2 text-primary shadow-inner`}
        onClick={() => {
          setShowNewMsg(false)
          scrollIntoViewFn()
        }}
      >
        <div className='flex flex-row items-center gap-2'>
          {showNewMsg && <p className='text-[12px] font-semibold'>Tin nhắn mới</p>}
          <IonIcon icon='arrow-down' />
        </div>
      </div>
      {/* {showStatus && <StatusMessage />} */}
      <div ref={bottomRef} className='h-[10px]' />
    </div>
  )
}

export default memo(ChatMessage)
