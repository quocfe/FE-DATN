import { memo, useEffect, useRef } from 'react'
import { FileMsg, ImageMsg, TextMsg, VideoMsg } from './TypeMessage'
import { IonIcon } from '@ionic/react'
import useAuthStore from '~/store/auth.store'
import useConversationStore from '~/store/conversation.store'
import { useQueryMessage } from '../hooks/useQueryMessage'
import { calculateTimeAgo, formatDate } from '~/utils/helpers'
import useFileUploadStore from '~/store/fileUpload.store'

//gom các message cùng ngày
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

// fn hiện thị thời gian
const shouldShowTime = (currentMessage: TypeMessage, previousMessage?: TypeMessage): boolean => {
  if (!previousMessage) return true
  const currentTime = new Date(currentMessage.createdAt).getTime()
  const previousTime = new Date(previousMessage.createdAt).getTime()
  return currentTime - previousTime >= 5 * 60 * 1000 // 5 minutes in milliseconds
}

const ChatMessage = ({ showScrollBtn }: { showScrollBtn: boolean }) => {
  const { selectedConversation, togglePreviewImg } = useConversationStore()
  const { profile } = useAuthStore()
  const bottomRef = useRef<HTMLInputElement>(null)
  const chatMessageRef = useRef<HTMLInputElement>(null)
  const { data } = useQueryMessage()
  const infoMessage = data?.data?.data?.info
  const messages = data?.data?.data?.messages
  const { file: fileStore, setFile } = useFileUploadStore()
  console.log(fileStore.progress)
  useEffect(() => {
    bottomRef.current?.scrollIntoView()
  }, [selectedConversation, messages])

  const groupedMessagesByDate = groupMessagesByDate(messages || [])
  return (
    <div ref={chatMessageRef} className='relative'>
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
      <div className='space-y-2 text-sm font-medium'>
        {Object.entries(groupedMessagesByDate).map(([date, dayMessages]) => (
          <div className='space-y-2' key={date}>
            <div className='text-center text-xs text-gray-500 dark:text-gray-400'>{formatDate(date)}</div>
            {dayMessages.map((item: TypeMessage, index: number) => {
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

                  {item.type === 1 && <TextMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 2 && <ImageMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 3 && <FileMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 4 && <VideoMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                </div>
              )
            })}
          </div>
        ))}
        {/* {fileStore.progress < 100 && togglePreviewImg?.type.includes('video') && (
          <video
            src={URL.createObjectURL(togglePreviewImg)}
            className='object-cover w-16 overflow-hidden rounded-sm h-14 shrink-0 opacity-70'
          ></video>
        )} */}
        {fileStore.progress < 100 && (
          <img
            src={URL.createObjectURL(togglePreviewImg)}
            className='h-14 w-16 shrink-0 overflow-hidden rounded-sm object-cover opacity-70'
          />
        )}

        <div ref={bottomRef} />
      </div>
      <div
        className={`${showScrollBtn ? 'visible' : 'hidden'} fixed bottom-[100px] left-[70%] flex cursor-pointer items-center rounded-full bg-white p-2 text-primary shadow-inner`}
        onClick={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })}
      >
        <IonIcon icon='arrow-down' />
      </div>
    </div>
  )
}

export default memo(ChatMessage)
