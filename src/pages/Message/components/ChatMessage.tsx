import { IonIcon } from '@ionic/react'
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import useAuthStore from '~/store/auth.store'
import useConversationStore from '~/store/conversation.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import { formatDate } from '~/utils/helpers'
import { useQueryInfinifyMessage } from '../hooks/useQuery/useQueryInfinifyMessage'
import { useQueryMessage } from '../hooks/useQuery/useQueryMessage'
import Spinner from './Skelaton/Spinner'
import { AudioMsg, FileMsg, ImageMsg, TextMsg, VideoCallMsg, VideoMsg } from './TypeMessage'
import PreviewFileUpload from './components/PreviewFileUpload'
import StatusMessage from './components/StatusMessage'
import { milliseconds } from 'date-fns'

interface ChatMessageProps {
  showScrollBtn: boolean
  isAtBottom: boolean
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

const ChatMessage: React.FC<ChatMessageProps> = ({ showScrollBtn, isAtBottom }) => {
  const { selectedConversation } = useConversationStore()

  const scrollIntoViewFn = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ block: 'end' })
    }
  }

  useLayoutEffect(() => {
    scrollIntoViewFn()
  }, [selectedConversation.group_id])

  const { profile } = useAuthStore()
  const bottomRef = useRef<HTMLDivElement>(null)
  const { data: messageData } = useQueryMessage(1, 3)
  const infoMessage = messageData?.data?.data?.info
  const { data: dataMsg, isFetchingNextPage, hasNextPage, fetchNextPage } = useQueryInfinifyMessage()
  const { ref, inView } = useInView({ threshold: 0.25 })
  const [showNewMsg, setShowNewMsg] = useState(false)
  const { user_id } = getProfileFromLocalStorage()

  const newArr = useMemo(() => {
    if (dataMsg?.pages?.length) {
      // slice: sao chép data
      return dataMsg.pages.slice().reverse()
    }
    return []
  }, [dataMsg])

  const lastArrRefs = newArr[0]
  const lastRef = lastArrRefs && lastArrRefs[0]

  // useEffect(() => {
  //   console.log('test 1')
  //   if (!isAtBottom && isFetchingNextPage) {
  //     console.log('scrolling 1')
  //     scrollIntoViewFn()
  //   }
  // }, [newArr.flat().length])

  useEffect(() => {
    if (isAtBottom) {
      console.log('scrolling 2')
      scrollIntoViewFn()
    } else {
      setShowNewMsg(true)
    }
  }, [newArr?.flat().slice(-1)[0]])

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  useEffect(() => {
    isAtBottom && setShowNewMsg(false)
  }, [isAtBottom])

  const groupedMessagesByDate = useMemo(() => groupMessagesByDate(newArr.flat() as TypeMessage[]), [newArr])
  const showStatus =
    newArr.flat()[newArr.flat().length - 1]?.createdBy === user_id && newArr.flat()[newArr.flat().length - 1]?.type != 0
  // console.log('groupedMessagesByDate', groupedMessagesByDate)
  return (
    <div className='relative'>
      {!hasNextPage && (
        <div className='py-10 text-center text-sm lg:pt-8'>
          <img src={infoMessage?.avatar} className='mx-auto mb-3 h-24 w-24 rounded-full object-cover' />
          <div className='mx-auto mt-4 w-[70%]'>
            <h3 className='truncate text-center text-base font-medium text-black md:text-xl'>
              {infoMessage?.group_name}
            </h3>
          </div>

          {selectedConversation.type != 2 && (
            <div className='mt-2.5'>
              {infoMessage?.group_id && (
                <Link
                  to={`/profile/${infoMessage.group_id}`}
                  className='inline-block rounded-lg bg-secondery px-4 py-1.5 text-sm font-semibold'
                >
                  Xem trang cá nhân
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
          <div className='space-y-2'>
            <div className='text-center text-xs text-gray-500 dark:text-gray-400'>{formatDate(date)}</div>
            {dayMessages.map((item, index) => {
              const previousMessage = index > 0 ? dayMessages[index - 1] : undefined
              const nextMessage = index < dayMessages.length - 1 ? dayMessages[index + 1] : undefined
              const showTime = shouldShowTime(item, previousMessage)
              const showImg =
                !nextMessage || nextMessage.createdBy !== item?.createdBy || shouldShowTime(nextMessage, item)
              return (
                <>
                  {showTime && (
                    <div className='text-center text-[10px] text-gray-500 dark:text-gray-400'>
                      {new Date(item?.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                  {item?.message_id === lastRef?.message_id ? <div className='ref' ref={ref} /> : null}
                  {item?.type === 0 && <p className='my-2 text-center text-[10px]'>{item?.body}</p>}
                  {item?.type === 1 && <TextMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item?.type === 2 && <ImageMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item?.type === 3 && <FileMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item?.type === 4 && <VideoMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item?.type === 5 && <AudioMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item?.type === 6 && <VideoCallMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                </>
              )
            })}
          </div>
        ))}
        <PreviewFileUpload />
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
      {showStatus && <StatusMessage />}
      <div ref={bottomRef} className='refMsg h-[1px]' />
    </div>
  )
}

export default memo(ChatMessage)
