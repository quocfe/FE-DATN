import { IonIcon } from '@ionic/react'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CustomFileInput from '~/components/InputFile/CustomFileInput'
import { useSocketContext } from '~/context/socket'
import useMutationDeleteNotify from '~/hooks/mutations/message/useMutationDeleteNotify'
import useConversationStore from '~/store/conversation.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import useMutationReplyMessage from '../hooks/useMutaion/useMutationReplyMessage'
import { useMutationSendMessage, useMutationSendMessageAttach } from '../hooks/useMutaion/useMutationSendMessage'
import { useQueryMessage } from '../hooks/useQuery/useQueryMessage'
import useFileUpload from '../utils/uploadApi'
import IsTyping from './components/IsTyping'
import EmojiBox from './EmojiBox'
import ModalRecordMessage from './RecordMessage'
import RecordMessage from './RecordMessage'
import useMessageStore from '~/store/message.store'
import { useQueryClient } from '@tanstack/react-query'
import { useQueryStatusMessage } from '../hooks/useQuery/useQueryStatusMessage'
import { useQueryInfinifyConversation } from '../hooks/useQuery/useQueryInfinifyConversation'
import { useQueryInfinifyMessage } from '../hooks/useQuery/useQueryInfinifyMessage'
import TextareaAutosize from 'react-textarea-autosize'
import useQueryNotifyMessage from '~/hooks/queries/message/useQueryNotifyMessage'
import useNotifyMessage from '../hooks/useMutaion/useNotifyMessage'

type SendMessageType = {
  boxReplyRef: React.LegacyRef<HTMLDivElement>
  previewUploadRef: React.LegacyRef<HTMLDivElement>
}

