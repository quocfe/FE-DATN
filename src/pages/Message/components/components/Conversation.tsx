import { useSocketContext } from '~/context/socket'
import useConversationStore from '~/store/conversation.store'
import { checkBodyMessage } from '../../utils/checkBodyMessage'
import { calculateTimeAgo } from '~/utils/helpers'
import { IonIcon } from '@ionic/react'
import { useState } from 'react'
import Dialog from '~/components/Dialog'
import useMutationDeleteMessage from '../../hooks/useMutationDeleteGroup'
import { useQueryConversation } from '../../hooks/useQueryConversation'
import useQueryNotifyMessage from '~/hooks/queries/message/useQueryNotifyMessage'
import useMutationDeleteNotify from '~/hooks/mutations/message/useMutationDeleteNotify'

type ConversationType = {
  item: ConvesationSideBar
  isOnline: boolean
  notifyData?: []
}

function Conversation({ item, isOnline, notifyData }: ConversationType) {
  const { setSelectedConversation, selectedConversation } = useConversationStore()
  const deleteNotify = useMutationDeleteNotify()
  const deleteConversatonMuation = useMutationDeleteMessage()
  const { refetch } = useQueryConversation()
  const [showDiaLogDeleteConversation, setShowDiaLogDeleteConversation] = useState<boolean>(false)
  const { socket } = useSocketContext()
  const notify = notifyData && notifyData?.length > 0 ? true : false
  const numberNotify = notifyData && notifyData?.length < 10 ? notifyData?.length : '10+'

  const body =
    item?.messages?.type === 1 || 3
      ? item?.messages?.body
      : item?.messages?.sub_body && checkBodyMessage(item?.messages?.sub_body)
  const checkBody =
    notifyData &&
    notifyData.map((item: any) => {
      if (item.type === 1) {
        return body
      } else {
        return item.content
      }
    })
  const handleSelectedConversation = (item: GroupMessage) => {
    if (item.type === 1) {
      setSelectedConversation({
        group_id: item.group_message_id,
        id: item.user_id,
        type: 1
      })
    } else if (item.type === 2) {
      setSelectedConversation({
        group_id: item.group_message_id,
        id: item.group_message_id,
        type: 2
      })
    } else {
      return body
    }

    notify && deleteNotify.mutate(item.group_message_id)
    socket?.emit('seenMessage', item.group_message_id)
  }

  const handleDeleteConversation = (id: string) => {
    deleteConversatonMuation.mutate(id, {
      onSuccess: () => {
        setShowDiaLogDeleteConversation(false)
        refetch()
      },
      onError: () => {
        console.log('xóa thất bại')
      }
    })
  }

  return (
    <div
      className={`
    group relative flex cursor-pointer items-center rounded-xl p-2 duration-200 
    ${selectedConversation?.group_id === item?.group_message_id ? 'bg-primary-soft hover:bg-none' : 'hover:bg-secondery'}
    `}
    >
      <div
        onClick={() => handleSelectedConversation(item)}
        className='flex w-full flex-1 flex-row items-center justify-between gap-2'
      >
        <div className='relative h-14 w-14 shrink-0'>
          <img
            src={`${item?.group_thumbnail ? item?.group_thumbnail : 'src/assets/images/avatars/avatar-5.jpg'} `}
            className='h-full w-full rounded-full object-cover'
          />
          <div
            className={`absolute bottom-0 right-0 h-4 w-4 rounded-full  ${isOnline ? 'border border-white bg-green-500' : ''} dark:border-slate-800`}
          />
        </div>
        <div className='flex h-full min-w-0 flex-1 flex-col justify-evenly gap-1'>
          <div className='mr-auto truncate text-sm font-medium text-black dark:text-white '>{item?.group_name}</div>
          <div className='flex items-center justify-between gap-2'>
            <p
              className={`w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-[13px]  text-gray-600
                ${notify ? 'font-semibold' : 'font-thin'}
                `}
            >
              {notify ? checkBody : body}
            </p>
          </div>
        </div>
      </div>
      <div className='absolute right-2 top-[15px] text-xs font-light text-gray-500 group-hover:hidden dark:text-white/70'>
        {item?.messages?.createdAt && calculateTimeAgo(item?.messages?.createdAt)}
      </div>
      <div className='uk-inline absolute right-2 top-1 hidden rounded-full shadow-sm group-hover:block '>
        <button
          className='uk-button uk-button-default flex h-6 w-6 items-center justify-center rounded-full shadow-sm hover:bg-slate-100'
          type='button'
        >
          <IonIcon icon='ellipsis-horizontal' className='font-semibold' />
        </button>
        <div uk-dropdown='mode: click' className='w-[250px]'>
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
                description='Bạn không thể hoàn tác sau khi xóa bản sao của cuộc trò chuyện này.'
                textBtn='Xóa'
                callback={() => handleDeleteConversation(item?.group_message_id)}
              />
            </div>
          </div>
        </div>
      </div>
      {notify && (
        <div className='absolute bottom-4 right-2 flex h-[20px] w-[20px] items-center justify-center rounded-full  bg-red-500'>
          <p className='text-[10px] text-white'>{numberNotify}</p>
        </div>
      )}
    </div>
  )
}

export default Conversation
