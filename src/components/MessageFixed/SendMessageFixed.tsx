import { IonIcon } from '@ionic/react'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CustomFileInput from '~/components/InputFile/CustomFileInput'
import { useSocketContext } from '~/context/socket'
import useMutationDeleteNotify from '~/hooks/mutations/message/useMutationDeleteNotify'
import RecordMessage from '~/pages/Message/components/RecordMessage'
import IsTyping from '~/pages/Message/components/components/IsTyping'
import useMutationReplyMessage from '~/pages/Message/hooks/useMutationReplyMessage'
import { useMutationSendMessage, useMutationSendMessageAttach } from '~/pages/Message/hooks/useMutationSendMessage'
import { useQueryMessage } from '~/pages/Message/hooks/useQueryMessage'
import useFileUpload from '~/pages/Message/utils/uploadApi'
import useConversationStore from '~/store/conversation.store'
import useMessageStore from '~/store/message.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import EmojiBox from './EmojiBoxFixed'
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'
import { useQueryClient } from '@tanstack/react-query'
import { MessageFix } from '~/store/messageFix.store'
import isTypingLogo from '../../assets/images/isTyping.gif'
import useTypingMessageSocket from '~/hooks/socket/useTypingMessageSocket'

type SendMessageType = {
  boxReplyRef: React.LegacyRef<HTMLDivElement>
  previewUploadRef: React.LegacyRef<HTMLDivElement>
  infoMessage: InfoMessage
  message_fix: MessageFix
}

