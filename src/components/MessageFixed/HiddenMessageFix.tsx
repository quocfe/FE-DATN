import { IonIcon } from '@ionic/react'
import { useEffect, useState } from 'react'
import { useSocketContext } from '~/context/socket'
import useQueryNotifyMessage from '~/hooks/queries/message/useQueryNotifyMessage'
import useNotifyMessage from '~/pages/Message/hooks/useNotifyMessage'
import { useQueryInfinifyConversation } from '~/pages/Message/hooks/useQueryInfinifyConversation'
import { checkBodyMessage } from '~/pages/Message/utils/checkBodyMessage'
import useMessageFixStore, { MessageFix } from '~/store/messageFix.store'
import { getProfileFromLocalStorage } from '~/utils/auth'

function HiddenMessageFix({ message_fix }: { message_fix: MessageFix }) {
  const { removeHiddenMessageFix, setMessageFix } = useMessageFixStore()
  const { data } = useQueryInfinifyConversation()
  const { user_id } = getProfileFromLocalStorage()
  const [body, setBody] = useState<string>('')
  // const [openSub, setOpenSub] = useState<boolean>(false)
  const conversation = data?.pages.flat().filter((c) => c.group_message_id === message_fix.group_id) as GroupMessage[]
  const { showNotify, numberNotify, notifyLength } = useNotifyMessage(message_fix.group_id, user_id)

  const handleOpenMessageFix = () => {
    setMessageFix(message_fix)
    removeHiddenMessageFix(message_fix.group_id)
  }

  return (
    <div className='group relative cursor-pointer'>
      <img
        onClick={handleOpenMessageFix}
        src={message_fix.avatar}
        alt='img'
        className='h-14 w-14 rounded-full object-cover'
      />
      {showNotify && (
        <div className='absolute top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 p-2'>
          <p className='text-[10px] font-semibold text-white'>{numberNotify}</p>
        </div>
      )}
      <div
        onClick={() => removeHiddenMessageFix(message_fix.group_id)}
        className='absolute right-0 top-0 hidden items-center justify-center rounded-full bg-slate-300 group-hover:flex '
      >
        <IonIcon className='text-[18px] text-white' name='close' />
      </div>
    </div>
  )
}

export default HiddenMessageFix
