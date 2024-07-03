type configType = {
  item: TypeMessage
  userid: string
}

export function configTypeMessage({ item, userid }: configType) {
  const me = item.createdBy === userid

  const deleteFromOthers = item.recalls.find((r: any) => r.user_id === userid)
  const check = item.replyMessage.recallInReply?.filter((re: any) => re.message_id === item.replyMessage.message_id)
  const check2 = check?.some((re: any) => re.user_id === userid)
  // console.log('deleteFromOthers', deleteFromOthers)
  const recall = item.status === false ? true : false
  const haveReplyMessage = item.parent_id
  const userRep = haveReplyMessage
    ? me
      ? item.createdBy === item.replyMessage.createdBy
        ? 'Bạn đã trả lời chính mình'
        : `Bạn đã trả lời ${item.replyMessage.reply_user}`
      : item.createdBy === item.replyMessage.createdBy
        ? `${item.user_name} đã trả lời chính mình`
        : `${item.user_name}  đã trả lời bạn`
    : ''

  const meMessage = item.createdBy === userid ? item : ''
  const ortherMessage = item.createdBy != userid ? item : ''

  return {
    me,
    deleteFromOthers,
    recall,
    haveReplyMessage,
    userRep
  }
}