function SendMessageFixed({ boxReplyRef, previewUploadRef, infoMessage, message_fix }: SendMessageType) {
  useTypingMessageSocket()
  const [openRecordMessage, setOpenRecordMessage] = useState<boolean>(false)
  const receiverID = infoMessage?.group_id
  const sendMessageMutation = useMutationSendMessage()
  const replyMessageMutation = useMutationReplyMessage()
  const deleteNotify = useMutationDeleteNotify()
  const sendMedia = useMutationSendMessageAttach()
  const { upload } = useFileUpload()
  const { socket } = useSocketContext()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<any>(null)
  const [values, setValues] = useState('')
  const [openEmoji, setOpenEmoji] = useState<boolean>(false)
  const {
    toggleBoxReply,
    setTogglePreviewBox,
    togglePreviewBox,
    setToggleBoxReply,
    setPreviewImg,
    previewImg,
    isTyping,
    isNotTyping
  } = useConversationStore()
  const queryClient = useQueryClient()
  const { setLoadingMessage } = useMessageStore()
  let groupID = message_fix?.group_id

  const profile = getProfileFromLocalStorage()
  const user_name = toggleBoxReply?.createdBy === profile.user_id ? 'chính mình' : toggleBoxReply?.user_name

  // typing
  const { group_message_id, fullname } = isTyping ?? { group_message_id: '', fullname: '' }

  const handleSendMessage = useCallback(async () => {
    try {
      const baseData = {
        body: values,
        group_message_id: groupID,
        receiver: receiverID,
        type: 1,
        parent_id: ''
      }

      if (toggleBoxReply) {
        baseData.parent_id = toggleBoxReply.message_id
        await replyMessageMutation.mutateAsync(baseData)
        setToggleBoxReply(null)
      } else {
        if (previewImg && values == '') {
          setTogglePreviewBox(false)
          await handleFileUpload()
          setPreviewImg(null)
        } else if (!previewImg) {
          await sendMessageMutation.mutateAsync(baseData)
          console.log('baseDate', baseData)
          setTogglePreviewBox(false)
        } else {
          setTogglePreviewBox(false)
          await handleFileUpload()
          setPreviewImg(null)
        }
        setFile(null)
        // setPreview(null)
      }
      queryClient.invalidateQueries({ queryKey: ['messageFixInfinity', message_fix.group_id && message_fix.id] })
      queryClient.invalidateQueries({ queryKey: ['conversations', profile.user_id] })
      queryClient.invalidateQueries({ queryKey: ['statusMessage'] })

      setValues('')
    } catch (error) {
      toast.error('Error sending message', { position: 'top-right', autoClose: 5000 })
    }
  }, [values, groupID, receiverID, toggleBoxReply, previewImg])

  const handleSendLike = useCallback(async () => {
    try {
      const likeData = {
        body: '👍',
        group_message_id: groupID,
        receiver: receiverID,
        type: 1,
        parent_id: toggleBoxReply?.message_id
      }

      await (toggleBoxReply ? replyMessageMutation.mutateAsync(likeData) : sendMessageMutation.mutateAsync(likeData))
      setValues('')
      setToggleBoxReply(null)
      queryClient.invalidateQueries({ queryKey: ['messageFixInfinity', message_fix.group_id && message_fix.id] })
      queryClient.invalidateQueries({ queryKey: ['conversations', profile.user_id] })
      queryClient.invalidateQueries({ queryKey: ['statusMessage'] })
    } catch (error) {
      toast.error('Error sending like', { position: 'top-right', autoClose: 5000 })
    }
  }, [groupID, receiverID, toggleBoxReply])

  const handleEmojiSelect = useCallback((emoji: EmojiType) => {
    setValues((prev) => prev + emoji.native)
  }, [])

  const handleFileUpload = useCallback(async () => {
    let fileTepm = file != null ? file : previewImg

    if (fileTepm) {
      console.log('running fl')
      try {
        const url = await upload(fileTepm)

        const mediaData = {
          body: `${url.original_filename}.${url.url.split('.').pop()}`,
          sub_body: url.url,
          receiver: receiverID,
          group_message_id: groupID,
          type: 0
        }

        if (url.resource_type === 'raw' || url.format === 'pdf') {
          mediaData.type = 3
        } else if (url.resource_type === 'video') {
          mediaData.type = 4
        } else {
          mediaData.type = 2
        }

        await sendMedia.mutateAsync(mediaData)
        queryClient.invalidateQueries({ queryKey: ['messageFixInfinity', message_fix.group_id && message_fix.id] })
        queryClient.invalidateQueries({ queryKey: ['conversations', profile.user_id] })
        queryClient.invalidateQueries({ queryKey: ['statusMessage'] })
      } catch (error) {
        console.log(error)
      }
    }
  }, [file, groupID, receiverID, previewImg])

  const typeBodyReply = useCallback(() => {
    switch (toggleBoxReply?.type) {
      case 1:
        return (
          <div className='overflow-hidden text-ellipsis text-nowrap rounded-lg bg-white px-3 py-2 text-[13px] font-thin text-gray-900'>
            {toggleBoxReply?.body.slice(0, 100)}
          </div>
        )
      case 2:
        return <img src={toggleBoxReply?.sub_body} className='object-contain w-10 h-10' />
      case 3:
        return <p className='text-sm'>{toggleBoxReply?.body}</p>
      default:
        return null
    }
  }, [toggleBoxReply])

  useEffect(() => {
    setPreviewImg(preview)
    preview && setTogglePreviewBox(true)
  }, [preview])

  useEffect(() => {
    setPreview(previewImg)
  }, [previewImg])

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues(e.target.value)
    const data = { user_id: profile.user_id, groupID }
    if (groupID)
      e.target.value === ''
        ? socket?.emit('isNotTyping', JSON.stringify(data))
        : socket?.emit('isTyping', JSON.stringify(data))
  }

  const handleOnFocus = () => {
    const data = { user_id: profile.user_id, groupID }
    const dataSeen = {
      group_id: groupID,
      user_id: profile.user_id
    }
    if (groupID) {
      socket?.emit('seenMessage', JSON.stringify(dataSeen))
      socket?.emit('isTyping', JSON.stringify(data))
      if (groupID) deleteNotify.mutate(groupID)
    }
  }

  return (
    <div className='relative'>
      {toggleBoxReply && (
        <div ref={boxReplyRef} className='border-t-[1px] bg-white p-2 shadow-sm'>
          <div className='flex justify-between w-full px-3 py-2 rounded-md item-start bg-secondery'>
            <div className='relative w-4/5 ml-2 after:absolute after:-left-3 after:bottom-0 after:top-0 after:h-full after:w-1 after:bg-primary'>
              <span className='mb-2 block text-[12px] font-light'>
                Trả lời tin nhắn <strong className='font-semibold'>{user_name}</strong>
              </span>
              {typeBodyReply()}
            </div>
            <IonIcon
              onClick={() => setToggleBoxReply(null)}
              icon='close'
              className='p-1 text-white rounded-full cursor-pointer bg-primary'
            />
          </div>
        </div>
      )}
      {togglePreviewBox && (
        <div ref={previewUploadRef} className='border-t-[1px] bg-white p-4 shadow-sm'>
          <div className='flex justify-between w-full px-3 py-2 rounded-md item-center bg-secondery'>
            <div className='relative w-4/5 ml-2 after:absolute after:-left-3 after:bottom-0 after:top-0 after:h-full after:w-1 after:bg-primary'>
              {preview?.type?.includes('video') && (
                <video
                  src={URL?.createObjectURL(preview)}
                  className='object-cover w-16 overflow-hidden rounded-sm h-14 shrink-0'
                ></video>
              )}
              {preview?.type?.includes('image') && (
                <img src={URL?.createObjectURL(preview)} className='h-[50px] w-[100px] object-contain' />
              )}
              {preview?.type?.includes('application') && <p className='text-sm'>{preview.path}</p>}
            </div>
            <IonIcon
              onClick={() => {
                setPreviewImg(null)
                setPreview(null)
                setTogglePreviewBox(false)
              }}
              icon='close'
              className='p-2 text-white rounded-full cursor-pointer bg-primary'
            />
          </div>
        </div>
      )}
      <div className='flex items-center gap-2 p-2 '>
        <div className={`-mt-1.5 ${values ? 'hidden' : 'flex'} h-full items-center gap-1 dark:text-white`}>
          <CustomFileInput
            type={2}
            iconName={'attach-outline'}
            setPreview={setPreview}
            preview={preview}
            setFile={setFile}
            file={file}
            messageFixes={true}
          />
          <button
            onClick={() => setOpenRecordMessage(true)}
            className='dark:bg-dark3 shrink-0 rounded-full  text-green-600  duration-100 hover:scale-[1.15] dark:border-0'
          >
            <IonIcon className='flex text-xl' icon='mic-outline' />
          </button>
        </div>
        {openRecordMessage ? (
          <RecordMessage setOpenRecordMessage={setOpenRecordMessage} openRecordMessage={openRecordMessage} />
        ) : (
          <div className='flex flex-row items-center justify-around flex-1 '>
            <div className='flex h-full w-[90%] flex-shrink-0  flex-row items-center'>
              <textarea
                id='body'
                onChange={(e) => handleOnChange(e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder='Write your message'
                onFocus={handleOnFocus}
                onBlur={() => {
                  if (groupID) {
                    const data = { user_id: profile.user_id, groupID }
                    socket?.emit('isNotTyping', JSON.stringify(data))
                  }
                }}
                value={values}
                rows={1}
                className='no-scrollbar block h-full w-full   resize-none rounded-full bg-secondery py-1 pe-6   text-[12px] focus:ring-transparent'
              ></textarea>
              <button
                type='button'
                onClick={() => setOpenEmoji(!openEmoji)}
                className=' dark:bg-dark3 relative -ml-6 shrink-0 rounded-full text-green-600  duration-100 hover:scale-[1.15] dark:border-0'
              >
                <IonIcon className='flex text-xl' icon='happy-outline' />
              </button>
            </div>
            <div className='w-[20%] flex-1'>
              {!values && !previewImg ? (
                <span onClick={handleSendLike} className='cursor-pointer text-[18px]'>
                  👍
                </span>
              ) : (
                <button onClick={handleSendMessage} className='p-2 text-dark shrink-0'>
                  <IonIcon className='flex text-sm font-bold text-primary' icon='send' />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {!isNotTyping && group_message_id === message_fix.group_id && (
        <div className='absolute -top-[15px] left-0 flex items-center justify-center p-1 text-[10px]'>
          <p>{`${fullname} đang nhập`}</p>
          <img src={isTypingLogo} className='object-cover w-5 h-2' alt='Typing...' />
        </div>
      )}
    </div>
  )
}

export default memo(SendMessageFixed)

{
  /* <EmojiPicker
              open={openEmoji}
              searchDisabled={true}
              className='absolute -bottom-[100px] '
              width={300}
              height={400}
              emojiStyle={EmojiStyle.FACEBOOK}
            /> */
}
