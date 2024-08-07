import React from 'react'

function BlockUi() {
  return (
    <div className='h-full w-full bg-secondery'>
      <div className='flex h-fit w-full flex-col items-center justify-center gap-2 p-2'>
        <p className='text-[12px] font-semibold'>Bạn đã chặn tin nhắn và cuộc gọi từ tài khoản này.</p>
        <p className='text-[10px]'>Các bạn sẽ không thể nhắn tin hay gọi điện cho nhau trong đoạn chat này.</p>
        <button className='w-full rounded-md border bg-white p-2 text-[13px] font-semibold hover:border hover:bg-secondery'>
          Bỏ chặn
        </button>
      </div>
    </div>
  )
}

export default BlockUi
