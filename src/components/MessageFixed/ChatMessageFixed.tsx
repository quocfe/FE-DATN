import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import useConversationStore from '~/store/conversation.store'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import PreviewFileUpload from '~/pages/Message/components/components/PreviewFileUpload'
import StatusMessage from '~/pages/Message/components/components/StatusMessage'
import useAuthStore from '~/store/auth.store'
import { MessageFix } from '~/store/messageFix.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import { formatDate } from '~/utils/helpers'
import Spinner from './../../pages/Message/components/Skelaton/Spinner'
import { AudioMsg, FileMsg, ImageMsg, TextMsg, VideoCallMsg, VideoMsg } from './TypeMessageFix'
import { useQueryInfinifyMessageFix } from './hooks/useQueryInfinifyMessageFix'

type props = {
  message_fix: MessageFix
  infoMessage: InfoMessage
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

const ChatMessageFixed = ({ message_fix, infoMessage, isAtBottom }: props) => {
  const scrollIntoViewFn = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ block: 'end' })
    }
  }

  useEffect(() => {
    scrollIntoViewFn()
  }, [])

  const { toggleBoxReply, togglePreviewBox } = useConversationStore()
  const { user_id, first_name, last_name, Profile } = getProfileFromLocalStorage()
  const boxReplyRef = useRef<HTMLDivElement>(null)
  const previewUploadRef = useRef<HTMLDivElement>(null)
  const [calculateHeight, setCalculateHeight] = useState<number>(0)
  const { data: dataMsg, isFetchingNextPage, hasNextPage, fetchNextPage } = useQueryInfinifyMessageFix(message_fix)

  useLayoutEffect(() => {
    if (toggleBoxReply || togglePreviewBox) {
      let height = 204

      if (boxReplyRef.current) {
        height = boxReplyRef.current.getBoundingClientRect().height + 0
      }

      if (previewUploadRef.current) {
        height = previewUploadRef.current.getBoundingClientRect().height + 0
      }

      setCalculateHeight(height)
    } else {
      setCalculateHeight(0)
    }
  }, [toggleBoxReply, togglePreviewBox])

  const { profile } = useAuthStore()
  const bottomRef = useRef<HTMLDivElement>(null)

  const { ref, inView } = useInView()
  const [showNewMsg, setShowNewMsg] = useState(false)

  const newArr = useMemo(() => {
    if (dataMsg?.pages?.length) {
      return dataMsg.pages.slice().reverse()
    }
    return []
  }, [dataMsg])

  const lastArrRefs = newArr[0]
  const lastRef = lastArrRefs && lastArrRefs[0]

  useEffect(() => {
    if (!isAtBottom && isFetchingNextPage) {
      scrollIntoViewFn()
    }
  }, [newArr.flat().length])

  useEffect(() => {
    scrollIntoViewFn()
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

  // if (true) {
  //   return (
  //     <div className='flex items-center justify-center w-full h-full'>
  //       <Spinner w='20' h='20' />
  //     </div>
  //   )
  // }

  return (
    <div className='relative'>
      {!hasNextPage && (
        <div className='py-5 text-center text-sm lg:pt-8'>
          <img src={infoMessage?.avatar} className='mx-auto mb-3 h-24 w-24 rounded-full object-cover' />
          <div className='mt-2'>
            <div className='text-[12px] text-base font-medium text-black dark:text-white '>
              {infoMessage?.group_name}
            </div>
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
      {dataMsg && dataMsg?.pages.length > 0 && (
        <div className='space-y-1 text-sm font-medium'>
          {Object.entries(groupedMessagesByDate).map(([date, dayMessages]) => (
            <div className='space-y-1' key={date}>
              <div className='text-center text-[10px] text-gray-500 dark:text-gray-400'>{formatDate(date)}</div>
              {dayMessages.map((item, index) => {
                const previousMessage = index > 0 ? dayMessages[index - 1] : undefined
                const nextMessage = index < dayMessages.length - 1 ? dayMessages[index + 1] : undefined
                const showTime = shouldShowTime(item, previousMessage)
                const showImg =
                  !nextMessage || nextMessage.createdBy !== item.createdBy || shouldShowTime(nextMessage, item)
                return (
                  <>
                    {showTime && (
                      <div className='text-center text-[10px] text-gray-500 dark:text-gray-400'>
                        {new Date(item?.createdAt).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    )}
                    {item?.message_id === lastRef?.message_id ? <div className='ref' ref={ref} /> : null}
                    {item?.type === 0 && <p className='my-2 text-center text-[8px]'>{item.body}</p>}
                    {item?.type === 1 && (
                      <TextMsg
                        message_fix={message_fix}
                        infoMessage={infoMessage}
                        showImg={showImg}
                        item={item}
                        userid={profile?.user_id || ''}
                      />
                    )}
                    {item?.type === 2 && (
                      <ImageMsg
                        message_fix={message_fix}
                        infoMessage={infoMessage}
                        showImg={showImg}
                        item={item}
                        userid={profile?.user_id || ''}
                      />
                    )}
                    {item?.type === 3 && (
                      <FileMsg
                        message_fix={message_fix}
                        infoMessage={infoMessage}
                        showImg={showImg}
                        item={item}
                        userid={profile?.user_id || ''}
                      />
                    )}
                    {item?.type === 4 && (
                      <VideoMsg
                        message_fix={message_fix}
                        infoMessage={infoMessage}
                        showImg={showImg}
                        item={item}
                        userid={profile?.user_id || ''}
                      />
                    )}
                    {item?.type === 5 && (
                      <AudioMsg
                        message_fix={message_fix}
                        infoMessage={infoMessage}
                        showImg={showImg}
                        item={item}
                        userid={profile?.user_id || ''}
                      />
                    )}
                    {item?.type === 6 && (
                      <VideoCallMsg
                        message_fix={message_fix}
                        infoMessage={infoMessage}
                        showImg={showImg}
                        item={item}
                        userid={profile?.user_id || ''}
                      />
                    )}
                  </>
                )
              })}
            </div>
          ))}
          <PreviewFileUpload />
        </div>
      )}
      {showStatus && <StatusMessage group_id_fixed={message_fix.group_id} />}
      <div ref={bottomRef} className='h-[10px]' id='bottomRef' />
    </div>
  )
}

export default memo(ChatMessageFixed)
