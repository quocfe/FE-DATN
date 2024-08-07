import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useSocketContext } from '~/context/socket'
import CallVideo from '~/pages/Message/components/CallVideo'
import useConversationStore from '~/store/conversation.store'

import useMessageStore from '~/store/message.store'
import { MessageFix } from '~/store/messageFix.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import CustomFileInput from '../InputFile/CustomFileInput'
import ChatMessageFixed from './ChatMessageFixed'

function MessageCenter({ message_fix, infoMessage }: { message_fix: MessageFix; infoMessage: InfoMessage }) {
  const { toggleBoxReply, togglePreviewBox, setToggleBoxSearchMessage, pinMessage, selectedConversation } =
    useConversationStore()
  const { user_id, first_name, last_name, Profile } = getProfileFromLocalStorage()
  const chatMessageRef = useRef<HTMLInputElement>(null)
  const [showScrollBtn, setShowScrollBtn] = useState<boolean>(false)
  const [callVideo, setCallVideo] = useState<boolean>(false)
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false)
  const boxReplyRef = useRef<HTMLDivElement>(null)
  const previewUploadRef = useRef<HTMLDivElement>(null)
  const { onlineUsers, socket } = useSocketContext()
  const { setVideoCall, videoCall, setAcceptCall } = useMessageStore()
  const [calculateHeight, setCalculateHeight] = useState<number>(0)
  const [file, setFile] = useState<File | null>(null)

  const handleScroll = useCallback(() => {
    if (chatMessageRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessageRef.current
      setShowScrollBtn(scrollHeight - scrollTop > clientHeight * 1.5)
      setIsAtBottom(scrollHeight - (scrollTop + clientHeight) < 20 ? true : false)
    }
  }, [])

  const handleClickVideoCall = () => {
    const dataToSocket = {
      group_message_id: selectedConversation?.group_id,
      user_id: user_id,
      room_id: `123${Date.now()}`,
      group_name: selectedConversation.type === 1 ? first_name + ' ' + last_name : infoMessage?.group_name,
      avatar: selectedConversation.type === 1 ? Profile.profile_picture : infoMessage?.avatar
    }
    const dataVideoCall = {
      group_message_id: selectedConversation?.group_id,
      group_name: infoMessage?.group_name,
      avatar: infoMessage?.avatar,
      user_id: selectedConversation?.id
    }

    setAcceptCall(false)
    setCallVideo(true)
    setVideoCall(dataVideoCall as {})

    socket?.emit('callVideo', dataToSocket)
  }

  useLayoutEffect(() => {
    if (toggleBoxReply || togglePreviewBox) {
      let height = 204

      if (boxReplyRef.current) {
        height = boxReplyRef.current.getBoundingClientRect().height + 0
      }

      if (previewUploadRef.current) {
        height = previewUploadRef.current.getBoundingClientRect().height + 0
      }

      setCalculateHeight(height)
    } else {
      setCalculateHeight(0)
    }
  }, [toggleBoxReply, togglePreviewBox])

  if (videoCall && Object.keys(videoCall).length > 0) {
    return <CallVideo />
  }

  return (
    <div
      ref={chatMessageRef}
      // onScroll={handleScroll}
      className='w-full flex-1 overflow-x-hidden px-2 py-2 '
    >
      <CustomFileInput setPreview={() => {}} type={3} setFile={setFile} file={file}>
        <ChatMessageFixed message_fix={message_fix} infoMessage={infoMessage} />
      </CustomFileInput>
    </div>
  )
}

export default MessageCenter

{
  /* <div
        className={`${showScrollBtn ? 'visible' : 'hidden'} fixed bottom-14 left-1/2 flex translate-x-20 cursor-pointer items-center rounded-full bg-white p-2 text-primary shadow-inner`}
      >
        <div
          onClick={() => {
            setShowNewMsg(false)
            scrollIntoViewFn()
          }}
          className='flex flex-row items-center gap-2 '
        >
          {showNewMsg && <p className='text-[8px] font-semibold'>Tin nhắn mới</p>}
          <IonIcon icon='arrow-down' />
        </div>
      </div> */
}
