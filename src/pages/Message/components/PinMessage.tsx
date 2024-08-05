import { IonIcon } from '@ionic/react'

function PinMessage() {
  return (
    <div className='absolute left-0 top-full flex h-[60px] w-full items-center border-b border-t bg-white px-4 py-2 dark:border-slate-700'>
      <div className='flex w-full items-center justify-between gap-2'>
        <IonIcon icon='chatbubble-ellipses-outline' className='text-[25px]' />
        <div className='flex flex-1 flex-col items-start justify-between text-[13px]'>
          <p className='font-bold'>Tin nhắn</p>
          <p className=''>
            <span className='font-semibold'>Người gửi</span>: hihihi
          </p>
        </div>
        <p className='cursor-pointer text-[12px] font-semibold'>Xem tất cả</p>
      </div>
    </div>
  )
}

export default PinMessage
