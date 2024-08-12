import useMessageSocket from '~/hooks/socket/useMessageSocket'
import useConversationStore from '~/store/conversation.store'
import EmptyMessage from './components/EmptyMessage'
import MessageCenter from './components/MessageCenter'
import ProfileRight from './components/ProfileRight'
import ResultSearchMessage from './components/ResultSearchMessage'
import SideBarMessage from './components/SideBarMessage'
import useMessageStore from '~/store/message.store'
import useVideoCallMessageSocket from '~/hooks/socket/useVideoCallMessageSocket'
import InComingCallVideo from './components/InComingCallVideo'
import { useEffect } from 'react'

const Message = () => {
  useMessageSocket()

  const { selectedConversation, toggleBoxSearchMessage } = useConversationStore()
  // let showMessage = Object.keys(selectedConversation).length > 0 ? true : false
  return (
    <div className='relative -m-2.5 overflow-hidden border dark:border-slate-700'>
      <div className='dark:bg-dark2 flex bg-white '>
        {/* sidebar */}
        {toggleBoxSearchMessage ? <ResultSearchMessage /> : <SideBarMessage />}
        {/* message center */}
        <MessageCenter />
        {/* <MessageCenter /> */}
        {/* user profile right info */}
        <ProfileRight />
      </div>
    </div>
  )
}

export default Message
