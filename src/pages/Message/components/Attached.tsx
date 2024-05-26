import React from 'react'
import { IonIcon } from '@ionic/react'

function Attached() {
  return (
    <div
      className='dropbar dark:via-900 h-60 bg-gradient-to-t from-white from-30% via-white via-30% pt-36 dark:from-slate-900'
      uk-drop='stretch: x; target: #message__wrap ;animation:  slide-bottom ;animate-out: true; pos: top-left; offset:10 ; mode: click ; duration: 200'
    >
      <div
        className='flex justify-center gap-5 p-3 sm:w-full'
        uk-scrollspy='target: > button; cls: uk-animation-slide-bottom-small; delay: 100;repeat:true'
      >
        <button
          type='button'
          className='dark:bg-dark3 shrink-0 rounded-full border border-sky-100 bg-sky-50 p-2.5 text-sky-600 shadow-sm duration-100 hover:scale-[1.15] dark:border-0'
        >
          <IonIcon className='flex text-3xl' icon='image' />
        </button>
        <button
          type='button'
          className='dark:bg-dark3 shrink-0 rounded-full border border-green-100 bg-green-50 p-2.5 text-green-600 shadow-sm duration-100 hover:scale-[1.15] dark:border-0'
        >
          <IonIcon className='flex text-3xl' icon='images' />
        </button>
        <button
          type='button'
          className='dark:bg-dark3 shrink-0 rounded-full border border-pink-100 bg-pink-50 p-2.5 text-pink-600 shadow-sm duration-100 hover:scale-[1.15] dark:border-0'
        >
          <IonIcon className='flex text-3xl' icon='document-text' />
        </button>
        <button
          type='button'
          className='dark:bg-dark3 shrink-0 rounded-full border border-orange-100 bg-orange-50 p-2.5 text-orange-600 shadow-sm duration-100 hover:scale-[1.15] dark:border-0'
        >
          <IonIcon className='flex text-3xl' icon='gift' />
        </button>
      </div>
    </div>
  )
}

export default Attached
