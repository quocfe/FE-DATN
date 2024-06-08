import { IonIcon } from '@ionic/react'
import React, { ChangeEvent, useRef, useState } from 'react'
import EmojiBox from './EmojiBox'
import { useForm } from 'react-hook-form'
import { MessageForm, messageSchema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import useConversationStore from '~/store/conversation.store'
import { useMutationSendMessage, useMutationSendMessageAttach } from '../hooks/useMutationSendMessage'
import { toast } from 'react-toastify'
import { getProfileFromLocalStorage } from '~/utils/auth'
import useMutationReplyMessage from '../hooks/useMutationReplyMessage'
import { useQueryMessage } from '../hooks/useQueryMessage'

type SendMessageType = {
  groupId: string
  boxReplyRef: React.LegacyRef<HTMLDivElement>
}
function SendMessage({ groupId: receiverID, boxReplyRef }: SendMessageType) {
  const { refetch } = useQueryMessage()
  const sendMessageMutation = useMutationSendMessage()
  const replyMessageMutation = useMutationReplyMessage()
  const sendMedia = useMutationSendMessageAttach()
  const [checkInput, setCheckInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { selectedConversation, toggleBoxReply, setToggleBoxReply } = useConversationStore()
  const groupID = selectedConversation?.group_message_id ? selectedConversation?.group_message_id : ''
  const receiver = selectedConversation === null ? receiverID : ''
  const profile = getProfileFromLocalStorage()
  const user_name = toggleBoxReply?.createdBy === profile.user_id ? 'chính mình' : toggleBoxReply?.user_name

  const { register, handleSubmit, setValue, getValues, reset } = useForm<MessageForm>({
    resolver: yupResolver(messageSchema)
  })

  const handleSendMessage = handleSubmit(({ body }) => {
    if (!toggleBoxReply) {
      const data = {
        body,
        group_message_id: groupID,
        receiver: receiver,
        type: 1
      }
      sendMessageMutation.mutate(data, {
        onSuccess: () => {
          reset()
          refetch()
        },
        onError: () => {}
      })
    } else {
      const data = {
        body,
        group_message_id: groupID,
        type: 1,
        parent_id: toggleBoxReply.message_id
      }
      replyMessageMutation.mutate(data, {
        onSuccess: () => {
          reset()
          refetch()
          setToggleBoxReply(null)
        },
        onError: () => {
          toast.error('tin nhắn trả lời !ok', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        }
      })
    }
  })

  const handSendLike = () => {
    if (!toggleBoxReply) {
      const data = {
        body: '👍',
        group_message_id: groupID,
        receiver: receiver,
        type: 1
      }
      sendMessageMutation.mutate(data, {
        onSuccess: () => {
          refetch()
        },
        onError: () => {
          toast.error('tin nhắn gửi !ok', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        }
      })
    } else {
      const data = {
        body: '👍',
        group_message_id: groupID,
        type: 1,
        parent_id: toggleBoxReply.message_id
      }

      replyMessageMutation.mutate(data, {
        onSuccess: () => {
          reset()
          refetch()
          setToggleBoxReply(null)
        },
        onError: () => {
          toast.error('tin nhắn trả lời !ok', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        }
      })
    }
  }

  const handleEmojiSelect = (emoji: EmojiType) => {
    const currentValue = getValues('body') || ''
    setValue('body', currentValue + emoji.native, { shouldValidate: true })
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const uploadData = new FormData()
      uploadData.append('messageattach', files[0])
      uploadData.append('body', '')
      uploadData.append('group_message_id', groupID)
      const nameFile = files[0].type.split('/')[0]
      if (nameFile == 'application') {
        // file docx, xlsx, pptx, pdf
        uploadData.append('type', '3')
      } else if (nameFile == 'video') {
        // video
        uploadData.append('type', '4')
      } else {
        // image
        uploadData.append('type', '2')
      }
      // text: 1/ image: 2/ file: 3/ video: 4/ link: 5

      sendMedia.mutate(uploadData, {
        onSuccess: (response) => {
          refetch()
          console.log('pending', sendMedia.isPending)
          console.log('sendMedia ok', response)
        },

        onError: (error) => {
          console.log('sendMedia fail', error)
        }
      })
    }
  }

  const typeBodyReply = () => {
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
        break
    }
  }

  return (
    <div>
      {toggleBoxReply && (
        <div ref={boxReplyRef} className='border-t-[1px] bg-white p-4 shadow-sm '>
          <div className='item-start flex w-full justify-between rounded-md bg-secondery px-3 py-2'>
            <div className='relative ml-2 w-4/5 after:absolute after:-left-3 after:bottom-0 after:top-0 after:h-full after:w-1 after:bg-primary'>
              <span className='mb-2 block text-[14px] font-light'>
                Trả lời tin nhắn <strong className='font-semibold'> {user_name}</strong>
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
      <div className='flex items-center gap-2 overflow-hidden p-2 md:gap-4 md:p-3'>
        <div id='message__wrap' className='-mt-1.5 flex h-full items-center gap-2 dark:text-white'>
          <div className=''>
            <input ref={inputRef} type='file' hidden onChange={handleFileUpload} />
            <button
              onClick={() => inputRef.current?.click()}
              type='button'
              className='dark:bg-dark3 shrink-0 rounded-full border border-sky-100 bg-sky-50 p-1.5 text-sky-600 shadow-sm duration-100 hover:scale-[1.15] dark:border-0'
            >
              <IonIcon className='flex text-2xl' icon='image' />
            </button>
          </div>

          <button
            type='button'
            className='dark:bg-dark3 shrink-0 rounded-full border border-sky-100 bg-sky-50 p-1.5 text-green-600 shadow-sm duration-100 hover:scale-[1.15] dark:border-0'
          >
            <IonIcon className='flex text-2xl' icon='happy-outline' />
          </button>
          <EmojiBox onEmojiSelect={handleEmojiSelect} />
        </div>
        <form className='relative flex-1' onSubmit={handleSendMessage}>
          <textarea
            id='body'
            {...register('body')}
            onChange={(e) => setCheckInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage()
            }}
            placeholder='Write your message'
            rows={1}
            className='no-scrollbar w-full resize-none rounded-full bg-secondery p-2 pl-4 pr-8 focus:ring-transparent'
          ></textarea>
          {!checkInput ? (
            <span onClick={handSendLike} className='absolute right-0 top-0 mr-1 shrink-0 cursor-pointer text-[25px]'>
              👍
            </span>
          ) : (
            <button type={'submit'} className='text-dark absolute right-0 top-0 shrink-0 p-2'>
              <IonIcon className='flex text-xl font-bold text-primary' icon='send' />
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default SendMessage
