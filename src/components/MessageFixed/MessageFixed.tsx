import { IonIcon } from '@ionic/react'
import { FileMsg, ImageMsg, TextMsg, VideoMsg } from '~/pages/Message/components/TypeMessage'
import { useQueryMessage } from '~/pages/Message/hooks/useQueryMessage'
import useAuthStore from '~/store/auth.store'
import MessageCenter from './MessageFixCenter'
import useMessageFixStore, { MessageFix } from '~/store/messageFix.store'
import SendMessageFixed from './SendMessageFixed'
import { useLayoutEffect, useRef, useState } from 'react'
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'
import { useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import { useSocketContext } from '~/context/socket'
import { getProfileFromLocalStorage } from '~/utils/auth'
import useNotifyMessage from '~/pages/Message/hooks/useNotifyMessage'
import CustomFileInput from '../InputFile/CustomFileInput'
import BlockFixUi from './BlockFixUi'
import BlockedFixUi from './BlockedFixUi'
import { Link, useNavigate } from 'react-router-dom'
import BlockOrUnBlockUserInMsg from '../BlockOrUnBlockUserInMsg'
import useConversationStore from '~/store/conversation.store'
import useCallVideo from '~/pages/Message/hooks/useCallVideo'
import FeatureNotAllow from '../FeatureNotAllow'

function MessageFixed({ message_fix }: { message_fix: MessageFix }) {
  const boxReplyRef = useRef<HTMLDivElement>(null)
  const previewUploadRef = useRef<HTMLDivElement>(null)
  const { onlineUsers, socket } = useSocketContext()
  const { user_id } = getProfileFromLocalStorage()
  const isOnline = onlineUsers.includes(message_fix.id)
  const { showNotify } = useNotifyMessage(message_fix.group_id, user_id)
  const [file, setFile] = useState<File | null>(null)
  const [showBlock, setShowBlock] = useState<boolean>(false)
  const navigate = useNavigate()
  const { setSelectedConversation } = useConversationStore()
  const { removeMessageFix, setHiddenMessageFix } = useMessageFixStore()
  const [featureNotAllow, setFeatureNotAllow] = useState<boolean>(false)

  const { data: messageData, isLoading } = useQuery({
    queryKey: ['messageFix', message_fix.group_id && message_fix.id],
    queryFn: () =>
      message_fix.type === 1
        ? messageApi.getOneToOneMessage(message_fix.id, 1, 1)
        : messageApi.getGroupMessage(message_fix.group_id, 1, 1),
    enabled: message_fix.group_id != null || message_fix.id != null
  })

  const infoMessage = messageData?.data?.data?.info as InfoMessage
  const isBlockedOrBlocking =
    infoMessage?.list_block_user?.includes(infoMessage.group_id) ||
    infoMessage?.list_blocked_user?.includes(infoMessage.group_id)

  const isBlock = infoMessage?.list_block_user?.some((id) => id === infoMessage.group_id)
  const isBlocked = infoMessage?.list_blocked_user?.some((id) => id === infoMessage.group_id)

  const handleRemoveMessageFixed = () => {
    removeMessageFix(message_fix.group_id)
  }

  const handleHiddenMessageFixed = () => {
    removeMessageFix(message_fix.group_id)
    setHiddenMessageFix({ ...message_fix, avatar: infoMessage?.avatar })
  }

  const handleExpand = () => {
    if (message_fix.type === 1) {
      setSelectedConversation({
        group_id: message_fix.group_id,
        id: message_fix.id,
        type: 1
      })
    } else if (message_fix.type === 2) {
      setSelectedConversation({
        group_id: message_fix.group_id,
        id: message_fix.group_id,
        type: 2
      })
    }
    navigate('/message', { state: true })
  }

  const handleClickVideoCall = useCallVideo({
    group_message_id: message_fix?.group_id,
    user_id: user_id,
    group_name: infoMessage?.group_name,
    avatar: infoMessage?.avatar,
    type: message_fix.type,
    setFeatureNotAllow: setFeatureNotAllow
  })

  if (isLoading) {
    return (
      <div className='flex h-[450px] w-[330px] flex-col overflow-hidden rounded-se-xl rounded-ss-xl bg-white shadow-2xl'>
        <div className={`flex items-center justify-between border-b p-2 `}>
          <div className='flex min-w-fit items-center justify-start '>
            <div className='cursor-pointer rounded-md p-1 '>
              <div className='h-[40px] w-[40px] rounded-full bg-slate-500'></div>
            </div>
            <div className='ml-2 flex flex-col items-start justify-between gap-1 '>
              <p className='h-[5px] w-[50px] bg-slate-500'></p>
            </div>
          </div>
          <div className='h-[5px] w-[10px] bg-slate-500'></div>
        </div>
        <div className='flex-1'></div>
        <div className='h-[40px] w-full bg-slate-500'></div>
      </div>
    )
  }

  return (
    <div className=' flex h-[450px] w-[330px] flex-col overflow-hidden rounded-se-xl rounded-ss-xl bg-white shadow-2xl'>
      {/* header */}
      <div
        className={`flex items-center justify-between border-b p-1 dark:border-slate-800 ${showNotify ? 'bg-[#0084ff]' : ''}`}
      >
        <button type='button'>
          <div className='flex min-w-fit items-center justify-start '>
            <div className='cursor-pointer rounded-md p-1 '>
              <img className='h-[40px] w-[40px] rounded-full  object-cover' src={infoMessage?.avatar} />
            </div>
            <div className='flex w-[150px] flex-col items-start justify-between  truncate'>
              <p className={`text-sm font-medium ${showNotify ? ' text-white' : ' text-black'} `}>
                {infoMessage?.group_name}
              </p>
              {isOnline && !isBlockedOrBlocking && (
                <div className='flex items-center gap-1'>
                  <div className='bottom-2 right-1 h-2 w-2 rounded-full bg-teal-500' />
                  <p className={`${showNotify ? ' text-green-500' : ' text-green-500'} text-[10px] font-bold`}>
                    đang hoạt động
                  </p>
                </div>
              )}
            </div>
          </div>
        </button>
        <div
          className='w-[200px]'
          uk-dropdown='pos: bottom-left; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click'
        >
          <nav>
            {message_fix.type === 1 && (
              <Link to={`/profile/${infoMessage?.group_id}`} className='cursor-pointer'>
                <IonIcon className='shrink-0 text-xl' icon='person-circle-outline'></IonIcon>
                Xem trang cá nhân
              </Link>
            )}
            <a onClick={handleExpand} className='cursor-pointer'>
              <IonIcon className='shrink-0 text-xl' icon='expand-outline'></IonIcon>
              Mở rộng
            </a>
            <hr />
            {!isBlocked && message_fix.type === 1 && (
              <a onClick={() => setShowBlock(true)} className='cursor-pointer'>
                <IonIcon className='shrink-0 text-xl' icon='ban-outline' />
                {isBlock ? 'Bỏ chặn' : 'Chặn'}
              </a>
            )}
            <BlockOrUnBlockUserInMsg
              type={isBlock ? 'unBlock' : 'block'}
              show={showBlock}
              setShow={setShowBlock}
              user_id={infoMessage?.group_id}
            />
            <a className='cursor-pointer'>
              <IonIcon className='shrink-0 text-xl' icon='alert-circle-outline'></IonIcon>
              Báo cáo
            </a>
            <hr />
            <a className='cursor-pointer text-red-500'>
              <IonIcon className='shrink-0 text-xl ' icon='trash-outline' /> Xóa đoạn hội thoại
            </a>
          </nav>
        </div>

        <div className='flex items-center'>
          {!isBlockedOrBlocking && (
            <>
              <div className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-100'>
                <IonIcon
                  onClick={() => setFeatureNotAllow(true)}
                  className={`cursor-pointer text-xl  ${showNotify ? ' text-white' : ' text-[#0084ff]'}`}
                  icon='call'
                />
              </div>
              <div className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-100'>
                <IonIcon
                  onClick={handleClickVideoCall}
                  className={`cursor-pointer text-xl  ${showNotify ? ' text-white' : ' text-[#0084ff]'}`}
                  icon='videocam'
                />
              </div>
              <div
                onClick={handleHiddenMessageFixed}
                className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-100'
              >
                <IonIcon
                  className={`cursor-pointer text-xl  ${showNotify ? ' text-white' : ' text-[#0084ff]'}`}
                  icon='remove'
                />
              </div>
            </>
          )}
          <div
            onClick={handleRemoveMessageFixed}
            className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-100'
          >
            <IonIcon
              className={`cursor-pointer text-xl  ${showNotify ? ' text-white' : ' text-[#0084ff]'}`}
              icon='close'
            />
          </div>
        </div>
      </div>
      <MessageCenter infoMessage={infoMessage} message_fix={message_fix} />
      {isBlockedOrBlocking ? (
        infoMessage?.list_block_user.includes(infoMessage.group_id) ? (
          <BlockFixUi user_id={infoMessage.group_id} />
        ) : (
          <BlockedFixUi />
        )
      ) : (
        <SendMessageFixed
          message_fix={message_fix}
          infoMessage={infoMessage}
          boxReplyRef={boxReplyRef}
          previewUploadRef={previewUploadRef}
        />
      )}
      <FeatureNotAllow showDiaLogFeatureNotAllow={featureNotAllow} setShowDiaLogFeatureNotAllow={setFeatureNotAllow} />
    </div>
  )
}

export default MessageFixed
