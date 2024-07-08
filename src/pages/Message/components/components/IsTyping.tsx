import { memo } from 'react'
import useTypingMessageSocket from '~/hooks/socket/useTypingMessageSocket'
import { getProfileFromLocalStorage } from '~/utils/auth'
import isTypingLogo from '../../../../assets/images/isTyping.gif'
import useConversationStore from '~/store/conversation.store'

function IsTyping() {
  useTypingMessageSocket()
  const { isTyping, isNotTyping, selectedConversation } = useConversationStore()
  const profile = getProfileFromLocalStorage()
  const { group_message_id, fullname } = isTyping ?? { group_message_id: '', fullname: '' }

  if (!isNotTyping && group_message_id === selectedConversation.group_id)
    return (
      <div className='absolute -top-[25px] left-0 flex items-center justify-center bg-white p-1 text-[12px] shadow-sm'>
        <p>{`${fullname} đang nhập`}</p>
        <img src={isTypingLogo} className='object-cover w-10 h-4' alt='Typing...' />
      </div>
    )
}

export default memo(IsTyping)
