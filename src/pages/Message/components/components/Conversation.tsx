import { useSocketContext } from '~/context/socket'
import useConversationStore from '~/store/conversation.store'
import { checkBodyMessage } from '../../utils/checkBodyMessage'
import { calculateTimeAgo } from '~/utils/helpers'
import { IonIcon } from '@ionic/react'

type ConversationType = {
  item: ConvesationSideBar
  isOnline: boolean
}

function Conversation({ item, isOnline }: ConversationType) {
  const { setSelectedConversation, setSelectedNoConversation, setMessages, toggleBoxSearchMessage, notifyMessage } =
    useConversationStore()
  const { socket } = useSocketContext()
  const handleSelectedConversation = (item: GroupMessage) => {
    setSelectedConversation(item)
    socket?.emit('seenMessage', item.group_message_id)
  }
  return (
    <div className={`group relative flex cursor-pointer items-center  rounded-xl p-2 duration-200 hover:bg-secondery `}>
      <div onClick={() => handleSelectedConversation(item)} className='flex flex-1 flex-row items-center gap-3'>
        <div className='relative h-14 w-14 shrink-0'>
          <img
            src={`${item?.group_thumbnail ? item?.group_thumbnail : 'src/assets/images/avatars/avatar-5.jpg'} `}
            className='h-full w-full rounded-full object-cover'
          />
          <div
            className={`absolute bottom-0 right-0 h-4 w-4 rounded-full  ${isOnline ? 'border border-white bg-green-500' : ''} dark:border-slate-800`}
          />
        </div>
        <div className='flex h-full min-w-0 flex-col justify-evenly gap-1'>
          <div className='mr-auto truncate text-sm font-medium text-black dark:text-white '>{item?.group_name}</div>
          <div className='flex items-center gap-2'>
            <div className='overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium text-gray-800'>
              {item?.messages?.body && checkBodyMessage(item?.messages?.body)}
            </div>
            <div className='flex-shrink-0 text-xs font-light text-gray-500 dark:text-white/70'>
              {item?.messages?.createdAt && calculateTimeAgo(item.messages.createdAt)}
            </div>
          </div>
        </div>
      </div>
      <div className='uk-inline absolute right-8 rounded-full shadow-sm '>
        <button
          className='uk-button uk-button-default flex h-6 w-6 items-center justify-center rounded-full shadow-sm hover:bg-slate-100'
          type='button'
        >
          <IonIcon icon='ellipsis-horizontal' className='font-semibold' />
        </button>
        <div uk-dropdown='mode: click' className='w-[380px]'>
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
            <div className='flex items-center justify-start gap-2 rounded-[10px] p-2 text-red-500 hover:bg-slate-100'>
              <IonIcon icon='trash-outline' className='text-[22px] text-red-500' />
              <p className='text-[14px] font-semibold'>Xóa đoạn hội thoại</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Conversation
