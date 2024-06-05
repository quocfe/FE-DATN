import { IonIcon } from '@ionic/react'
import React, { useState } from 'react'
import ProfileRightOption from './ProfileRightOption'
import FileRight from './components/FileRight'
import useConversationStore from '~/store/conversation.store'
import { getProfileFromLocalStorage } from '~/utils/auth'

type ProfileRightProps = {
  groupImg: string
  groupName: string
  groupId: string
}

function ProfileRight({ groupImg, groupName }: ProfileRightProps) {
  const [showBox, setShowBox] = useState<boolean>(false)
  const [titleBox, setTitleBox] = useState<string>('')
  const { messages } = useConversationStore()
  const { user_id } = getProfileFromLocalStorage()

  const renderList = (type: number) => {
    const listTemp = messages.filter((message: Message) => {
      return message.type === type && message.status != true
    })
    const list = listTemp.filter((message: Message) => {
      return message.status === null || (message.status === false && message.detelectedBy != user_id)
    })

    return list
  }

  return (
    <div className='rightt absolute right-0 top-0 z-10 hidden h-full w-full transition-transform'>
      <div className='uk-animation-slide-right-medium dark:bg-dark2 no-scrollbar absolute right-0 top-0 z-50 h-full w-[360px] overflow-y-scroll border-l bg-white shadow-lg delay-200 dark:border-slate-700'>
        {/* line color */}
        <div className='-mt-px h-1.5 w-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-500' />
        {/* btn setting */}
        <div className={`flex items-center ${showBox ? 'justify-between' : 'justify-end'} `}>
          {showBox && (
            <button type='button' className='m-2 rounded-full bg-secondery p-2' onClick={() => setShowBox(false)}>
              <IonIcon icon='chevron-back-outline' className='flex text-2xl' />
            </button>
          )}
          <button type='button' className='m-2 rounded-full bg-secondery p-2' uk-toggle='target: .rightt ; cls: hidden'>
            <IonIcon icon='close' className='flex text-2xl' />
          </button>
        </div>
        {/* content */}

        {showBox ? (
          <ProfileRightOption title={titleBox} listImage={renderList(2)} listFile={renderList(3)} />
        ) : (
          <>
            <div className='mx-3 border-b-[1px] py-10 pt-2 text-center text-sm'>
              <img src={groupImg} className='mx-auto mb-3 h-14 w-14 rounded-full' />
              <div className='mt-3'>
                <div className='text-base font-medium text-black md:text-xl dark:text-white'>
                  {' '}
                  {groupName || 'Groupname'}
                </div>
              </div>
              <div className='mt-3'>
                <div className='flex items-center justify-center gap-4'>
                  <div className='flex cursor-pointer items-center justify-center rounded-full bg-slate-300 p-2 hover:bg-primary-soft'>
                    <IonIcon icon='person-circle-outline' className='text-[20px] ' />
                  </div>
                  <div className='flex cursor-pointer items-center justify-center rounded-full bg-slate-300 p-2 hover:bg-primary-soft'>
                    <IonIcon icon='search-outline' className='text-[20px] ' />
                  </div>
                  <div className='flex cursor-pointer items-center justify-center rounded-full bg-slate-300 p-2 hover:bg-primary-soft'>
                    <IonIcon icon='notifications-off-outline' className='text-[20px] ' />
                  </div>
                </div>
              </div>
            </div>
            <ul className='relative mx-2 space-y-3 p-3' uk-accordion='active: 0'>
              <li className='uk-open '>
                <a
                  className='uk-accordion-title group flex items-center justify-between rounded-md bg-white py-2 text-base text-black dark:bg-gray-800 dark:text-white '
                  href='#'
                >
                  Ảnh - video
                  <svg
                    className='h-5 w-5 duration-200 group-aria-expanded:rotate-180'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    fill='none'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <polyline points='6 9 12 15 18 9' />
                  </svg>
                </a>
                <div className='uk-accordion-content dark:text-white/80'>
                  <div className='grid grid-cols-4 grid-rows-1 gap-2'>
                    {renderList(2)?.map(({ sub_body }: { sub_body: string }) => (
                      <img src={sub_body} key={sub_body} className='h-[90px] w-[90px] rounded-md object-cover' />
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setShowBox(true)
                      setTitleBox('Ảnh - Video')
                    }}
                    className='button-icon mt-4 w-full rounded-lg bg-primary-soft text-xs font-bold'
                  >
                    Xem tất cả
                  </button>
                </div>
              </li>
              <li className='uk-open '>
                <a
                  className='uk-accordion-title group flex items-center justify-between rounded-md bg-white py-2 text-base text-black dark:bg-gray-800 dark:text-white'
                  href='#'
                >
                  File
                  <svg
                    className='h-5 w-5 duration-200 group-aria-expanded:rotate-180'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    fill='none'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <polyline points='6 9 12 15 18 9' />
                  </svg>
                </a>
                <div className='uk-accordion-content dark:text-white/80'>
                  <div className='flex w-full flex-col gap-2'>
                    {/* ---- */}
                    {renderList(3)?.map(({ body }: { body: string }) => (
                      <div key={body} className='flex cursor-pointer gap-3 p-2 shadow-sm'>
                        <div className='flex  items-center rounded-[10px] bg-secondery p-2 '>
                          <IonIcon icon='document' className='h-6 w-6' />
                        </div>
                        <div className='flex w-full flex-1 flex-col items-start justify-around truncate text-ellipsis'>
                          <p className='text-sm'>{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setShowBox(true)
                      setTitleBox('File')
                    }}
                    className='button-icon mt-4 w-full rounded-lg bg-primary-soft text-xs font-bold'
                  >
                    Xem tất cả
                  </button>
                </div>
              </li>
              <li className='uk-open '>
                <a
                  className='uk-accordion-title group flex items-center justify-between rounded-md bg-white py-2 text-base text-black dark:bg-gray-800 dark:text-white'
                  href='#'
                >
                  Cài đặt
                  <svg
                    className='h-5 w-5 duration-200 group-aria-expanded:rotate-180'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    fill='none'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <polyline points='6 9 12 15 18 9' />
                  </svg>
                </a>
                <div className='uk-accordion-content dark:text-white/80'>
                  <ul className='p-3 text-base font-medium'>
                    <li>
                      <button
                        type='button'
                        className='flex w-full items-center gap-5 rounded-md p-3 hover:bg-secondery'
                      >
                        <IonIcon icon='flag-outline' className='text-2xl' /> Báo cáo
                      </button>
                    </li>
                    <li>
                      <button
                        type='button'
                        className='flex w-full items-center gap-5 rounded-md p-3 hover:bg-secondery'
                      >
                        <IonIcon icon='settings-outline' className='text-2xl' />
                        Cài đặt tin nhắn
                      </button>
                    </li>
                    <li>
                      <button
                        type='button'
                        className='flex w-full items-center gap-5 rounded-md p-3 hover:bg-secondery'
                      >
                        <IonIcon icon='stop-circle-outline' className='text-2xl' /> Chặn người dùng
                      </button>
                    </li>
                    <li>
                      <button
                        type='button'
                        className='flex w-full items-center gap-5 rounded-md p-3 text-red-500 hover:bg-red-50'
                      >
                        <IonIcon icon='trash-outline' className='text-2xl' /> Xóa đoạn hội thoại
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </>
        )}

        {/* close button */}
      </div>
      {/* overly */}
      <div
        className='absolute h-full w-full bg-slate-100/40 backdrop-blur dark:bg-slate-800/40'
        uk-toggle='target: .rightt ; cls: hidden'
      />
    </div>
  )
}

export default ProfileRight
