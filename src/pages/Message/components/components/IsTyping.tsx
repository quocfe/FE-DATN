import { memo, useEffect, useState } from 'react'
import useTypingMessageSocket from '~/hooks/socket/useTypingMessageSocket'
import { getProfileFromLocalStorage } from '~/utils/auth'
import isTypingLogo from '../../../../assets/images/isTyping.gif'
import useConversationStore from '~/store/conversation.store'

const IsTyping = ({ group_id, type }: { group_id: string; type: 'normal' | 'fixed' }) => {
  useTypingMessageSocket()
  // alert('Typing')

  const [timeOutTyping, setTimeOutTyping] = useState<boolean>(false)
  const { isTyping, isNotTyping, selectedConversation, setIsNotTyping } = useConversationStore()
  const profile = getProfileFromLocalStorage()
  const { group_message_id, fullname } = isTyping ?? { group_message_id: '', fullname: '' }

  // dừng typing sau 5s nếu ko nhập gì thêm
  useEffect(() => {
    const time = setTimeout(() => {
      setIsNotTyping(true)
    }, 5000)
    return () => clearTimeout(time)
  }, [isTyping])

  if (!isNotTyping && group_message_id === group_id)
    return (
      <div
        className={`typing absolute left-0 flex items-center justify-center  ${type === 'fixed' ? '-top-[10px] bg-transparent p-1 text-[10px] ' : 'bottom-[55px] bg-transparent p-1 text-[12px] '} `}
      >
        <p>{`${fullname} đang nhập ...`}</p>
      </div>
    )
}

export default memo(IsTyping)
