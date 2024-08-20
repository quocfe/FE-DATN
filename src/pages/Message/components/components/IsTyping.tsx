import { memo } from 'react'
import useTypingMessageSocket from '~/hooks/socket/useTypingMessageSocket'
import { getProfileFromLocalStorage } from '~/utils/auth'
import isTypingLogo from '../../../../assets/images/isTyping.gif'
import useConversationStore from '~/store/conversation.store'

const IsTyping = ({ group_id, type }: { group_id: string; type: 'normal' | 'fixed' }) => {
  useTypingMessageSocket()

  const { isTyping, isNotTyping, selectedConversation } = useConversationStore()
  const profile = getProfileFromLocalStorage()
  const { group_message_id, fullname } = isTyping ?? { group_message_id: '', fullname: '' }

  if (!isNotTyping && group_message_id === group_id)
    return (
      <div
        className={`absolute left-0 flex items-center justify-center  ${type === 'fixed' ? '-top-[10px] bg-transparent p-1 text-[10px] ' : '-top-[25px] bg-white p-1 text-[12px] shadow-sm '} `}
      >
        <p>{`${fullname} đang nhập`}</p>
        <img src={isTypingLogo} className={`${type === 'fixed' ? 'h-2' : 'h-4 '} w-10 object-cover`} alt='Typing...' />
      </div>
    )
}

export default memo(IsTyping)
