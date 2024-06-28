import { memo } from 'react'
import useTypingMessageSocket from '~/hooks/socket/useTypingMessageSocket'
import { getProfileFromLocalStorage } from '~/utils/auth'
import isTypingLogo from '../../../../assets/images/isTyping.gif'
import useConversationStore from '~/store/conversation.store'

function IsTyping() {
  useTypingMessageSocket()
  const { isTyping, isNotTyping } = useConversationStore()
  const profile = getProfileFromLocalStorage()
  const fullname = `${profile?.first_name} ${profile?.last_name}`

  if (isTyping !== fullname && !isNotTyping)
    return (
      <div className='absolute -top-[25px] left-0 flex items-center justify-center bg-white p-1 text-[12px] shadow-sm'>
        <p>{`${isTyping} đang nhập`}</p>
        <img src={isTypingLogo} className='h-4 w-10 object-cover' alt='Typing...' />
      </div>
    )
}

export default memo(IsTyping)