function SendMessage({ boxReplyRef, previewUploadRef }: SendMessageType) {
  const { data } = useQueryMessage()
  const [openRecordMessage, setOpenRecordMessage] = useState<boolean>(false)
  const receiverID = data?.data?.data?.info?.group_id
  const sendMessageMutation = useMutationSendMessage()
  const replyMessageMutation = useMutationReplyMessage()
  const { refetch: refetchStatusMessage } = useQueryStatusMessage()
  const { refetch: refetchConversation } = useQueryInfinifyConversation()
  const { refetch: refetchMessage } = useQueryInfinifyMessage()
  const { user_id } = getProfileFromLocalStorage()

  const deleteNotify = useMutationDeleteNotify()
  const sendMedia = useMutationSendMessageAttach()
  const queryClient = useQueryClient()
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
    previewImg,
    checkDropAttach,
    setCheckDropAttach
  } = useConversationStore()

  let groupID = selectedConversation?.group_id

  // notify
  const { showNotify, numberNotify } = useNotifyMessage(groupID, user_id)

  // username reply
  const profile = getProfileFromLocalStorage()
  const user_name = toggleBoxReply?.createdBy === profile.user_id ? 'chính mình' : toggleBoxReply?.user_name

  // handle
  const handleSendMessage = useCallback(async () => {
    try {
      const baseData = {
        body: values,
        group_message_id: groupID ? groupID : '',
        receiver: receiverID,
        type: 1,
        parent_id: ''
      }

      if (toggleBoxReply) {
        baseData.parent_id = toggleBoxReply.message_id
        console.log('baseData reply:', baseData)
        await replyMessageMutation.mutateAsync(baseData)
        setToggleBoxReply(null)
      } else {
        if (previewImg && values == '') {
          setTogglePreviewBox(false)
          await handleFileUpload()
          setPreviewImg(null)
          console.log('gửi ảnh')
        } else if (previewImg && values != '') {
          console.log('gửi ảnh và tin nhắn')
          await handleFileUpload()
          values.trim() && (await sendMessageMutation.mutateAsync(baseData))
          setTogglePreviewBox(false)
          setPreviewImg(null)
        } else if (values != '' && values.trim()) {
          console.log('gửi tin nhắn')
          await sendMessageMutation.mutateAsync(baseData)
        }
        setFile(null)
        refetchConversation()
        refetchStatusMessage()
        refetchMessage()
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
      console.log('likeData', likeData)
      setValues('')
      setToggleBoxReply(null)
      refetchConversation()
      refetchStatusMessage()
      refetchMessage()
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
        refetchConversation()
        refetchStatusMessage()
        refetchMessage()
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
    preview && setPreviewImg(preview.file)
    preview && setTogglePreviewBox(true)
  }, [preview])

  // useEffect(() => {
  //   checkDropAttach && setPreview(previewImg)
  //   console.log('drop', previewImg)
  // }, [previewImg])

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues(e.target.value)

    if (groupID) {
      const data = { user_id: profile.user_id, groupID }
      e.target.value === ''
        ? socket?.emit('isNotTyping', JSON.stringify(data))
        : socket?.emit('isTyping', JSON.stringify(data))
    }
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
    if (groupID) {
      socket?.emit('seenMessage', JSON.stringify(dataSeen))
      socket?.emit('isTyping', JSON.stringify(data))
      deleteNotify.mutate(groupID)
    }
  }
  return (
    <>
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
              {preview?.file?.type?.includes('video') && (
                <video
                  src={URL?.createObjectURL(preview?.file)}
                  className='h-14 w-16 shrink-0 overflow-hidden rounded-sm object-cover'
                ></video>
              )}
              {preview?.file?.type?.includes('image') && (
                <img src={URL?.createObjectURL(preview?.file)} className='h-[50px] w-[100px] object-contain' />
              )}
              {preview?.file?.type?.includes('application') && <p className='text-sm'>{preview?.file.path}</p>}
            </div>
            <IonIcon
              onClick={() => {
                setPreviewImg(null)
                setPreview(null)
                setTogglePreviewBox(false)
                setCheckDropAttach(false)
              }}
              icon='close'
              className='cursor-pointer rounded-full bg-primary p-2 text-white'
            />
          </div>
        </div>
      )}
      <div className={`flex items-center overflow-hidden p-2 md:gap-4 md:p-3`}>
        <div
          id='message__wrap'
          className={`-mt-1.5 flex h-full items-center gap-2 transition-all duration-300 ease-in-out dark:text-white`}
        >
          <CustomFileInput
            type={2}
            iconName={'attach-outline'}
            setPreview={setPreview}
            preview={preview}
            setFile={setFile}
            file={file}
          />
          <button
            onClick={() => setOpenRecordMessage(true)}
            className='dark:bg-dark3 shrink-0 rounded-full border border-sky-100 bg-sky-50 p-1.5 text-green-600 shadow-sm duration-100 hover:scale-[1.15] dark:border-0'
          >
            <IonIcon className='flex text-2xl' icon='mic-outline' />
          </button>
          <button className='dark:bg-dark3 shrink-0 rounded-full border border-sky-100 bg-sky-50 p-1.5 text-green-600 shadow-sm duration-100 hover:scale-[1.15] dark:border-0'>
            <IonIcon className='flex text-2xl' icon='happy-outline' />
          </button>
          <EmojiBox onEmojiSelect={handleEmojiSelect} />
        </div>

        {openRecordMessage ? (
          <RecordMessage setOpenRecordMessage={setOpenRecordMessage} openRecordMessage={openRecordMessage} />
        ) : (
          <div className={`relative flex-1 transition-all duration-300 ease-in-out ${values ? 'w-[100%]' : 'w-[80%]'}`}>
            <textarea
              id='body'
              onChange={(e) => handleOnChange(e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder='Aa'
              onFocus={handleOnFocus}
              onBlur={() => {
                const data = { user_id: profile.user_id, groupID }
                socket?.emit('isNotTyping', JSON.stringify(data))
              }}
              value={values}
              rows={1}
              className='w-full resize-none rounded-full bg-secondery p-2 pl-4 pr-8 focus:ring-transparent'
            ></textarea>
            {!values && !previewImg ? (
              <span
                onClick={handleSendLike}
                className='absolute right-0 top-0 mr-1 shrink-0 cursor-pointer text-[25px]'
              >
                👍
              </span>
            ) : (
              <button onClick={handleSendMessage} className='text-dark absolute right-0 top-0 shrink-0 p-2'>
                <IonIcon className='flex text-xl font-bold text-primary' icon='send' />
              </button>
            )}
          </div>
        )}
      </div>
      <IsTyping group_id={selectedConversation.group_id} type='normal' />
    </>
  )
}

export default memo(SendMessage)
