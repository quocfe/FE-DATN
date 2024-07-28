import { IonIcon } from '@ionic/react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SocketContextProvider, useSocketContext } from '~/context/socket'
import CallVideo from '~/pages/Message/components/CallVideo'
import ChatMessageSkelaton from '~/pages/Message/components/Skelaton/ChatMessageSkelaton'
import { useQueryMessage } from '~/pages/Message/hooks/useQueryMessage'
import useConversationStore from '~/store/conversation.store'

import useMessageStore from '~/store/message.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import CustomFileInput from '../InputFile/CustomFileInput'
import ChatMessageFix from './ChatMessageFix'
import { MessageFix } from '~/store/messageFix.store'
import SendMessageFixed from './SendMessageFixed'

function MessageCenter({ message_fix, infoMessage }: { message_fix: MessageFix; infoMessage: InfoMessage }) {
  const { toggleBoxReply, togglePreviewBox, setToggleBoxSearchMessage, pinMessage, selectedConversation } =
    useConversationStore()
  const { user_id, first_name, last_name, Profile } = getProfileFromLocalStorage()
  const chatMessageRef = useRef<HTMLInputElement>(null)
  const [showScrollBtn, setShowScrollBtn] = useState<boolean>(false)
  const [callVideo, setCallVideo] = useState<boolean>(false)
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const boxReplyRef = useRef<HTMLDivElement>(null)
  const previewUploadRef = useRef<HTMLDivElement>(null)
  const { onlineUsers, socket } = useSocketContext()
  const { setVideoCall, videoCall, setAcceptCall } = useMessageStore()
  const [calculateHeight, setCalculateHeight] = useState<number>(204)
  const isOnline = onlineUsers.includes(infoMessage?.group_id)

  const handleScroll = useCallback(() => {
    if (chatMessageRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessageRef.current
      setShowScrollBtn(scrollHeight - scrollTop > clientHeight * 3.5)
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
        height = boxReplyRef.current.getBoundingClientRect().height + 195
      }

      if (previewUploadRef.current) {
        height = previewUploadRef.current.getBoundingClientRect().height + 200
      }

      setCalculateHeight(height)
    } else {
      setCalculateHeight(204)
    }
  }, [toggleBoxReply, togglePreviewBox])

  if (videoCall && Object.keys(videoCall).length > 0) {
    return <CallVideo />
  }

  return (
    <CustomFileInput setPreview={() => {}} type={3} setFile={setFile} file={file}>
      <div
        style={{
          height: `calc(100vh - ${calculateHeight}px)`
        }}
        ref={chatMessageRef}
        onScroll={handleScroll}

        //  md:h-[calc(100vh-204px)]
      >
        <ChatMessageFix
          infoMessage={infoMessage}
          message_fix={message_fix}
          showScrollBtn={showScrollBtn}
          isAtBottom={isAtBottom}
        />
      </div>
    </CustomFileInput>
  )
}

export default MessageCenter
