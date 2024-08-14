import useMessageSocket from '~/hooks/socket/useMessageSocket'
import useConversationStore from '~/store/conversation.store'
import MessageCenter from './components/MessageCenter'
import ProfileRight from './components/ProfileRight'
import ResultSearchMessage from './components/ResultSearchMessage'
import SideBarMessage from './components/SideBarMessage'
import { useQueryInfinifyConversation } from './hooks/useQueryInfinifyConversation'
import EmptyMessage from './components/EmptyMessage'

const Message = () => {
  useMessageSocket()
  const { data } = useQueryInfinifyConversation()
  const { selectedConversation, toggleBoxSearchMessage } = useConversationStore()
  let showMessage = Object.keys(selectedConversation).length > 0 ? true : false
  const emptyConversation = data?.pages?.flat() && data?.pages?.flat().length > 0 ? true : false

  return (
    <div className='relative -m-2.5 overflow-hidden border dark:border-slate-700'>
      <div className='dark:bg-dark2 flex bg-white '>
        {/* sidebar */}
        {toggleBoxSearchMessage ? <ResultSearchMessage /> : <SideBarMessage />}
        {/* message center */}
        {emptyConversation || showMessage ? <MessageCenter /> : <EmptyMessage />}
        {/* <MessageCenter /> */}
        {/* user profile right info */}
        <ProfileRight />
      </div>
    </div>
  )
}

export default Message
