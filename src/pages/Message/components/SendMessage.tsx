import { IonIcon } from '@ionic/react'
import React, { useState } from 'react'
import EmojiBox from './EmojiBox'
import Attached from './Attached'
import { useForm } from 'react-hook-form'
import { MessageForm, messageSchema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import useConversationStore from '~/store/conversation.store'
import useMutationSendMessage from '../hooks/useMutationSendMessage'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function SendMessage({ groupId: receiverID }: { groupId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset
  } = useForm<MessageForm>({
    resolver: yupResolver(messageSchema)
  })

  const sendMessageMutation = useMutationSendMessage()
  const { selectedConversation } = useConversationStore()
  const groupID = selectedConversation?.group_message_id ? selectedConversation?.group_message_id : ''
  const receiver = selectedConversation === null ? receiverID : ''

  const handleSendMessage = handleSubmit(({ body }) => {
    const data = {
      body,
      group_message_id: groupID,
      receiver: receiver
    }
    sendMessageMutation.mutate(data, {
      onSuccess: () => {
        reset()
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
  })
  const handleEmojiSelect = (emoji: EmojiType) => {
    const currentValue = getValues('body') || ''
    setValue('body', currentValue + emoji.native, { shouldValidate: true })
  }

  return (
    <div className='flex items-center gap-2 overflow-hidden p-2 md:gap-4 md:p-3'>
      <div id='message__wrap' className='-mt-1.5 flex h-full items-center gap-2 dark:text-white'>
        <button type='button' className='shrink-0'>
          <IonIcon className='flex text-3xl' icon='add-circle-outline' />
        </button>
        <Attached />
        <button type='button' className='shrink-0'>
          <IonIcon className='flex text-3xl' icon='happy-outline' />
        </button>
        <EmojiBox onEmojiSelect={handleEmojiSelect} />
      </div>
      <form className='relative flex-1' onSubmit={handleSendMessage}>
        <input
          id='body'
          type='text'
          placeholder='Write your message'
          className='w-full resize-none rounded-full bg-secondery p-2 px-4'
          {...register('body')}
        />
        {!errors.body?.message ? (
          <button type='submit' className='text-dark absolute right-10 top-0 shrink-0 p-2'>
            <IonIcon className='flex text-xl' icon='send-outline' />
          </button>
        ) : (
          ''
        )}
      </form>
    </div>
  )
}

export default SendMessage
