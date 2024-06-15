import { memo, useEffect, useRef } from 'react'
import { FileMsg, ImageMsg, TextMsg, VideoMsg } from './TypeMessage'

import { IonIcon } from '@ionic/react'
import useAuthStore from '~/store/auth.store'
import useConversationStore from '~/store/conversation.store'
import { useQueryMessage } from '../hooks/useQueryMessage'
import { calculateTimeAgo, formatDate, formatTime } from '~/utils/helpers'

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

const groupMessagesByHour = (messages: TypeMessage[]): Record<string, TypeMessage[]> => {
  return messages.reduce(
    (acc, message) => {
      const time = new Date(message.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })

      if (!acc[time]) {
        acc[time] = []
      }
      acc[time].push(message)
      return acc
    },
    {} as Record<string, TypeMessage[]>
  )
}

const shouldShowTime = (currentMessage: TypeMessage, previousMessage?: TypeMessage): boolean => {
  if (!previousMessage) return true
  const currentTime = new Date(currentMessage.createdAt).getTime()
  const previousTime = new Date(previousMessage.createdAt).getTime()
  return currentTime - previousTime >= 10 * 60 * 1000
}
const ChatMessage = ({ showScrollBtn }: MessageCenterProps) => {
  const { selectedConversation } = useConversationStore()
  const { profile } = useAuthStore()
  const bottomRef = useRef<HTMLInputElement>(null)
  const chatMessageRef = useRef<HTMLInputElement>(null)
  const { data } = useQueryMessage()
  const infoMessage = data?.data?.data?.info
  const messages = data?.data?.data?.messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView()
  }, [selectedConversation, messages])

  const groupedMessages = groupMessagesByDate(messages || [])
  const groupedMessagesByTime = groupMessagesByHour(messages || [])

  return (
    <div ref={chatMessageRef} className='relative'>
      <div className='py-10 text-center text-sm lg:pt-8'>
        <img src={infoMessage?.avatar} className='mx-auto mb-3 h-24 w-24 rounded-full' />
        <div className='mt-8'>
          <div className='text-base font-medium text-black md:text-xl dark:text-white'> {infoMessage?.group_name}</div>
          <div className='text-sm text-gray-500 dark:text-white/80'> @{infoMessage?.group_id} </div>
        </div>
        <div className='mt-3.5'>
          <a href='timeline.html' className='inline-block rounded-lg bg-secondery px-4 py-1.5 text-sm font-semibold'>
            View profile
          </a>
        </div>
      </div>
      <div className='text-sm font-medium '>
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <div className='space-y-2'>
              <div className='my-1 text-center text-xs text-gray-500 dark:text-gray-400'>{formatDate(date)}</div>
              {msgs.map((item: TypeMessage, index: number) => {
                switch (item.type) {
                  case 1:
                    return <TextMsg key={index} item={item} userid={profile?.user_id || ''} />
                  case 2:
                    return <ImageMsg key={index} item={item} userid={profile?.user_id || ''} />
                  case 3:
                    return <FileMsg key={index} item={item} userid={profile?.user_id || ''} />
                  case 4:
                    return <VideoMsg key={index} item={item} userid={profile?.user_id || ''} />
                  default:
                    return null
                }
              })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div
        className={`${showScrollBtn ? 'visible' : 'hidden'}  fixed bottom-[100px] left-[70%] flex cursor-pointer items-center rounded-full bg-white p-2 text-primary shadow-inner `}
        onClick={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })}
      >
        <IonIcon icon='arrow-down' />
      </div>
    </div>
  )
}

export default memo(ChatMessage)
