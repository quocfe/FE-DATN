import { IonIcon } from '@ionic/react'
import _ from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSocketContext } from '~/context/socket'
import useMutaionSearchFriendAndGrMsg from '~/pages/Message/hooks/useMutationSearchFriendAndGrMsg'
import { useQueryInfinifyConversation } from '~/pages/Message/hooks/useQueryInfinifyConversation'
import Conversation from './ConversationHeader'
import useMessageFixStore from '~/store/messageFix.store'
import useNotifyMessage from '~/pages/Message/hooks/useNotifyMessage'
import { getProfileFromLocalStorage } from '~/utils/auth'
import useQueryNotifyMessage from '~/hooks/queries/message/useQueryNotifyMessage'
import { Link, useNavigate } from 'react-router-dom'

function MessageHeader() {
  const { data, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useQueryInfinifyConversation()
  const { onlineUsers } = useSocketContext()
  const { ref, inView } = useInView()
  const inputSearchRef = useRef<HTMLInputElement>(null)
  const searchMutation = useMutaionSearchFriendAndGrMsg()
  const [resultSearch, setResultSearch] = useState<any>([])
  const [focusSearch, setFocusSearch] = useState<boolean>(false)
  const [valueSearch, setValueSearch] = useState<string>('')
  const { setMessageFix } = useMessageFixStore()
  const { data: notify } = useQueryNotifyMessage()
  const url = window.location.href
  const navigate = useNavigate()

  let uniqueNotify: any = new Set()
  notify?.data?.data.forEach((data: any) => {
    uniqueNotify.add(data.group_message_id)
  })
  uniqueNotify = Array.from(uniqueNotify)

  const showAllNotify = uniqueNotify && uniqueNotify?.length > 0 ? true : false
  const numberAllNotify = uniqueNotify && uniqueNotify?.length < 10 ? uniqueNotify?.length : '10+'

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, isFetchingNextPage])

  const handleSearch = useCallback(
    _.debounce((query: string) => {
      searchMutation.mutate(query, {
        onSuccess: (data: any) => {
          setResultSearch(data)
        },
        onError: () => {
          setResultSearch([])
        }
      })
    }, 500),
    [searchMutation]
  )

  const handleSelectConversation = (result: any) => {
    setMessageFix({
      group_id: result.group_message_id,
      id: result.user_id,
      type: result.type
    })
  }

  const checkUrlMesage = !url.split('/').includes('message')

  if (checkUrlMesage)
    return (
      <>
        <button
          type='button'
          className='relative p-1 rounded-full sm:bg-secondery sm:p-2 dark:text-white'
          uk-tooltip='title: Tin nhắn; pos: bottom; offset:6'
          aria-describedby='uk-tooltip-13'
          aria-haspopup='true'
          aria-expanded='false'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6 max-sm:hidden'
          >
            <path
              fillRule='evenodd'
              d='M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z'
              clipRule='evenodd'
            />
          </svg>
          {showAllNotify && (
            <div className='absolute top-0 right-0 w-4 h-4 px-1 -m-1 bg-red-600 rounded-full '>
              <p className='text-xs text-white'>{numberAllNotify}</p>
            </div>
          )}
          <IonIcon
            icon='chatbox-ellipses-outline'
            className='text-2xl md hydrated sm:hidden'
            role='img'
            aria-label='chatbox ellipses outline'
          />
        </button>
        <div
          className='border2 uk-drop hidden w-screen rounded-lg bg-white pr-1.5 drop-shadow-xl md:w-[360px] dark:bg-slate-700'
          uk-drop='offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right '
        >
          {/* heading */}
          <div className='flex items-center justify-between gap-2 p-4 pb-1'>
            <h3 className='text-xl font-bold'> Chats </h3>
            <div className='flex gap-2.5 text-lg text-slate-900 dark:text-white'>
              <IonIcon
                onClick={() => {
                  navigate('/message')
                }}
                icon='expand-outline'
                className='cursor-pointer rounded-full p-1.5 hover:bg-slate-100'
              />
            </div>
          </div>
          <div className='flex items-center w-full gap-2 p-2 justify-evenly'>
            {focusSearch && (
              <IonIcon
                onClick={() => {
                  setFocusSearch(false)
                  setValueSearch('')
                }}
                name='arrow-back-outline'
                className='cursor-pointer text-[25px]'
              />
            )}
            <div className='relative w-full p-2 px-3 '>
              <input
                type='text'
                placeholder='Bạn bè, nhóm...'
                ref={inputSearchRef}
                value={valueSearch}
                className=' w-full !py-2 !pl-10 !outline-0 '
                onChange={(e) => {
                  handleSearch(e.target.value)
                  setValueSearch(e.target.value)
                }}
                onFocus={() => setFocusSearch(true)}
              />
              <IonIcon
                icon='search-outline'
                className='absolute -translate-y-1/2 md hydrated left-7 top-1/2 dark:text-white'
                role='img'
                aria-label='search outline'
              />
            </div>
          </div>

          <div className='p-2 pt-0 pr-1 overflow-y-scroll h-80 dark:text-white/80'>
            {focusSearch ? (
              <nav className='text-sm font-medium text-black dark:text-white'>
                {resultSearch?.data?.data?.map((result: any, index: number) => (
                  <a
                    key={index}
                    className=' relative flex cursor-pointer items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                    onClick={() => handleSelectConversation(result)}
                  >
                    <img src={result?.group_thumbnail} className='object-cover rounded-full h-9 w-9' alt='' />
                    <div>{result.group_name}</div>
                  </a>
                ))}
                {resultSearch?.data?.data.length === 0 && valueSearch != '' && (
                  <p className='px-2 py-2.5'>Kết quả không khớp</p>
                )}
              </nav>
            ) : (
              <div className='p-2 pt-0 pr-1 dark:text-white/80'>
                {data?.pages.flat().map((conversation: ConvesationSideBar, index: number) => {
                  const isOnline = onlineUsers.includes(conversation.user_id)
                  if (index === data.pages.flat().length - 1) {
                    return <Conversation innerRef={ref} key={index} item={conversation} isOnline={isOnline} />
                  } else {
                    return <Conversation key={index} item={conversation} isOnline={isOnline} />
                  }
                })}
              </div>
            )}
          </div>
          {/* footer */}
          <Link to={'/message'}>
            <div className='py-4 text-sm font-medium text-center text-blue-600 border-t border-slate-100 dark:border-gray-600 dark:text-white'>
              Xem tất cả tin nhắn
            </div>
          </Link>
          <div className='dark:bg-dark3 absolute -top-1.5 right-3 h-3 w-3 rotate-45 border-l border-t bg-white max-md:hidden dark:border-transparent' />
        </div>
      </>
    )
}

export default MessageHeader
