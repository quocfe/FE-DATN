import { IonIcon } from '@ionic/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Dialog from '~/components/Dialog'
import { useSocketContext } from '~/context/socket'
import useMutationDeleteNotify from '~/hooks/mutations/message/useMutationDeleteNotify'
import useQueryNotifyMessage from '~/hooks/queries/message/useQueryNotifyMessage'
import TimeAgo from '~/pages/Message/components/components/TimeAgo'
import useMutationDeleteMessage from '~/pages/Message/hooks/useMutationDeleteGroup'
import { useQueryInfinifyConversation } from '~/pages/Message/hooks/useQueryInfinifyConversation'
import { useQueryInfinifyMessage } from '~/pages/Message/hooks/useQueryInfinifyMessage'
import { checkBodyMessage } from '~/pages/Message/utils/checkBodyMessage'
import useConversationStore from '~/store/conversation.store'
import useMessageFixStore from '~/store/messageFix.store'
import { getProfileFromLocalStorage } from '~/utils/auth'

interface ConversationType extends React.HTMLAttributes<HTMLParagraphElement> {
  item: ConvesationSideBar
  isOnline: boolean
  innerRef?: React.Ref<HTMLParagraphElement>
}

function Conversation({ item, isOnline, innerRef }: ConversationType) {
  const [triggerHover, setTriggerHover] = useState<boolean>(false)
  const { setSelectedConversation, selectedConversation } = useConversationStore()
  const deleteNotify = useMutationDeleteNotify()
  const { refetch: refetchMessage } = useQueryInfinifyMessage()
  const { data, refetch } = useQueryInfinifyConversation()
  const deleteConversatonMuation = useMutationDeleteMessage()
  const [showDiaLogDeleteConversation, setShowDiaLogDeleteConversation] = useState<boolean>(false)
  const { socket } = useSocketContext()
  const { data: notify, refetch: refetchNotifyMessage } = useQueryNotifyMessage()
  const { user_id } = getProfileFromLocalStorage()
  const { setMessageFix } = useMessageFixStore()

  const notifyData = notify?.data?.data.filter((data: any) => {
    return data.group_message_id === item.group_message_id && data.receiver_id === user_id ? data : null
  })
  const conversationNoNotification = data?.pages?.flat()?.filter((page: any) => {
    return !notify?.data?.data.some((data: any) => {
      return page.group_message_id === data.group_message_id
    })
  })
  const showNotify = notifyData && notifyData?.length > 0 ? true : false
  const numberNotify = notifyData && notifyData?.length < 10 ? notifyData?.length : '10+'

  const body =
    item?.messages?.type === 1 || item?.messages?.type === 3 || item?.messages?.type === 0 || item?.messages?.type === 6
      ? item?.messages?.body
      : item?.messages?.sub_body && checkBodyMessage(item?.messages?.type)

  const lastestNotify: any = notifyData && notifyData.at(0)
  const checkBody = lastestNotify?.type === 1 ? body : lastestNotify?.content
  const message_id = item?.messages?.message_id
  const handleSelectedConversation = (item: GroupMessage) => {
    if (item.type === 1) {
      setMessageFix({
        group_id: item.group_message_id,
        id: item.user_id,
        type: 1,
        avatar: item?.group_thumbnail
      })
    } else if (item.type === 2) {
      setMessageFix({
        group_id: item.group_message_id,
        id: item.group_message_id,
        type: 2,
        avatar: item?.group_thumbnail
      })
    } else {
      return body
    }
    const dataSeen = {
      group_id: item.group_message_id,
      user_id: user_id,
      message_id: message_id
    }
    socket?.emit('seenMessage', JSON.stringify(dataSeen))
    if (item.group_message_id) {
      showNotify && deleteNotify.mutate(item.group_message_id)
    }
  }

  const handleDeleteConversation = (id: string) => {
    deleteConversatonMuation.mutate(id, {
      onSuccess: () => {
        setShowDiaLogDeleteConversation(false)
        setTriggerHover(false)
        refetchMessage()
        refetch()
        const item = conversationNoNotification && conversationNoNotification[0]
        if (item && Object.keys(selectedConversation).length) {
          handleSelectedConversation(item)
        }
      },
      onError: () => {
        toast.warning('Đã xảy ra lỗi')
      }
    })
  }
  let showMessageSelect = Object.keys(selectedConversation).length > 0 ? true : false

  useLayoutEffect(() => {
    if (showMessageSelect) {
      const item = data?.pages?.flat()[0]
      if (item) {
        handleSelectedConversation(item)
      }
    } else {
    }
  }, [data?.pages.flat()[0].group_message_id])

  return (
    <div
      ref={innerRef}
      className={`
    relative flex cursor-pointer items-center rounded-xl p-2 duration-200`}
      onMouseEnter={() => {
        setTriggerHover(true)
      }}
      onMouseLeave={() => {
        setTriggerHover(false)
      }}
    >
      <div
        onClick={() => handleSelectedConversation(item)}
        className='flex flex-row items-center justify-between flex-1 w-full gap-2'
      >
        <div className='relative h-14 w-14 shrink-0'>
          <img
            src={`${item?.group_thumbnail ? item?.group_thumbnail : 'src/assets/images/avatars/avatar-5.jpg'} `}
            className='object-cover w-full h-full rounded-full'
          />
          <div
            className={`absolute bottom-0 right-0 h-4 w-4 rounded-full  ${isOnline ? 'border border-white bg-green-500' : ''} dark:border-slate-800`}
          />
        </div>
        <div className='flex flex-col flex-1 h-full min-w-0 gap-1 justify-evenly'>
          <div className='mr-auto w-[70%] overflow-hidden truncate text-ellipsis text-sm font-medium text-black dark:text-white'>
            {item?.group_name}
          </div>
          <div className='flex items-center justify-between gap-2'>
            <p
              className={`w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-[13px]  text-gray-600
                ${showNotify ? 'font-semibold' : 'font-thin'}
                `}
            >
              {checkBody === undefined ? body : checkBody}
            </p>
          </div>
        </div>
      </div>
      {!triggerHover ? (
        item?.messages?.createdAt ? (
          <TimeAgo time={item?.messages?.createdAt || 0} />
        ) : (
          <TimeAgo time={item?.createdAt || 0} />
        )
      ) : (
        <div className={`uk-inline absolute right-2 top-1 rounded-full shadow-sm  `}>
          <button
            className='flex items-center justify-center w-6 h-6 rounded-full shadow-sm uk-button uk-button-default hover:bg-slate-100'
            type='button'
          >
            <IonIcon icon='ellipsis-horizontal' className='font-semibold' />
          </button>
          <div uk-dropdown='mode: click' className={` w-[250px]`}>
            <div className='p-2'>
              <div className='flex items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'>
                <IonIcon icon='checkmark' className='text-[22px]' />
                <p className='text-[14px] font-semibold'>Đánh dấu là chưa đọc</p>
              </div>
              <div className='flex items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'>
                <IonIcon icon='notifications-outline' className='text-[22px]' />
                <p className='text-[14px] font-semibold'>Tắt thông báo</p>
              </div>
              {/* message type = 1 */}
              {item.type === 1 && (
                <div className='flex items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'>
                  <IonIcon icon='person-circle-outline' className='text-[22px]' />
                  <p className='text-[14px] font-semibold'>Xem trang cá nhân</p>
                </div>
              )}
              <hr className='my-2' />
              <div className='flex items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'>
                <IonIcon icon='call-outline' className='text-[22px]' />
                <p className='text-[14px] font-semibold'>Gọi thoại</p>
              </div>
              <div className='flex items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'>
                <IonIcon icon='videocam-outline' className='text-[22px]' />
                <p className='text-[14px] font-semibold'>Chat video</p>
              </div>
              <hr className='my-2' />
              <div className='flex items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'>
                <IonIcon icon='ban-outline' className='text-[22px]' />
                <p className='text-[14px] font-semibold'>Chặn</p>
              </div>
              <div className='flex items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'>
                <IonIcon icon='alert-circle-outline' className='text-[22px]' />
                <p className='text-[14px] font-semibold'>Báo cáo</p>
              </div>
              <hr className='my-2' />
              <div
                onClick={() => setShowDiaLogDeleteConversation(true)}
                className='flex items-center justify-start gap-2 rounded-[10px] p-2 text-red-500 hover:bg-slate-100'
              >
                <IonIcon icon='trash-outline' className='text-[22px] text-red-500' />
                <p className='text-[14px] font-semibold'>Xóa đoạn hội thoại</p>
                <Dialog
                  isVisible={showDiaLogDeleteConversation}
                  onClose={() => setShowDiaLogDeleteConversation(false)}
                  type='warning'
                  title='Xóa cuộc trò chuyện'
                  description='Bạn không thể xem lại tin nhắn sau khi xóa cuộc hội thoại này!.'
                  textBtn='Xóa'
                  callback={() => handleDeleteConversation(item?.group_message_id)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showNotify && (
        <div className='absolute bottom-4 right-2 flex h-[20px] w-[20px] items-center justify-center rounded-full  bg-red-500'>
          <p className='text-[10px] text-white'>{numberNotify}</p>
        </div>
      )}
    </div>
  )
}

export default Conversation
