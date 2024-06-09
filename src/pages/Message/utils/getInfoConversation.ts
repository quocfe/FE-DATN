import useConversationStore from '~/store/conversation.store'

function getInfoConversation() {
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
    ? selectedConversation.type === 1
      ? selectedConversation.user_id
      : selectedConversation.group_message_id
    : selectedNoConversation
      ? selectedNoConversation.user_id
      : ''

  return { groupName, groupImg, groupId }
}

export default getInfoConversation
