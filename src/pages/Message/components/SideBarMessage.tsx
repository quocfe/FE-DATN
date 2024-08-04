import { IonIcon } from '@ionic/react'
import _ from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSocketContext } from '~/context/socket'
import useNotifyMessageSocket from '~/hooks/socket/useNotifyMessageSocket'
import useConversationStore from '~/store/conversation.store'
import useMutaionSearchFriendAndGrMsg from '../hooks/useMutationSearchFriendAndGrMsg'
import { useQueryInfinifyConversation } from '../hooks/useQueryInfinifyConversation'
import ModalCreateGroup from './ModalCreateGroup'
import SideBarMessageSkelaton from './Skelaton/SideBarMessageSkelaton'
import Conversation from './components/Conversation'

const SideBarMessage = () => {
  const { setSelectedConversation } = useConversationStore()
  const [isOpen, setIsOpen] = useState(false)
  const [resultSearch, setResultSearch] = useState<any>([])
  const searchMutation = useMutaionSearchFriendAndGrMsg()
  const { onlineUsers } = useSocketContext()
  const inputSearchRef = useRef<HTMLInputElement>(null)
  // const { data: conversation, isLoading } = useQueryConversation()
  const { ref, inView } = useInView()

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
    if (result.type === 1) {
      if (result.group_message_id) {
        setSelectedConversation({
          group_id: result.group_message_id,
          id: result.user_id,
          type: 1
        })
      } else {
        setSelectedConversation({
          id: result.user_id,
          type: 1
        })
      }
    } else if (result.type === 2) {
      setSelectedConversation({
        group_id: result.group_message_id,
        id: result.group_message_id,
        type: 2
      })
    }
    if (inputSearchRef.current) {
      inputSearchRef.current.value = ''
    }
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useQueryInfinifyConversation()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, isFetchingNextPage])

  if (status === 'pending') {
    return <SideBarMessageSkelaton />
  }
  return (
    <div className=' relative border-r md:w-[360px] dark:border-slate-700'>
      <div
        id='side-chat'
        className='dark:bg-dark2 left-0 top-0 z-50 bg-white max-md:fixed max-md:h-screen max-md:w-5/6 max-md:-translate-x-full max-md:shadow'
      >
        {/* heading title */}
        <div className='border-b p-4 dark:border-slate-700'>
          <div className='mt-2 flex items-center justify-between'>
            <h2 className='ml-1 text-2xl font-bold text-black dark:text-white'> Đoạn chat </h2>
            {/* right action buttons */}
            <div className='flex items-center gap-2.5'>
              <button className='group'>
                <IonIcon icon='settings-outline' className='flex text-2xl group-aria-expanded:rotate-180' />
              </button>
              <div
                className='w-full md:w-[270px]'
                uk-dropdown='pos: bottom-left; offset:10; animation: uk-animation-slide-bottom-small'
              >
                <nav>
                  <a href='#'>
                    <IonIcon className='-ml-1 shrink-0 text-2xl' icon='checkmark-outline' /> Mark all as read{' '}
                  </a>
                  <a href='#'>
                    <IonIcon className='-ml-1 shrink-0 text-2xl' icon='notifications-outline' /> notifications setting{' '}
                  </a>
                  <a href='#'>
                    <IonIcon className='-ml-1 shrink-0 text-xl' icon='volume-mute-outline' /> Mute notifications{' '}
                  </a>
                </nav>
              </div>
              <button
                type='button'
                aria-expanded='false'
                className='rounded-xl p-2 transition duration-200 ease-in-out hover:bg-secondery'
                onClick={() => setIsOpen(true)}
              >
                <IonIcon icon='people-outline' className='flex text-2xl' />
              </button>
              <ModalCreateGroup isOpen={isOpen} onClose={() => setIsOpen(false)} />
              {/* mobile toggle menu */}
              <button
                type='button'
                className='md:hidden'
                uk-toggle='target: #side-chat ; cls: max-md:-translate-x-full'
              >
                <IonIcon icon='chevron-down-outline' />
              </button>
            </div>
          </div>
          <div className='relative mt-4'>
            {/* search */}
            <div
              className='left-0 z-[11]  overflow-hidden rounded-xl bg-secondery  max-md:hidden max-sm:fixed max-sm:top-2 sm:relative sm:w-full xl:w-[327px] dark:!bg-white/5'
              tabIndex={0}
              aria-haspopup='true'
              aria-expanded='false'
            >
              <div className='absolute bottom-1/2 left-3 flex translate-y-1/2'>
                <IonIcon icon='search' className='text-xl' />
              </div>
              <input
                type='text'
                placeholder='Bạn bè, nhóm...'
                ref={inputSearchRef}
                className=' w-full !py-2 !pl-10 !outline-0 '
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {/* search downdown */}
            <div
              className='uk- open uk-drop z-10 hidden w-full'
              uk-drop='pos: bottom-center ; animation: uk-animation-slide-bottom-small;mode:click '
            >
              <div className='dark:bg-dark3 w-screen rounded-ee-md rounded-es-md bg-white p-2 pt-3 shadow-lg sm:w-full xl:w-[330px]'>
                <div className='flex justify-between px-2 py-2.5 text-sm font-medium'>
                  <div className='text-black dark:text-white'>Bạn bè</div>
                </div>
                <nav className='text-sm font-medium text-black dark:text-white'>
                  {resultSearch?.data?.data?.map((result: any, index: number) => {
                    console.log(result)
                    return (
                      <a
                        key={index}
                        className=' relative flex cursor-pointer items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                        onClick={() => handleSelectConversation(result)}
                      >
                        <img src={result?.group_thumbnail} className='h-9 w-9 rounded-full object-cover' alt='' />
                        <div>{result.group_name}</div>
                      </a>
                    )
                  })}
                  {resultSearch?.data?.data.length === 0 && <p className='px-2 py-2.5'>Kết quả không khớp</p>}
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* users list */}
        <div className='h-[calc(100vh-130px)] space-y-2 overflow-y-auto  p-2 md:h-[calc(100vh-204px)]'>
          {data?.pages.flat().map((conversation: ConvesationSideBar, index: number) => {
            const isOnline = onlineUsers.includes(conversation.user_id)
            if (index === data.pages.flat().length - 1) {
              return <Conversation innerRef={ref} key={index} item={conversation} isOnline={isOnline} />
            } else {
              return <Conversation key={index} item={conversation} isOnline={isOnline} />
            }
          })}
        </div>
      </div>
      {/* overly */}
      <div
        id='side-chat'
        className='fixed inset-0 z-40 h-full w-full bg-slate-100/40 backdrop-blur max-md:-translate-x-full md:hidden dark:bg-slate-800/40'
        uk-toggle='target: #side-chat ; cls: max-md:-translate-x-full'
      />
    </div>
  )
}

export default SideBarMessage
