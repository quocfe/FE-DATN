import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Dialog from '~/components/Dialog'
import useMutationUnblockedUser from '~/hooks/mutations/user/useMutationUnblockedUser'
import { useQueryInfinifyMessage } from '../../hooks/useQueryInfinifyMessage'
import { useQueryMessage } from '../../hooks/useQueryMessage'
import BlockOrUnBlockUserInMsg from '~/components/BlockOrUnBlockUserInMsg'

function BlockUi({ user_id }: { user_id: string }) {
  const [showDiaLog, setShowDiaLog] = useState<boolean>(false)
  const { refetch: refreshMsg } = useQueryMessage()

  return (
    <>
      <div className='h-full w-full bg-secondery'>
        <div className='flex h-fit w-full flex-col items-center justify-center gap-2 p-2'>
          <p className='text-[12px] font-semibold'>Bạn đã chặn tin nhắn và cuộc gọi từ tài khoản này.</p>
          <p className='text-[10px]'>Các bạn sẽ không thể nhắn tin hay gọi điện cho nhau trong đoạn chat này.</p>
          <button
            onClick={() => setShowDiaLog(true)}
            className='w-full rounded-md border bg-white p-2 text-[13px] font-semibold hover:border hover:bg-secondery'
          >
            Bỏ chặn
          </button>
        </div>
      </div>
      <BlockOrUnBlockUserInMsg type={'unBlock'} show={showDiaLog} setShow={setShowDiaLog} user_id={user_id} />
    </>
  )
}

export default BlockUi
