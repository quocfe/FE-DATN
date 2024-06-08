type configType = {
  item: TypeMessage
  userid: string | undefined
}

export function configTypeMessage({ item, userid }: configType) {
  const me = item.createdBy === userid
  const deleteFromOthers = item.detelectedBy === userid && item.status === false
  const recall = item.status === true
  const haveReplyMessage = item.parent_id
  const userRep = me
    ? item.createdBy === item.replyMessage.createdBy
      ? 'Bạn đã trả lời chính mình'
      : `Bạn đã trả lời ${item.replyMessage.reply_user}`
    : item.createdBy === item.replyMessage.createdBy
      ? `${item.user_name} đã trả lời chính mình`
      : `${item.user_name}  đã trả lời bạn`

  return {
    me,
    deleteFromOthers,
    recall,
    haveReplyMessage,
    userRep
  }
}
