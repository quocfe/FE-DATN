import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSocketContext } from '~/context/socket'
import CallVideo from '~/pages/Message/components/CallVideo'
import useConversationStore from '~/store/conversation.store'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import messageApi from '~/apis/message.api'
import StatusMessage from '~/pages/Message/components/components/StatusMessage'
import useAuthStore from '~/store/auth.store'
import useMessageStore from '~/store/message.store'
import { MessageFix } from '~/store/messageFix.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import { formatDate } from '~/utils/helpers'
import CustomFileInput from '../InputFile/CustomFileInput'
import { AudioMsg, FileMsg, ImageMsg, TextMsg, VideoCallMsg, VideoMsg } from './TypeMessageFix'
import PreviewFileUpload from '~/pages/Message/components/components/PreviewFileUpload'
import { useMutationSendMessage } from '~/pages/Message/hooks/useMutationSendMessage'
import Loading from '../Loading'
import Spinner from './../../pages/Message/components/Skelaton/Spinner'

// Tin nhan theo ngay
const groupMessagesByDate = (messages: TypeMessage[]): Record<string, TypeMessage[]> => {
  return messages.reduce(
    (acc, message) => {
      const date = new Date(message?.createdAt).toDateString()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(message)
      return acc
    },
    {} as Record<string, TypeMessage[]>
  )
}

const shouldShowTime = (currentMessage: TypeMessage, previousMessage?: TypeMessage): boolean => {
  if (!previousMessage) return true
  const currentTime = new Date(currentMessage.createdAt).getTime()
  const previousTime = new Date(previousMessage.createdAt).getTime()
  return currentTime - previousTime >= 5 * 60 * 1000 // 5 minutes in milliseconds
}

