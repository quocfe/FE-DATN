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
import { Link } from 'react-router-dom'

function MessageFixed({ message_fix }: { message_fix: MessageFix }) {
  const boxReplyRef = useRef<HTMLDivElement>(null)
  const previewUploadRef = useRef<HTMLDivElement>(null)
  const { onlineUsers, socket } = useSocketContext()
  const { user_id } = getProfileFromLocalStorage()
  const isOnline = onlineUsers.some((user_socket) => user_socket != user_id)
  const { showNotify } = useNotifyMessage(message_fix.group_id, user_id)
  const [file, setFile] = useState<File | null>(null)

  const { data: messageData, isLoading } = useQuery({
    queryKey: ['messageFix', message_fix.group_id && message_fix.id],
    queryFn: () =>
      message_fix.type === 1
        ? messageApi.getOneToOneMessage(message_fix.id, 1, 30)
        : messageApi.getGroupMessage(message_fix.group_id, 1, 30),
    enabled: message_fix.group_id != null || message_fix.id != null
  })
  const infoMessage = messageData?.data?.data?.info as InfoMessage
  const isBlock = infoMessage?.list_block_user.some((user_id) => user_id === infoMessage.group_id)
  const isBlocked = infoMessage?.list_blocked_user.some((user_id) => user_id === infoMessage.group_id)
  const checkStatusBlock = isBlocked && isBlock
  const { removeMessageFix, setHiddenMessageFix } = useMessageFixStore()
  const handleRemoveMessageFixed = () => {
    removeMessageFix(message_fix.group_id)
  }

  const handleHiddenMessageFixed = () => {
    removeMessageFix(message_fix.group_id)
    setHiddenMessageFix({ ...message_fix, avatar: infoMessage?.avatar })
  }

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

  const selectBlockType = () => {
    if (isBlock) {
      return <BlockFixUi />
    } else if (isBlocked) {
      return <BlockedFixUi />
    } else {
      return (
        <SendMessageFixed
          message_fix={message_fix}
          infoMessage={infoMessage}
          boxReplyRef={boxReplyRef}
          previewUploadRef={previewUploadRef}
        />
      )
    }
  }

  return (
    <div className='flex h-[450px] w-[330px] flex-col overflow-hidden rounded-se-xl rounded-ss-xl bg-white shadow-2xl'>
      {/* header */}
      <div
        className={`flex items-center justify-between border-b p-2 dark:border-slate-800 ${showNotify ? 'bg-[#0084ff]' : ''}`}
      >
        <div className='flex min-w-fit items-center justify-start '>
          <Link to={`/profile/${infoMessage?.group_name}`} className='cursor-pointer rounded-md p-1 '>
            <img className='h-[40px] w-[40px] rounded-full  object-cover' src={infoMessage?.avatar} />
          </Link>
          <div className='ml-2 flex flex-col items-start justify-between gap-1 '>
            <p className={`text-sm font-medium ${showNotify ? ' text-white' : ' text-black'} w-[150px] truncate`}>
              {infoMessage?.group_name}
            </p>
            {checkStatusBlock && isOnline && (
              <div className='flex items-center gap-1'>
                <div className='bottom-2 right-1 h-2 w-2 rounded-full bg-teal-500' />
                <p className={`${showNotify ? ' text-green-500' : ' text-green-500'} text-[10px] font-bold`}>
                  đang hoạt động
                </p>
              </div>
            )}
          </div>
        </div>

        <div className='flex items-center'>
          {checkStatusBlock && (
            <>
              <div className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-100'>
                <IonIcon
                  className={`cursor-pointer text-xl  ${showNotify ? ' text-white' : ' text-[#0084ff]'}`}
                  icon='call'
                />
              </div>
              <div className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-100'>
                <IonIcon
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
      {selectBlockType()}
    </div>
  )
}

export default MessageFixed
