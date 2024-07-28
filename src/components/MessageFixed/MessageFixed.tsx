import { IonIcon } from '@ionic/react'
import { FileMsg, ImageMsg, TextMsg, VideoMsg } from '~/pages/Message/components/TypeMessage'
import { useQueryMessage } from '~/pages/Message/hooks/useQueryMessage'
import useAuthStore from '~/store/auth.store'
import MessageCenter from './MessageFixCenter'
import useMessageFixStore, { MessageFix } from '~/store/messageFix.store'
import SendMessageFixed from './SendMessageFixed'
import { useRef } from 'react'
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'
import { useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'

function MessageFixed({ message_fix }: { message_fix: MessageFix }) {
  const show = true
  const boxReplyRef = useRef<HTMLDivElement>(null)
  const previewUploadRef = useRef<HTMLDivElement>(null)
  const { data: messageData } = useQuery({
    queryKey: ['messageFix', message_fix.id],
    queryFn: () =>
      message_fix.type === 1
        ? messageApi.getOneToOneMessage(message_fix.id, 1, 30)
        : messageApi.getGroupMessage(message_fix.id, 1, 30),
    enabled: message_fix.id != null,
    staleTime: Infinity
  })
  const infoMessage = messageData?.data?.data?.info as InfoMessage
  const { removeMessageFix, setHiddenMessageFix } = useMessageFixStore()

  const handleRemoveMessageFixed = () => {
    removeMessageFix(message_fix.group_id)
  }

  const handleHiddenMessageFixed = () => {
    removeMessageFix(message_fix.group_id)
    setHiddenMessageFix({ ...message_fix, avatar: infoMessage?.avatar })
  }

  return (
    show && (
      <div className='flex h-[450px]  w-[330px] flex-col rounded-se-xl rounded-ss-xl bg-white shadow-xl'>
        {/* header */}
        <div className='flex items-center justify-between border-b dark:border-slate-800'>
          <div className='flex min-w-fit items-center justify-start p-2 '>
            <div className='cursor-pointer rounded-md p-1 '>
              <img className='h-[32px] w-[32px] rounded-full  object-cover' src={infoMessage?.avatar} />
            </div>
            <p className='ml-1 text-sm font-medium text-black dark:text-white'> {infoMessage?.group_name}</p>
          </div>
          <div className='flex items-center'>
            <div className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-100'>
              <IonIcon className='cursor-pointer text-xl text-[#0084ff] ' icon='call' />
            </div>
            <div className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-100'>
              <IonIcon className='cursor-pointer text-xl text-[#0084ff]' icon='videocam' />
            </div>
            <div
              onClick={handleHiddenMessageFixed}
              className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-100'
            >
              <IonIcon className='cursor-pointer text-xl text-[#0084ff]' icon='remove' />
            </div>
            <div
              onClick={handleRemoveMessageFixed}
              className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-100'
            >
              <IonIcon className='cursor-pointer text-xl text-[#0084ff]' icon='close' />
            </div>
          </div>
        </div>
        <div className='w-full overflow-y-auto overflow-x-hidden px-2 py-2 '>
          <MessageCenter infoMessage={infoMessage} message_fix={message_fix} />
        </div>
        <SendMessageFixed infoMessage={infoMessage} boxReplyRef={boxReplyRef} previewUploadRef={previewUploadRef} />
      </div>
    )
  )
}

export default MessageFixed
