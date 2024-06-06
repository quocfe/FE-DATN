import React from 'react'
import { IonIcon } from '@ionic/react'
import ChatMessage from './components/ChatMessage'
import SideBarMessage from './components/SideBarMessage'
import useConversationStore from '~/store/conversation.store'
import SendMessage from './components/SendMessage'
import MessageCenter from './components/MessageCenter'
import EmptyMessage from './components/EmptyMessage'
import ProfileRight from './components/ProfileRight'
import ResultSearchMessage from './components/ResultSearchMessage'

const Message = () => {
  const { selectedConversation, selectedNoConversation, toggleBoxSearchMessage } = useConversationStore()

  let groupName = selectedConversation
    ? selectedConversation.group_name
    : `${selectedNoConversation?.first_name} ${selectedNoConversation?.last_name}`

  let groupImg = selectedConversation
    ? selectedConversation.group_thumbnail
    : selectedNoConversation
      ? selectedNoConversation.Profile.profile_picture
      : ''

  let groupId = selectedConversation
    ? selectedConversation.group_message_id
    : selectedNoConversation
      ? selectedNoConversation.user_id
      : ''

  let show = selectedConversation ? selectedConversation : selectedNoConversation

  return (
    <div className='relative -m-2.5 overflow-hidden border dark:border-slate-700'>
      <div className='dark:bg-dark2 flex bg-white '>
        {/* sidebar */}
        {toggleBoxSearchMessage ? <ResultSearchMessage /> : <SideBarMessage />}
        {/* message center */}
        {show === null ? (
          <EmptyMessage />
        ) : (
          <MessageCenter groupName={groupName} groupImg={groupImg} groupId={groupId} />
        )}
        {/* user profile right info */}
        <ProfileRight groupName={groupName} groupImg={groupImg} groupId={groupId} />
      </div>
    </div>
  )
}

export default Message
