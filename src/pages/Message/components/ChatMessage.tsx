import React, { memo, useEffect, useRef, useState } from 'react'
import { FileMsg, ImageMsg, TextMsg } from './TypeMessage'

import useConversationStore from '~/store/conversation.store'
import { useQueryMessage } from '../hooks/useQueryMessage'
import useAuthStore from '~/store/auth.store'
import { IonIcon } from '@ionic/react'

const ChatMessage = ({ groupName, groupImg, groupId, showScrollBtn }: MessageCenterProps) => {
  const { data } = useQueryMessage()
  const { selectedConversation, setMessages } = useConversationStore()
  const { profile } = useAuthStore()
  const bottomRef = useRef<HTMLInputElement>(null)
  const chatMessageRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView()
  }, [selectedConversation])

  useEffect(() => {
    if (data) setMessages(data?.data?.data)
  }, [data])

  return (
    <div ref={chatMessageRef} className='relative'>
      <div className='py-10 text-center text-sm lg:pt-8'>
        <img src={groupImg} className='mx-auto mb-3 h-24 w-24 rounded-full' />
        <div className='mt-8'>
          <div className='text-base font-medium text-black md:text-xl dark:text-white'> {groupName || 'Groupname'}</div>
          <div className='text-sm text-gray-500 dark:text-white/80'> @{groupId} </div>
        </div>
        <div className='mt-3.5'>
          <a href='timeline.html' className='inline-block rounded-lg bg-secondery px-4 py-1.5 text-sm font-semibold'>
            View profile
          </a>
        </div>
      </div>
      <div className='space-y-2 text-sm font-medium'>
        {data?.data?.data.map((item: TypeMessage, index: number) => {
          switch (item.type) {
            case 1:
              return <TextMsg key={index} item={item} userid={profile?.user_id} />
            case 2:
              return <ImageMsg key={index} item={item} userid={profile?.user_id} />
            case 3:
              return <FileMsg key={index} item={item} userid={profile?.user_id} />
            default:
              break
          }
        })}
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
