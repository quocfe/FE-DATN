import React from 'react'

function EmptyMessage() {
  return (
    <div className='mx-auto hidden flex-col items-center justify-around md:flex'>
      <p className='text-xl font-bold text-primary'>Chào mừng đến mới devbook, nơi bạn có thể trò chuyện với bạn bè</p>
      <img
        className='h-[288px] w-[380px] object-cover'
        src='https://chat.zalo.me/assets/quick-message-onboard.3950179c175f636e91e3169b65d1b3e2.png'
        alt=''
      />
    </div>
  )
}

export default EmptyMessage
