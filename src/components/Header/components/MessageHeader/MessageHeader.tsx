import { IonIcon } from '@ionic/react'
import { useQueryConversation } from '~/pages/Message/hooks/useQueryConversation'
import { checkBodyMessage } from '~/pages/Message/utils/checkBodyMessage'
import useConversationStore from '~/store/conversation.store'
import { calculateTimeAgo } from '~/utils/helpers'

function MessageHeader() {
  const { data, isLoading } = useQueryConversation()

  const { setSelectedConversation } = useConversationStore()
  return (
    <>
      <button
        type='button'
        className='relative rounded-full p-1 sm:bg-secondery sm:p-2 dark:text-white'
        uk-tooltip='title: Messages; pos: bottom; offset:6'
        title=''
        aria-describedby='uk-tooltip-13'
        aria-haspopup='true'
        aria-expanded='false'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-6 w-6 max-sm:hidden'
        >
          <path
            fillRule='evenodd'
            d='M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z'
            clipRule='evenodd'
          />
        </svg>
        <IonIcon
          icon='chatbox-ellipses-outline'
          className='md hydrated text-2xl sm:hidden'
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
            <IonIcon icon='expand-outline' className='md hydrated' role='img' aria-label='expand outline' />
            <IonIcon icon='create-outline' className='md hydrated' role='img' aria-label='create outline' />
          </div>
        </div>
        <div className='relative w-full p-2 px-3 '>
          <input type='text' className='w-full !rounded-lg !pl-10 dark:!bg-white/10' placeholder='Search' />
          <IonIcon
            icon='search-outline'
            className='md hydrated absolute left-7 top-1/2 -translate-y-1/2 dark:text-white'
            role='img'
            aria-label='search outline'
          />
        </div>
        <div className='h-80 overflow-y-auto pr-2'>
          <div className='p-2 pr-1 pt-0 dark:text-white/80'>
            {/* {data?.pages.map((conversations: ConvesationSideBar[]) =>
              conversations.map((item: ConvesationSideBar, index: number) => (
                <a
                  key={index}
                  onClick={() => setSelectedConversation(item)}
                  href='#!'
                  className='relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10'
                >
                  <div className='relative w-10 h-10 shrink-0'>
                    <img
                      src={`${item?.group_thumbnail ? item?.group_thumbnail : 'src/assets/images/avatars/avatar-5.jpg'} `}
                      alt=''
                      className='object-cover w-full h-full rounded-full'
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <div className='mr-auto text-sm font-medium text-black dark:text-white'>{item.group_name}</div>
                      <div className='text-xs text-gray-500 dark:text-white/80'>
                        {item?.messages?.createdAt && calculateTimeAgo(item.messages.createdAt)}
                      </div>
                      <div className='h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-slate-700' />
                    </div>
                    <div className='overflow-hidden text-xs font-normal text-ellipsis whitespace-nowrap'>
                      {item?.messages?.body && checkBodyMessage(item?.messages?.body)}
                    </div>
                  </div>
                </a>
              ))
            )} */}
          </div>
        </div>
        {/* footer */}
        <a href='#!'>
          <div className='border-t border-slate-100 py-4 text-center text-sm font-medium text-blue-600 dark:border-gray-600 dark:text-white'>
            See all Messages
          </div>
        </a>
        <div className='dark:bg-dark3 absolute -top-1.5 right-3 h-3 w-3 rotate-45 border-l border-t bg-white max-md:hidden dark:border-transparent' />
      </div>
    </>
  )
}

export default MessageHeader
