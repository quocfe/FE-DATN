import React from 'react'
import { ImageMsg, TextMsg } from './TypeMessage'

import useConversationStore from '~/store/conversation.store'
import { useQueryMessage } from '../hooks/useQueryMessage'
import useAuthStore from '~/store/auth.store'

const ChatMessage = () => {
  const { selectedConversation } = useConversationStore()
  const { data, isLoading } = useQueryMessage()
  const { profile } = useAuthStore()

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className='py-10 text-center text-sm lg:pt-8'>
        <img src={selectedConversation?.group_thumbnail} className='mx-auto mb-3 h-24 w-24 rounded-full' />
        <div className='mt-8'>
          <div className='text-base font-medium text-black md:text-xl dark:text-white'>
            {' '}
            {selectedConversation?.group_name || 'Groupname'}
          </div>
          <div className='text-sm text-gray-500 dark:text-white/80'> @{selectedConversation?.group_message_id} </div>
        </div>
        <div className='mt-3.5'>
          <a href='timeline.html' className='inline-block rounded-lg bg-secondery px-4 py-1.5 text-sm font-semibold'>
            View profile
          </a>
        </div>
      </div>
      <div className='space-y-6 text-sm font-medium'>
        {data?.data?.data.map((item: any, index: number) => {
          switch (item.type) {
            case 1:
              return <TextMsg key={index} item={item} userid={profile?.user_id} />
            case 2:
              return <TextMsg key={index} item={item} userid={profile?.user_id} />
            default:
              break
          }
        })}
      </div>
    </>
  )
}

export default ChatMessage
