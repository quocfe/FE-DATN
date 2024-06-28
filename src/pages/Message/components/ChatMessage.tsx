import { IonIcon } from '@ionic/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { memo, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useAuthStore from '~/store/auth.store'
import useConversationStore from '~/store/conversation.store'
import { formatDate } from '~/utils/helpers'
import { useQueryMessage } from '../hooks/useQueryMessage'

import { FileMsg, ImageMsg, TextMsg, VideoMsg } from './TypeMessage'
import PreviewFileUpload from './components/PreviewFileUpload'
import Spinner from './Skelaton/Spinner'
import { fetchMessages } from '../utils/fetchInfiniteMessage'
import { useQueryInfinifyMessage } from '../hooks/useQueryInfinifyMessage'

//gom các message cùng ngày
const groupMessagesByDate = (messages: TypeMessage[]): Record<string, TypeMessage[]> => {
  return messages.reduce(
    (acc, message) => {
      const date = new Date(message.createdAt).toDateString()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(message)
      return acc
    },
    {} as Record<string, TypeMessage[]>
  )
}

// fn hiện thị thời gian
const shouldShowTime = (currentMessage: TypeMessage, previousMessage?: TypeMessage): boolean => {
  if (!previousMessage) return true
  const currentTime = new Date(currentMessage.createdAt).getTime()
  const previousTime = new Date(previousMessage.createdAt).getTime()
  return currentTime - previousTime >= 5 * 60 * 1000 // 5 minutes in milliseconds
}

const ChatMessage = ({ showScrollBtn, isAtBottom }: { showScrollBtn: boolean; isAtBottom: boolean }) => {
  const { selectedConversation } = useConversationStore()
  const { profile } = useAuthStore()
  const bottomRef = useRef<HTMLDivElement>(null)
  const { data } = useQueryMessage()
  const infoMessage = data?.data?.data?.info
  const { data: dataMsg, isFetchingNextPage, hasNextPage, fetchNextPage } = useQueryInfinifyMessage()
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
      console.log('fire')
    }
  }, [inView, isFetchingNextPage])

  let messageArr = dataMsg?.pages?.length
  let newArr = []
  if (messageArr !== undefined) {
    for (let i = messageArr - 1; i >= 0; i--) {
      newArr.push(dataMsg?.pages[i])
    }
  }

  const lastArrRefs = newArr[0]
  const lastRef = lastArrRefs && lastArrRefs[0]

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef?.current.scrollIntoView({ block: 'end' })
    }
  }, [selectedConversation.id])

  useEffect(() => {
    if (!isAtBottom && isFetchingNextPage) {
      if (bottomRef.current) {
        bottomRef?.current.scrollIntoView({ block: 'end' })
      }
    }
  }, [newArr.flat().length])

  const groupedMessagesByDate = groupMessagesByDate(newArr.flat() as TypeMessage[])
  return (
    <div className='relative'>
      {!isFetchingNextPage && (
        <div className='py-10 text-center text-sm lg:pt-8'>
          <img src={infoMessage?.avatar} className='mx-auto mb-3 h-24 w-24 rounded-full object-cover' />
          <div className='mt-8'>
            <div className='text-base font-medium text-black md:text-xl dark:text-white'>{infoMessage?.group_name}</div>
            <div className='text-sm text-gray-500 dark:text-white/80'>@{infoMessage?.group_id}</div>
          </div>
          <div className='mt-3.5'>
            <a href='timeline.html' className='inline-block rounded-lg bg-secondery px-4 py-1.5 text-sm font-semibold'>
              View profile
            </a>
          </div>
        </div>
      )}
      <div className='space-y-2 text-sm font-medium'>
        {isFetchingNextPage ? (
          <Spinner classNames='flex items-center justify-center' w='6' h='6' title='Đang tải tin nhắn' />
        ) : (
          ''
        )}
        {Object.entries(groupedMessagesByDate).map(([date, dayMessages]) => (
          <div className='space-y-2 ' key={date}>
            <div className='text-center text-xs text-gray-500 dark:text-gray-400'>{formatDate(date)}</div>
            {dayMessages.map((item: TypeMessage, index: number) => {
              const previousMessage = index > 0 ? dayMessages[index - 1] : undefined
              const nextMessage = index < dayMessages.length - 1 ? dayMessages[index + 1] : undefined
              const showTime = shouldShowTime(item, previousMessage)
              const showImg =
                !nextMessage || nextMessage.createdBy !== item.createdBy || shouldShowTime(nextMessage, item)
              // console.log('item index = 0', index === 0 ? item : '')
              return (
                <div key={item.message_id}>
                  {showTime && (
                    <div className='text-center text-[10px] text-gray-500 dark:text-gray-400'>
                      {new Date(item.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}

                  {dayMessages[0].message_id === lastRef?.message_id ? <div className='ref' ref={ref} /> : ''}
                  {/* {newArr ?? newArr[page - 1][0] ? <div className='ref' ref={ref} /> : ''} */}
                  {item.type === 1 && <TextMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 2 && <ImageMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 3 && <FileMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item.type === 4 && <VideoMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                </div>
              )
            })}
          </div>
        ))}

        <PreviewFileUpload />
      </div>
      <div
        className={`${showScrollBtn ? 'visible' : 'hidden'} fixed bottom-[100px] left-[70%] flex cursor-pointer items-center rounded-full bg-white p-2 text-primary shadow-inner`}
        onClick={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })}
      >
        <IonIcon icon='arrow-down' />
      </div>
      <div ref={bottomRef} className='h-[20px]' />
    </div>
  )
}

export default memo(ChatMessage)
