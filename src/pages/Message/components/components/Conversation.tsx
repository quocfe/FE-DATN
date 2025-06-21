import { IonIcon } from '@ionic/react'
import { memo, useLayoutEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import BlockOrUnBlockUserInMsg from '~/components/BlockOrUnBlockUserInMsg'
import Dialog from '~/components/Dialog'
import FeatureNotAllow from '~/components/FeatureNotAllow'
import { useSocketContext } from '~/context/socket'
import useMutationDeleteNotify from '~/hooks/mutations/message/useMutationDeleteNotify'
import { useQueryInfinifyMessage } from '~/pages/Message/hooks/useQuery/useQueryInfinifyMessage'
import useConversationStore from '~/store/conversation.store'
import useMessageFixStore from '~/store/messageFix.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import useCallVideo from '../../hooks/useMutaion/useCallVideo'
import useMutationDeleteMessage from '../../hooks/useMutaion/useMutationDeleteGroup'
import useNotifyMessage from '../../hooks/useMutaion/useNotifyMessage'
import { useQueryInfinifyConversation } from '../../hooks/useQuery/useQueryInfinifyConversation'
import { checkBodyMessage } from '../../utils/checkBodyMessage'
import TimeAgo from './TimeAgo'

interface ConversationType extends React.HTMLAttributes<HTMLParagraphElement> {
  item: ConvesationSideBar
  isOnline: boolean
  innerRef?: React.Ref<HTMLParagraphElement>
}

function Conversation({ item, isOnline, innerRef }: ConversationType) {
  const location = useLocation()
  const stateLocation = location.state

  const [triggerHover, setTriggerHover] = useState<boolean>(false)
  const [showDialogBlock, setShowDialogBlock] = useState<boolean>(false)
  const [featureNotAllow, setFeatureNotAllow] = useState<boolean>(false)
  const { setSelectedConversation, selectedConversation } = useConversationStore()
  const deleteNotify = useMutationDeleteNotify()
  const { removeMessageFix, removeHiddenMessageFix } = useMessageFixStore()
  const { refetch: refetchMessage } = useQueryInfinifyMessage()
  const { data, refetch } = useQueryInfinifyConversation()
  const deleteConversatonMuation = useMutationDeleteMessage()
  const [showDiaLogDeleteConversation, setShowDiaLogDeleteConversation] = useState<boolean>(false)
  const { socket } = useSocketContext()
  const { user_id } = getProfileFromLocalStorage()
  const { notify, notifyData, numberNotify, showNotify } = useNotifyMessage(item.group_message_id, user_id)
  const isBlock = item?.list_block_user?.some((id) => id === item.user_id)
  const isBlocked = item?.list_blocked_user?.some((id) => id === item.user_id)
  const isBlockedOrBlocking =
    item?.list_block_user?.includes(item.user_id) || item?.list_blocked_user?.includes(item.user_id)

  const conversationNoNotification = data?.pages?.flat()?.filter((page: any) => {
    return !notify?.data?.data.some((data: any) => {
      return page.group_message_id === data.group_message_id
    })
  })

  const body =
    item?.messages?.type === 1 || item?.messages?.type === 0 || item?.messages?.type === 6
      ? item?.messages?.body
      : item?.messages?.sub_body && checkBodyMessage(item?.messages?.type)

  const lastestNotify: any = notifyData && notifyData.at(0)
  const checkBody = lastestNotify?.type === 1 ? body : lastestNotify?.content
  const message_id = item?.messages?.message_id

  const handleSelectedConversation = (item: GroupMessage) => {
    if (item.type == 1) {
      setSelectedConversation({
        group_id: item.group_message_id,
        id: item.user_id,
        type: 1
      })
    } else if (item.type == 2) {
      setSelectedConversation({
        group_id: item.group_message_id,
        id: item.group_message_id,
        type: 2
      })
    } else {
      return body
    }
    const dataSeen = {
      group_id: item.group_message_id,
      user_id: user_id,
      message_id: message_id
    }
    if (item.group_message_id && numberNotify) {
      isBlockedOrBlocking && socket?.emit('seenMessage', JSON.stringify(dataSeen))
      deleteNotify.mutate(item.group_message_id)
    }

    // if (item.group_message_id) showNotify &&
  }

  const handleDeleteConversation = (id: string) => {
    deleteConversatonMuation.mutate(id, {
      onSuccess: () => {
        setShowDiaLogDeleteConversation(false)
        setTriggerHover(false)
        refetchMessage()
        refetch()
        removeMessageFix(id)
        removeHiddenMessageFix(id)
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

  const handleClickVideoCall = useCallVideo({
    group_message_id: selectedConversation?.group_id,
    user_id: user_id,
    group_name: item?.group_name,
    avatar: item?.group_thumbnail,
    type: selectedConversation.type,
    setFeatureNotAllow: setFeatureNotAllow
  })

  return (
    <div
      ref={innerRef}
      className={`
    relative flex cursor-pointer items-center rounded-xl p-2 duration-200 
    ${selectedConversation?.group_id === item?.group_message_id ? 'bg-primary-soft hover:bg-none' : 'hover:bg-secondery'}
    `}
      onMouseEnter={() => {
        setTriggerHover(true)
      }}
      onMouseLeave={() => {
        setTriggerHover(false)
      }}
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
          {isOnline && !isBlockedOrBlocking && (
            <div
              className={`absolute bottom-0 right-0 h-4 w-4 rounded-full  border border-white bg-green-500 dark:border-slate-800`}
            />
          )}
        </div>
        <div className='flex h-full min-w-0 flex-1 flex-col justify-evenly gap-1'>
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
            className='uk-button uk-button-default flex h-6 w-6 items-center justify-center rounded-full shadow-sm hover:bg-slate-100'
            type='button'
          >
            <IonIcon icon='ellipsis-horizontal' className='font-semibold' />
          </button>
          <div uk-dropdown='mode: click' className={` w-[250px]`}>
            <div className='p-2'>
              {/* message type = 1 */}
              {item.type === 1 && (
                <>
                  <Link
                    to={`/profile/${item.user_id}`}
                    className='flex items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'
                  >
                    <IonIcon icon='person-circle-outline' className='text-[22px]' />
                    <p className='text-[14px] font-semibold'>Xem trang cá nhân</p>
                  </Link>
                  <hr className='my-2' />
                </>
              )}
              {!isBlockedOrBlocking && (
                <>
                  <div
                    onClick={() => setFeatureNotAllow(true)}
                    className='flex items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'
                  >
                    <IonIcon icon='call-outline' className='text-[22px]' />
                    <p className='text-[14px] font-semibold'>Gọi thoại</p>
                  </div>
                  <div
                    onClick={handleClickVideoCall}
                    className='flex items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'
                  >
                    <IonIcon icon='videocam-outline' className='text-[22px]' />
                    <p className='text-[14px] font-semibold'>Chat video</p>
                  </div>
                </>
              )}
              {!isBlockedOrBlocking && <hr className='my-2' />}
              {item.type === 1 && !isBlocked && (
                <div
                  onClick={() => setShowDialogBlock(true)}
                  className='flex items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'
                >
                  <IonIcon icon='ban-outline' className='text-[22px]' />
                  <p className='text-[14px] font-semibold'>{isBlock ? 'Bỏ chặn' : 'Chặn'}</p>
                </div>
              )}
              <BlockOrUnBlockUserInMsg
                type={isBlock ? 'unBlock' : 'block'}
                show={showDialogBlock}
                setShow={setShowDialogBlock}
                user_id={item.user_id}
              />
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
      <FeatureNotAllow showDiaLogFeatureNotAllow={featureNotAllow} setShowDiaLogFeatureNotAllow={setFeatureNotAllow} />
    </div>
  )
}

export default memo(Conversation)
