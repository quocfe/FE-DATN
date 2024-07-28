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

type SendMessageType = {
  boxReplyRef: React.LegacyRef<HTMLDivElement>
  previewUploadRef: React.LegacyRef<HTMLDivElement>
  infoMessage: InfoMessage
}

function SendMessageFixed({ boxReplyRef, previewUploadRef, infoMessage }: SendMessageType) {
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
  const { toggleBoxReply, setTogglePreviewBox, togglePreviewBox, setToggleBoxReply, setPreviewImg, previewImg } =
    useConversationStore()
  const queryClient = useQueryClient()
  const { setLoadingMessage } = useMessageStore()
  let groupID = infoMessage?.group_id

  const profile = getProfileFromLocalStorage()
  const user_name = toggleBoxReply?.createdBy === profile.user_id ? 'chính mình' : toggleBoxReply?.user_name

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
          setTogglePreviewBox(false)
        } else {
          setTogglePreviewBox(false)
          await handleFileUpload()
          setPreviewImg(null)
        }
        setFile(null)
        // setPreview(null)
      }

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
        return <img src={toggleBoxReply?.sub_body} className='h-10 w-10 object-contain' />
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
    e.target.value === ''
      ? socket?.emit('isNotTyping', JSON.stringify(data))
      : socket?.emit('isTyping', JSON.stringify(data))
    // const dataSeen = {
    //   group_id:groupID,
    //   user_id: profile.user_id,
    //   message_id: message_id
    // }
    // socket?.emit('seenMessage', JSON.stringify(dataSeen))
  }

  const handleOnFocus = () => {
    const data = { user_id: profile.user_id, groupID }
    const dataSeen = {
      group_id: groupID,
      user_id: profile.user_id
    }
    socket?.emit('seenMessage', JSON.stringify(dataSeen))
    socket?.emit('isTyping', JSON.stringify(data))
    if (groupID) deleteNotify.mutate(groupID)
  }

  return (
    <div className=''>
      {toggleBoxReply && (
        <div ref={boxReplyRef} className='border-t-[1px] bg-white p-4 shadow-sm'>
          <div className='item-start flex w-full justify-between rounded-md bg-secondery px-3 py-2'>
            <div className='relative ml-2 w-4/5 after:absolute after:-left-3 after:bottom-0 after:top-0 after:h-full after:w-1 after:bg-primary'>
              <span className='mb-2 block text-[14px] font-light'>
                Trả lời tin nhắn <strong className='font-semibold'>{user_name}</strong>
              </span>
              {typeBodyReply()}
            </div>
            <IonIcon
              onClick={() => setToggleBoxReply(null)}
              icon='close'
              className='cursor-pointer rounded-full bg-primary p-2 text-white'
            />
          </div>
        </div>
      )}
      {togglePreviewBox && (
        <div ref={previewUploadRef} className='border-t-[1px] bg-white p-4 shadow-sm'>
          <div className='item-center flex w-full justify-between rounded-md bg-secondery px-3 py-2'>
            <div className='relative ml-2 w-4/5 after:absolute after:-left-3 after:bottom-0 after:top-0 after:h-full after:w-1 after:bg-primary'>
              {preview?.type?.includes('video') && (
                <video
                  src={URL?.createObjectURL(preview)}
                  className='h-14 w-16 shrink-0 overflow-hidden rounded-sm object-cover'
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
              className='cursor-pointer rounded-full bg-primary p-2 text-white'
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
          <div className='flex flex-1 flex-row items-center justify-around '>
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
                  const data = { user_id: profile.user_id, groupID }
                  socket?.emit('isNotTyping', JSON.stringify(data))
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
                <button onClick={handleSendMessage} className='text-dark shrink-0 p-2'>
                  <IonIcon className='flex text-sm font-bold text-primary' icon='send' />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <IsTyping />
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
