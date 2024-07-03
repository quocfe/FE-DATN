import { IonIcon } from '@ionic/react'
import { memo, useEffect, useLayoutEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import useAuthStore from '~/store/auth.store'
import useConversationStore from '~/store/conversation.store'
import { formatDate } from '~/utils/helpers'
import { useQueryMessage } from '../hooks/useQueryMessage'
import { useQueryInfinifyMessage } from '../hooks/useQueryInfinifyMessage'
import Spinner from './Skelaton/Spinner'
import { FileMsg, ImageMsg, TextMsg, VideoMsg } from './TypeMessage'
import PreviewFileUpload from './components/PreviewFileUpload'
import useMessageStore from '~/store/message.store'
import { handleToOldMessage } from '../utils/handleToOldMessage'

// Define TypeScript interfaces

interface ChatMessageProps {
  showScrollBtn: boolean
  isAtBottom: boolean
}

// Group messages by date
const groupMessagesByDate = (messages: TypeMessage[]): Record<string, TypeMessage[]> => {
  return messages.reduce(
    (acc, message) => {
      const date = new Date(message.createdAt).toDateString()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(message)
      return acc
    },
    {} as Record<string, TypeMessage[]>
  )
}

// Check if the time should be shown between messages
const shouldShowTime = (currentMessage: TypeMessage, previousMessage?: TypeMessage): boolean => {
  if (!previousMessage) return true
  const currentTime = new Date(currentMessage.createdAt).getTime()
  const previousTime = new Date(previousMessage.createdAt).getTime()
  return currentTime - previousTime >= 5 * 60 * 1000 // 5 minutes in milliseconds
}

const ChatMessage: React.FC<ChatMessageProps> = ({ showScrollBtn, isAtBottom }) => {
  const { selectedConversation } = useConversationStore()
  const { profile } = useAuthStore()
  const bottomRef = useRef<HTMLDivElement>(null)
  const { data: messageData } = useQueryMessage()
  const infoMessage = messageData?.data?.data?.info
  const { data: dataMsg, isFetchingNextPage, hasNextPage, fetchNextPage } = useQueryInfinifyMessage()
  const { ref, inView } = useInView({ threshold: 1 })
  const [showNewMsg, setShowNewMsg] = useState(false)
  const { goToOldMessage } = useMessageStore()
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
  }, [selectedConversation.id])

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

  console.log('newArr', newArr)
  const handleGoToOldMsg = async () => {
    const IdMsg = goToOldMessage

    const element = document.getElementById(IdMsg)

    if (element) {
      handleToOldMessage(IdMsg)
    } else {
      while (hasNextPage) {
        await fetchNextPage()
        console.log('dataMsg', dataMsg)
        if (!hasNextPage) {
          break
        }
        handleToOldMessage(IdMsg)
      }
    }
  }

  const groupedMessagesByDate = useMemo(() => groupMessagesByDate(newArr.flat() as TypeMessage[]), [newArr])

  return (
    <div className='relative'>
      {!hasNextPage && (
        <div className='py-10 text-center text-sm lg:pt-8'>
          <img src={infoMessage?.avatar} className='mx-auto mb-3 h-24 w-24 rounded-full object-cover' />
          <div className='mt-8'>
            <div className='text-base font-medium text-black md:text-xl dark:text-white'>{infoMessage?.group_name}</div>
            <div className='text-sm text-gray-500 dark:text-white/80'>@{infoMessage?.group_id}</div>
          </div>
          <div className='mt-3.5'>
            <a href='timeline.html' className='inline-block rounded-lg bg-secondery px-4 py-1.5 text-sm font-semibold'>
              View profile
            </a>
          </div>
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
                      {new Date(item.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                  {item.message_id === lastRef?.message_id ? <div className='ref' ref={ref} /> : null}
                  {item.type === 1 && <TextMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 2 && <ImageMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 3 && <FileMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 4 && <VideoMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                </div>
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
      <div ref={bottomRef} className='h-[20px]' />
    </div>
  )
}

export default memo(ChatMessage)
