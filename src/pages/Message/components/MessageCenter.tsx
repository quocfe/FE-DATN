import { IonIcon } from '@ionic/react'
import React from 'react'
import useConversationStore from '~/store/conversation.store'
import ChatMessage from './ChatMessage'
import SendMessage from './SendMessage'

function MessageCenter({ groupName, groupImg, groupId }: MessageCenterProps) {
  return (
    <div className='flex-1'>
      {/* chat heading */}
      <div className='w- uk-animation-slide-top-medium z-10 flex items-center justify-between gap-2 border-b px-6 py-3.5 dark:border-slate-700'>
        <div className='flex items-center gap-2 sm:gap-4'>
          {/* toggle for mobile */}
          <button type='button' className='md:hidden' uk-toggle='target: #side-chat ; cls: max-md:-translate-x-full'>
            <IonIcon icon='chevron-back-outline' className='-ml-4 text-2xl' />
          </button>
          <div className='relative cursor-pointer max-md:hidden' uk-toggle='target: .rightt ; cls: hidden'>
            <img
              src={groupImg ? groupImg : 'src/assets/images/avatars/avatar-6.jpg'}
              className='h-8 w-8 rounded-full shadow'
            />
            <div className='absolute bottom-0 right-0 m-px h-2 w-2 rounded-full bg-teal-500' />
          </div>
          <div className='cursor-pointer' uk-toggle='target: .rightt ; cls: hidden'>
            <div className='text-base font-bold'> {groupName || 'Groupname'}</div>
            <div className='text-xs font-semibold text-green-500'> Online</div>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <button type='button' className='button__ico'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-6 w-6'>
              <path
                fillRule='evenodd'
                d='M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          <button type='button' className='rounded-full p-1.5 hover:bg-slate-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
              />
            </svg>
          </button>
          <button
            type='button'
            className='rounded-full p-1.5 hover:bg-slate-100'
            uk-toggle='target: .rightt ; cls: hidden'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
              />
            </svg>
          </button>
        </div>
      </div>
      {/* chats bubble */}
      <div className='h-[calc(100vh-195px)] w-full overflow-y-auto p-5 py-10 md:h-[calc(100vh-204px)]'>
        <ChatMessage groupName={groupName} groupImg={groupImg} groupId={groupId} />
      </div>
      {/* sending message area */}
      <SendMessage groupId={groupId} />
    </div>
  )
}

export default MessageCenter
