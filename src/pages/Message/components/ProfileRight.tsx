import { IonIcon } from '@ionic/react'
import React, { useState } from 'react'
import ProfileRightOption from './ProfileRightOption'
import FileRight from './components/FileRight'
import useConversationStore from '~/store/conversation.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import { useQueryRecallMessage } from '../hooks/useQueryRecallMessage'
import { useQueryMembers } from '../hooks/useQueryMembers'
import { Link } from 'react-router-dom'
import { useQueryMessage } from '../hooks/useQueryMessage'
import useFileUpload from '../utils/uploadApi'
import { useQueryConversation } from '../hooks/useQueryConversation'
import useMutationChangePassword from '~/pages/Setting/ChangePassword/hooks/useMutationChangePassword'
import useMutationChangeImageGroup from '../hooks/useMutaionChangeImageGroup'
import Loading from '~/components/Loading'
import EmojiBox from './EmojiBox'
import useEmojiStore from '~/store/emoji.store'

function ProfileRight() {
  const { data: dataMessage } = useQueryMessage()
  const avatar = dataMessage?.data?.data?.info?.avatar
  const group_name = dataMessage?.data?.data?.info?.group_name
  const messages = dataMessage?.data?.data?.messages
  const [showBox, setShowBox] = useState<boolean>(false)
  const [titleBox, setTitleBox] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { user_id } = getProfileFromLocalStorage()
  const { data } = useQueryMembers()
  const { refetch } = useQueryConversation()
  const changeImage = useMutationChangeImageGroup()
  const { setEmoji, emoji } = useEmojiStore()
  const { upload } = useFileUpload()
  const { selectedConversation, setSelectedConversation } = useConversationStore()
  const members = data?.data.data

  const renderList = (type: number) => {
    const listTemp = messages?.filter((message: TypeMessage) => {
      return message.type === type && message.status === true
    })

    const list = listTemp?.filter((item) => {
      return item?.recalls.every((recall: any) => recall.user_id != user_id)
    })

    return list
  }

  const handleSelect = (member: TypeMembersGroup) => {
    setSelectedConversation({
      id: member.user_id,
      type: 1
    })
  }

  const handleChangeImage = async (e: HTMLInputElement) => {
    const body = {
      group_id: selectedConversation.group_id,
      image: ''
    }
    if (e.files) {
      setLoading(true)
      const url = await upload(e.files[0])
      body.image = url
      changeImage.mutate(body, {
        onSuccess: () => {
          refetch()
          setLoading(false)
        },
        onError: () => {
          setLoading(false)
        }
      })
    }
  }

  const handleEmojiSelect = (emoji: EmojiType) => {
    setEmoji(emoji.native)
  }

  if (loading) {
    return <Loading />
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
              <img src={avatar} className='mx-auto mb-3 h-14 w-14 rounded-full' />
              <div className='mt-3'>
                <div className='text-base font-medium text-black md:text-xl dark:text-white'>
                  {' '}
                  {group_name || 'group_name'}
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
              {/* ảnh video */}
              <li className='uk-close '>
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
              {/* File */}
              <li className='uk-close '>
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
              {/* Member */}
              {selectedConversation.type === 2 && (
                <li className='uk-close '>
                  <a
                    className='uk-accordion-title group flex items-center justify-between rounded-md bg-white py-2 text-base text-black dark:bg-gray-800 dark:text-white'
                    href='#'
                  >
                    Thành viên đoạn chat
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
                      {members?.map((member) => (
                        <div key={member.user_id}>
                          <div className='flex cursor-pointer items-center justify-start gap-2 rounded-[10px] p-1 hover:bg-slate-100'>
                            <div className='flex items-center justify-center rounded-full bg-slate-300 hover:bg-primary-soft'>
                              <img src={member.avatar} className='h-8 w-8 rounded-full' />
                            </div>
                            <div className='flex w-full flex-1 flex-col items-start justify-around truncate text-ellipsis'>
                              <p className='text-sm text-slate-800'>{member.fullname}</p>
                              {member.role && <p className='text-[12px] font-thin'>Người tạo nhóm</p>}
                            </div>
                            <div className='uk-inline'>
                              <button
                                className='uk-button uk-button-default flex h-6 w-6 items-center justify-center rounded-full shadow-sm hover:bg-slate-100'
                                type='button'
                              >
                                <IonIcon icon='ellipsis-horizontal' className='font-semibold' />
                              </button>
                              <div uk-dropdown='mode: click' className='w-[200px]'>
                                <div
                                  onClick={() => handleSelect(member)}
                                  className='flex items-center justify-start gap-2 rounded-[4px] p-2 hover:bg-slate-100'
                                >
                                  <IonIcon icon='chatbubble-ellipses-outline' className='text-[12px]' />
                                  <p className='text-[14px] font-semibold'>Gửi tin nhắn</p>
                                </div>
                                <Link
                                  to={`/profile/${member.user_id}`}
                                  className='flex items-center justify-start gap-2 rounded-[4px] p-2 hover:bg-slate-100'
                                >
                                  <IonIcon icon='person-circle-outline' className='text-[12px]' />
                                  <p className='text-[14px] font-semibold'>Xem trang cá nhân</p>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setShowBox(true)
                        setTitleBox('Thành viên')
                      }}
                      className='button-icon mt-4 w-full rounded-lg bg-primary-soft text-xs font-bold'
                    >
                      Xem tất cả
                    </button>
                  </div>
                </li>
              )}
              {/* Option */}
              <li className='uk-close '>
                <a
                  className='uk-accordion-title group flex items-center justify-between rounded-md bg-white py-2 text-base text-black dark:bg-gray-800 dark:text-white'
                  href='#'
                >
                  Tùy chỉnh đoạn chat
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
                    <div className='flex cursor-pointer items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'>
                      <IonIcon icon='pencil-outline' className='text-[22px]' />
                      <p className='text-[14px] font-semibold'>Đổi tên đoạn chat</p>
                    </div>
                    <label className='flex cursor-pointer items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'>
                      <input type='file' accept='image/*' hidden onChange={(e) => handleChangeImage(e.target)} />
                      <IonIcon icon='image' className='text-[22px]' />
                      <p className='text-[14px] font-semibold'>Thay đổi ảnh</p>
                    </label>
                    <div className='flex cursor-pointer items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'>
                      <div className='rounded-full p-1 shadow'>👍</div>
                      <p className='text-[14px] font-semibold'>Thay đổi biểu tượng cảm xúc</p>
                      <EmojiBox onEmojiSelect={handleEmojiSelect} />
                    </div>

                    <button
                      type='button'
                      className='dark:bg-dark3 shrink-0 rounded-full border border-sky-100 bg-sky-50 p-1.5 text-green-600 shadow-sm duration-100 hover:scale-[1.15] dark:border-0'
                    >
                      <IonIcon className='flex text-2xl' icon='happy-outline' />
                    </button>
                    <EmojiBox onEmojiSelect={handleEmojiSelect} />
                  </div>
                </div>
              </li>
              {/* Setting */}
              <li className='uk-close '>
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
//  <div className='absolute rounded-full shadow-sm uk-inline right-8 '>
//         <button
//           className='flex items-center justify-center w-6 h-6 rounded-full shadow-sm uk-button uk-button-default hover:bg-slate-100'
//           type='button'
//         >
//           <IonIcon icon='ellipsis-horizontal' className='font-semibold' />
//         </button>
//         <div uk-dropdown='mode: click' className='w-[250px]'>
//           <div className='p-2'>
//             <div className='flex items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'>

//             </div>

//           </div>
//         </div>
//       </div>
