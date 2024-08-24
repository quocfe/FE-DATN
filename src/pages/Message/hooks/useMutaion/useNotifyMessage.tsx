import React from 'react'
import useQueryNotifyMessage from '~/hooks/queries/message/useQueryNotifyMessage'

const useNotifyMessage = (group_message_id?: string, user_id?: string) => {
  const { data: notify } = useQueryNotifyMessage()

  const notifyData = notify?.data?.data.filter((data: any) => {
    return data.group_message_id === group_message_id && data.receiver_id === user_id ? data : null
  })
  const showNotify = notifyData && notifyData?.length > 0 ? true : false
  const numberNotify = notifyData && notifyData?.length < 9 ? notifyData?.length : '9+'

  const notifyAllData = notify?.data?.data.filter((data: any) => {
    return data.receiver_id === user_id ? data : null
  })
  const showAllNotify = notifyAllData && notifyAllData?.length > 0 ? true : false
  const numberAllNotify = notifyAllData && notifyAllData?.length < 9 ? notifyAllData?.length : '9+'

  return {
    notify,
    notifyData,
    showNotify,
    numberNotify,
    showAllNotify,
    numberAllNotify,
    notifyAllData,
    notifyLength: notifyData?.length
  }
}

export default useNotifyMessage
