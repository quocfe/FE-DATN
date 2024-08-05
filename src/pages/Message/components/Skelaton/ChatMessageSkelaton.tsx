import { IonIcon } from '@ionic/react'
import React from 'react'

function ChatMessageSkelaton() {
  return (
    <div className='flex-1'>
      {/* chat heading */}
      <div className='flex w-full items-center justify-between gap-2 border-b px-6 py-3.5'>
        <div className='flex items-center gap-2 sm:gap-4'>
          {/* toggle for mobile */}
          <button type='button' className='md:hidden' aria-expanded='true'>
            <IonIcon
              icon='chevron-back-outline'
              className='md hydrated -ml-4 text-2xl'
              role='img'
              aria-label='chevron back outline'
            />
          </button>
          <div className='relative cursor-pointer max-md:hidden' tabIndex={0} aria-expanded='true'>
            <div className='h-8 w-8 rounded-full bg-slate-300' />
            <div className='absolute bottom-0 right-0 m-px h-2 w-2 rounded-full ' />
          </div>
          <div className='cursor-pointer' tabIndex={0} aria-expanded='true'>
            <div className='text-base font-bold'>
              <div className='h-6 w-[100px] rounded bg-slate-300' />
            </div>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <button type='button' className='rounded-full p-1.5 hover:bg-slate-100'>
            <div className='h-6 w-6 rounded-full bg-slate-300' />
          </button>
          <button type='button' className='rounded-full p-1.5 hover:bg-slate-100'>
            <div className='h-6 w-6 rounded-full bg-slate-300' />
          </button>
          <button type='button' className='rounded-full p-1.5 hover:bg-slate-100' aria-expanded='true'>
            <div className='h-6 w-6 rounded-full bg-slate-300' />
          </button>
        </div>
      </div>
      {/* chats bubble */}
      <div className='h-[calc(100vh-195px)] w-full overflow-y-auto p-5 py-10 md:h-[calc(100vh-204px)]'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`mt-6 flex ${i % 2 ? 'flex-row-reverse' : 'flex-row'}  gap-3`}>
            <div className='h-9 w-9 rounded-full bg-slate-300' />
            <div className='max-w-sm rounded-[10px] bg-slate-300 px-4 py-2'>
              <div className='h-3 w-[100px] bg-slate-300' />
            </div>
          </div>
        ))}
      </div>
      {/* input area */}
      <div className='flex w-full items-center gap-3 border-t p-5 md:gap-5 '>
        <button type='button' className='rounded-full p-2 text-2xl text-gray-600 hover:bg-gray-100'>
          <div className='h-6 w-6 rounded-full bg-slate-300' />
        </button>
        <input type='text' className='min-w-0 flex-1 rounded-full border-gray-100' />
        <div className='flex gap-2 md:gap-3'>
          <button type='button' className='rounded-full p-2 text-xl text-gray-600 hover:bg-gray-100'>
            <div className='h-6 w-6 rounded-full bg-slate-300' />
          </button>
          <button type='button' className='rounded-full p-2 text-xl text-gray-600 hover:bg-gray-100'>
            <div className='h-6 w-6 rounded-full bg-slate-300' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatMessageSkelaton
