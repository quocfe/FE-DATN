import { IonIcon } from '@ionic/react'
import useMessageFixStore, { MessageFix } from '~/store/messageFix.store'

function HiddenMessageFix({ message_fix }: { message_fix: any }) {
  const { removeHiddenMessageFix, setMessageFix } = useMessageFixStore()
  const handleOpenMessageFix = () => {
    setMessageFix(message_fix)
    removeHiddenMessageFix(message_fix.group_id)
  }
  return (
    <div className='relative cursor-pointer group'>
      <img
        onClick={handleOpenMessageFix}
        src={message_fix.avatar}
        alt='img'
        className='object-cover rounded-full h-14 w-14'
      />
      <div className='absolute top-0 flex items-center justify-center w-3 h-3 p-2 bg-red-500 rounded-full'>
        <p className='text-[10px] text-white'>1</p>
      </div>
      <div
        onClick={() => removeHiddenMessageFix(message_fix.group_id)}
        className='absolute top-0 right-0 items-center justify-center hidden rounded-full bg-slate-300 group-hover:flex '
      >
        <IonIcon className='text-[18px] text-white' name='close' />
      </div>
    </div>
  )
}

export default HiddenMessageFix