const ChatMessageFixed = ({ message_fix, infoMessage }: { message_fix: MessageFix; infoMessage: InfoMessage }) => {
  const { toggleBoxReply, togglePreviewBox, setToggleBoxSearchMessage, pinMessage, selectedConversation } =
    useConversationStore()
  const { user_id, first_name, last_name, Profile } = getProfileFromLocalStorage()
  const chatMessageRef = useRef<HTMLInputElement>(null)
  const [showScrollBtn, setShowScrollBtn] = useState<boolean>(false)
  const [callVideo, setCallVideo] = useState<boolean>(false)
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false)
  const boxReplyRef = useRef<HTMLDivElement>(null)
  const previewUploadRef = useRef<HTMLDivElement>(null)
  const { socket } = useSocketContext()
  const { setVideoCall, setAcceptCall } = useMessageStore()
  const [calculateHeight, setCalculateHeight] = useState<number>(0)

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

  const { profile } = useAuthStore()
  const bottomRef = useRef<HTMLDivElement>(null)

  const fetchMessage = async ({ pageParam }: { pageParam: number }) => {
    if (message_fix.type === 1) {
      const data = await messageApi.getOneToOneMessage(message_fix.id, pageParam, 30)
      return data.data.data.messages
    } else if (message_fix.type === 2) {
      const data = await messageApi.getGroupMessage(message_fix.group_id, pageParam, 30)
      return data.data.data.messages
    }
  }

  const {
    data: dataMsg,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ['messageInfinity', message_fix.group_id && message_fix.id],
    queryFn: fetchMessage,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length === 30) {
        return allPages.length + 1
      } else {
        return undefined
      }
    }
  })

  const { ref, inView } = useInView({ threshold: 0.25 })
  const [showNewMsg, setShowNewMsg] = useState(false)
  const newArr = useMemo(() => {
    if (dataMsg?.pages?.length) {
      return dataMsg.pages.slice().reverse()
    }
    return []
  }, [dataMsg])

  const lastArrRefs = newArr[0]
  const lastRef = lastArrRefs && lastArrRefs[0]
  const scrollIntoViewFn = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ block: 'end' })
    } else {
      console.error('bottomRef.current is null')
    }
  }
  useEffect(() => {
    scrollIntoViewFn()
  })

  useEffect(() => {
    if (!isAtBottom && isFetchingNextPage) {
      scrollIntoViewFn()
    }
  }, [newArr.flat().length])

  useEffect(() => {
    if (isAtBottom) {
      scrollIntoViewFn()
    } else {
      setShowNewMsg(true)
    }
  }, [newArr?.flat().slice(-1)[0]])

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  useEffect(() => {
    isAtBottom && setShowNewMsg(false)
  }, [isAtBottom])

  const groupedMessagesByDate = useMemo(() => groupMessagesByDate(newArr.flat() as TypeMessage[]), [newArr])
  const showStatus =
    newArr.flat()[newArr.flat().length - 1]?.createdBy === user_id && newArr.flat()[newArr.flat().length - 1]?.type != 0

  // if (true) {
  //   return (
  //     <div className='flex items-center justify-center w-full h-full'>
  //       <Spinner w='20' h='20' />
  //     </div>
  //   )
  // }

  return (
    <div>
      {!hasNextPage && (
        <div className='py-5 text-center text-sm lg:pt-8'>
          <img src={infoMessage?.avatar} className='mx-auto mb-3 h-24 w-24 rounded-full object-cover' />
          <div className='mt-2'>
            <div className='text-[12px] text-base font-medium text-black dark:text-white '>
              {infoMessage?.group_name}
            </div>
            {message_fix.type != 2 && (
              <div className='text-[12px] text-gray-500 dark:text-white/80'>@{infoMessage?.group_id}</div>
            )}
          </div>

          {message_fix.type != 2 && (
            <div className='mt-2.5'>
              {infoMessage?.group_id && (
                <Link
                  to={`/profile/${infoMessage.group_id}`}
                  className='inline-block rounded-lg bg-secondery px-2 py-1 text-sm font-semibold'
                >
                  View profile
                </Link>
              )}
            </div>
          )}
        </div>
      )}
      {isFetchingNextPage && (
        <Spinner classNames='flex items-center justify-center' w='6' h='6' title='Đang tải tin nhắn' />
      )}
      <p onClick={() => scrollIntoViewFn()}>scroll</p>
      <div className='space-y-2 text-sm font-medium'>
        {Object.entries(groupedMessagesByDate).map(([date, dayMessages]) => (
          <div className='space-y-2' key={date}>
            <div className='text-center text-xs text-gray-500 dark:text-gray-400'>{formatDate(date)}</div>
            {dayMessages.map((item, index) => {
              const previousMessage = index > 0 ? dayMessages[index - 1] : undefined
              const nextMessage = index < dayMessages.length - 1 ? dayMessages[index + 1] : undefined
              const showTime = shouldShowTime(item, previousMessage)
              const showImg =
                !nextMessage || nextMessage.createdBy !== item.createdBy || shouldShowTime(nextMessage, item)
              return (
                <div key={index}>
                  {showTime && (
                    <div className='text-center text-[10px] text-gray-500 dark:text-gray-400'>
                      {new Date(item?.createdAt).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}
                  {item?.message_id === lastRef?.message_id ? <div className='ref' ref={ref} /> : null}
                  {item?.type === 0 && <p className='my-2 text-center text-[8px]'>{item.body}</p>}
                  {item?.type === 1 && <TextMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item?.type === 2 && <ImageMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item?.type === 3 && <FileMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item?.type === 4 && <VideoMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item?.type === 5 && <AudioMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                  {item?.type === 6 && <VideoCallMsg showImg={showImg} item={item} userid={profile?.user_id || ''} />}
                </div>
              )
            })}
          </div>
        ))}
        <PreviewFileUpload />
      </div>
      {showStatus && <StatusMessage group_id_fixed={message_fix.group_id} />}
      <div ref={bottomRef} className='h-[10px]' id='bottomRef' />
    </div>
  )
}

export default ChatMessageFixed
