import { IonIcon } from '@ionic/react'
import React, { useEffect, useState, useCallback, memo } from 'react'
import EmojiBox from './EmojiBox'
import CustomFileInput from '~/components/InputFile/CustomFileInput'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MessageForm, messageSchema } from '~/utils/rules'
import useConversationStore from '~/store/conversation.store'
import { useMutationSendMessage, useMutationSendMessageAttach } from '../hooks/useMutationSendMessage'
import useMutationReplyMessage from '../hooks/useMutationReplyMessage'
import { useQueryMessage } from '../hooks/useQueryMessage'
import { useSocketContext } from '~/context/socket'
import useFileUpload from '../utils/uploadApi'
import { getProfileFromLocalStorage } from '~/utils/auth'
import useFileUploadStore from '~/store/fileUpload.store'
import { useQueryConversation } from '../hooks/useQueryConversation'
import useMutationDeleteNotify from '~/hooks/mutations/message/useMutationDeleteNotify'
import IsTyping from './components/IsTyping'
import useTypingMessageSocket from '~/hooks/socket/useTypingMessageSocket'

type SendMessageType = {
  boxReplyRef: React.LegacyRef<HTMLDivElement>
  previewUploadRef: React.LegacyRef<HTMLDivElement>
}

function SendMessage({ boxReplyRef, previewUploadRef }: SendMessageType) {
  const { refetch, data } = useQueryMessage()
  const receiverID = data?.data?.data?.info?.group_id
  const sendMessageMutation = useMutationSendMessage()
  const replyMessageMutation = useMutationReplyMessage()
  const deleteNotify = useMutationDeleteNotify()
  const sendMedia = useMutationSendMessageAttach()
  const { upload } = useFileUpload()
  const { socket } = useSocketContext()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<any>(null)
  const [values, setValues] = useState('')
  const {
    selectedConversation,
    toggleBoxReply,
    setTogglePreviewBox,
    togglePreviewBox,
    setToggleBoxReply,
    setPreviewImg,
    previewImg
  } = useConversationStore()
  let groupID = selectedConversation?.group_id

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
        } else {
          await sendMessageMutation.mutateAsync(baseData)
          setTogglePreviewBox(false)
          await handleFileUpload()
          setPreviewImg(null)
        }
        setFile(null)
        // setPreview(null)
      }

      setValues('')
      refetch()
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
      refetch()
      setToggleBoxReply(null)
    } catch (error) {
      toast.error('Error sending like', { position: 'top-right', autoClose: 5000 })
    }
  }, [groupID, receiverID, toggleBoxReply])

  const handleEmojiSelect = useCallback((emoji: EmojiType) => {
    setValues((prev) => prev + emoji.native)
  }, [])

  const handleFileUpload = useCallback(async () => {
    if (file) {
      try {
        // setPreview(null)
        const url = await upload(file)

        const mediaData = {
          body: url.original_filename,
          sub_body: url.url,
          receiver: receiverID,
          group_message_id: groupID,
          type: url.resource_type === 'application' ? 3 : url.resource_type === 'video' ? 4 : 2
        }

        await sendMedia.mutateAsync(mediaData)
      } catch (error) {
        toast.error('File upload failed', { position: 'top-right', autoClose: 5000 })
      }
    }
  }, [file, groupID, receiverID])

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

  return (
    <div className='relative'>
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
          <div className='item-start flex w-full justify-between rounded-md bg-secondery px-3 py-2'>
            <div className='relative ml-2 w-4/5 after:absolute after:-left-3 after:bottom-0 after:top-0 after:h-full after:w-1 after:bg-primary'>
              {preview?.type?.includes('video') ? (
                <video
                  src={URL?.createObjectURL(preview)}
                  className='h-14 w-16 shrink-0 overflow-hidden rounded-sm object-cover'
                ></video>
              ) : (
                <img src={URL?.createObjectURL(preview)} className='h-[50px] w-[100px] object-cover' />
              )}
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
      <div className='flex items-center gap-2 overflow-hidden p-2 md:gap-4 md:p-3'>
        <div id='message__wrap' className='-mt-1.5 flex h-full items-center gap-2 dark:text-white'>
          <CustomFileInput
            type={2}
            iconName={'image'}
            setPreview={setPreview}
            preview={preview}
            setFile={setFile}
            file={file}
          />
          <button
            type='button'
            className='dark:bg-dark3 shrink-0 rounded-full border border-sky-100 bg-sky-50 p-1.5 text-green-600 shadow-sm duration-100 hover:scale-[1.15] dark:border-0'
          >
            <IonIcon className='flex text-2xl' icon='happy-outline' />
          </button>
          <EmojiBox onEmojiSelect={handleEmojiSelect} />
        </div>
        <div className='relative flex-1'>
          <textarea
            id='body'
            onChange={(e) => {
              setValues(e.target.value)
              const data = { user_id: profile.user_id, groupID }
              e.target.value === ''
                ? socket?.emit('isNotTyping', JSON.stringify(data))
                : socket?.emit('isTyping', JSON.stringify(data))
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder='Write your message'
            onFocus={() => {
              const data = { user_id: profile.user_id, groupID }
              socket?.emit('isTyping', JSON.stringify(data))
            }}
            onBlur={() => {
              const data = { user_id: profile.user_id, groupID }
              socket?.emit('isNotTyping', JSON.stringify(data))
            }}
            value={values}
            rows={1}
            className='no-scrollbar w-full resize-none rounded-full bg-secondery p-2 pl-4 pr-8 focus:ring-transparent'
          ></textarea>
          {!values && !previewImg ? (
            <span onClick={handleSendLike} className='absolute right-0 top-0 mr-1 shrink-0 cursor-pointer text-[25px]'>
              👍
            </span>
          ) : (
            <button onClick={handleSendMessage} className='text-dark absolute right-0 top-0 shrink-0 p-2'>
              <IonIcon className='flex text-xl font-bold text-primary' icon='send' />
            </button>
          )}
        </div>
      </div>
      <IsTyping />
    </div>
  )
}

export default memo(SendMessage)
