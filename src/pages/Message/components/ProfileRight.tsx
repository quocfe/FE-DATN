import { IonIcon } from '@ionic/react'
import _ from 'lodash'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '~/components/Loading'
import useConversationStore from '~/store/conversation.store'
import useEmojiStore from '~/store/emoji.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import useMutationChangeGroupName from '../hooks/useMutaion/useMutaionChangeGroupName'
import useMutationChangeImageGroup from '../hooks/useMutaion/useMutaionChangeImageGroup'
import { useQueryConversation } from '../hooks/useQueryConversation'
import { useQueryMembers } from '../hooks/useQueryMembers'
import { useQueryMessage } from '../hooks/useQueryMessage'
import useFileUpload from '../utils/uploadApi'
import ProfileRightOption from './ProfileRightOption'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useQueryInfinifyMessage } from '../hooks/useQueryInfinifyMessage'
import ModalAddMember from './ModalAddMember'
import Dialog from '~/components/Dialog'
import ModalChageRole from './ModalChageRole'
import useMutationDeleteOrLeaveMember from '../hooks/useMutaion/useMutationDeleteOrLeaveMember'
import { renderTypeFile } from '../utils/renderTypeFile'
import { useQueryStatusMessage } from '../hooks/useQueryStatusMessage'
import { useQueryInfinifyConversation } from '../hooks/useQueryInfinifyConversation'
import FeatureNotAllow from '~/components/FeatureNotAllow'
import BlockOrUnBlockUserInMsg from '~/components/BlockOrUnBlockUserInMsg'
import DeleteConversationMsg from '~/components/DeleteConversationMsg'

const IconOptionList = [
  {
    icon: 'person-circle-outline',
    label: 'Profile'
  },

  {
    icon: 'notifications-off-outline',
    label: 'Unmute'
  },
  {
    icon: 'person-add-outline',
    label: 'Add-user'
  }
]

function ProfileRight() {
  // useState
  const [showBox, setShowBox] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showModalChangeRole, setShowModalChangeRole] = useState<boolean>(false)
  const [groupName, setGroupName] = useState<string>('')
  const [titleBox, setTitleBox] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [dataDelete, setDataDelete] = useState<{ user_id: string; group_id: string }>({ user_id: '', group_id: '' })
  const [openModalAddMember, setOpenModalAddMember] = useState<boolean>(false)
  const [showDiaLogDeleteOrLeaveMember, setShowDiaLogDeleteOrLeaveMember] = useState<boolean>(false)
  const [showDiaLogFeatureNotAllow, setShowDiaLogFeatureNotAllow] = useState<boolean>(false)
  const [showDialogBlock, setShowDialogBlock] = useState<boolean>(false)
  //  hook
  const { selectedConversation, setSelectedConversation } = useConversationStore()
  const { user_id } = getProfileFromLocalStorage()
  const { setEmoji, emoji } = useEmojiStore()
  const { uploadNoPreview } = useFileUpload()
  const navigate = useNavigate()

  // useQuery
  const { refetch: refetchMsgInfi } = useQueryInfinifyMessage()
  const { data: dataMessage, refetch: refetchMsg } = useQueryMessage()
  const { data: dataConver, refetch: refetchConver } = useQueryConversation()

  const info = dataMessage?.data?.data?.info
  const avatar = info?.avatar
  const group_name = info?.group_name
  const group_id = info?.group_id as string
  const messages = dataMessage?.data?.data?.messages
  const isBlock = info?.list_block_user?.some((id) => id === info?.group_id)
  const isBlocked = info?.list_blocked_user?.some((id) => id === info?.group_id)
  const isBlockedOrBlocking =
    info?.list_block_user?.includes(info?.group_id) || info?.list_blocked_user?.includes(info?.group_id)

  const { data, refetch: refetchMembers } = useQueryMembers(selectedConversation.group_id, 2)
  const changeImage = useMutationChangeImageGroup()
  const members = data?.data.data
  const changeGroupNameMutation = useMutationChangeGroupName()
  const deleteOrLeaveMember = useMutationDeleteOrLeaveMember()
  const { refetch: refetchStatusMessage } = useQueryStatusMessage()
  const { refetch: refetchConversation } = useQueryInfinifyConversation()
  const { refetch: refetchMessage } = useQueryInfinifyMessage()
  //
  const checkRuleUserLogin = members?.filter((member) => member.user_id === user_id)
  const admin = checkRuleUserLogin && checkRuleUserLogin[0]?.role
  // const userLogin = members?.filter((m) => m.user_id === user_id)

  const renderMessageList = (type: number) => {
    const listTemp = messages?.filter((message: TypeMessage) => {
      return message.type === type && message.status === true
    })

    const list = listTemp?.filter((item) => {
      return item?.recalls.every((recall: any) => recall.user_id != user_id)
    })

    return list
  }

  const handleSelect = (member: TypeMembersGroup) => {
    if (member.group_message_id) {
      setSelectedConversation({
        group_id: member.group_message_id,
        id: member.user_id,
        type: 1
      })
    } else {
      setSelectedConversation({
        id: member.user_id,
        type: 1
      })
    }
  }

  const handleChangeImage = async (e: HTMLInputElement) => {
    const body = {
      group_id: selectedConversation.group_id,
      image: ''
    }
    if (e.files) {
      setLoading(true)
      const fileUpload = await uploadNoPreview(e.files[0])
      body.image = fileUpload.url
      changeImage.mutate(body, {
        onSuccess: () => {
          refetchMsgInfi()
          refetchMsg()
          refetchConver()
          setLoading(false)
        },
        onError: () => {
          setLoading(false)
        }
      })
    }
  }

  const handChageGroupName = async () => {
    const dataGroup = {
      group_id,
      group_name: groupName
    }
    changeGroupNameMutation.mutate(dataGroup, {
      onSuccess: () => {
        refetchConver()
        refetchMsgInfi()
        refetchMsg()
        setIsOpen(false)
      },
      onError: () => {
        toast.error('Tên nhóm quá dài!')
      }
    })
  }

  const handleEmojiSelect = (emoji: EmojiType) => {
    setEmoji(emoji.native)
  }

  const handleFeatureNotAllow = () => {
    setShowDiaLogFeatureNotAllow(true)
  }

  const handleClickOption = (label: string) => {
    switch (label) {
      case 'Add-user':
        setOpenModalAddMember(true)
        break
      case 'Profile':
        navigate(`/profile/${group_id}`)
        break
      case 'Unmute':
        handleFeatureNotAllow()
        break
      default:
        break
    }
  }

  const handleDeleteOrLeaveMember = async () => {
    deleteOrLeaveMember.mutate(dataDelete, {
      onSuccess: () => {
        setShowDiaLogDeleteOrLeaveMember(false)
        if (dataConver?.data.data.data) setSelectedConversation(dataConver?.data.data.data[0])
        refetchMembers()
        refetchConversation()
        refetchStatusMessage()
        refetchMessage()
      },
      onError: () => {
        toast.error('Có lỗi rồi. liên hệ admin')
      }
    })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className='rightt absolute right-0 top-0 z-40 hidden h-full w-full transition-transform'>
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
            <button
              type='button'
              className='m-2 rounded-full bg-secondery p-2'
              uk-toggle='target: .rightt ; cls: hidden'
            >
              <IonIcon icon='close' className='flex text-2xl' />
            </button>
          </div>
          {/* content */}
          {showBox ? (
            <ProfileRightOption
              title={titleBox}
              listImage={renderMessageList(2)}
              listVideo={renderMessageList(4)}
              listFile={renderMessageList(3)}
              membersList={members}
              typeConversation={selectedConversation.type}
            />
          ) : (
            <>
              <div className='mx-3 border-b-[1px] py-10 pt-2 text-center text-sm'>
                <img src={avatar} className='mx-auto mb-3 h-14 w-14 rounded-full object-cover' />
                <div className='mt-3'>
                  {isOpen ? (
                    <div className='flex items-center justify-center gap-4'>
                      <input
                        type='text'
                        className='w-[50%]'
                        defaultValue={group_name}
                        onChange={_.debounce((e) => setGroupName(e.target.value), 500)}
                      />

                      <div className='flex items-center gap-1'>
                        <div
                          onClick={handChageGroupName}
                          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary'
                        >
                          <IonIcon className='text-white' icon='checkmark-outline' />
                        </div>
                        <div
                          onClick={() => setIsOpen(false)}
                          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-500'
                        >
                          <IonIcon className='text-white' icon='close' />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='text-base font-medium text-black md:text-xl dark:text-white'>
                      {group_name || 'group_name'}
                    </div>
                  )}
                </div>
                <div className='mt-3'>
                  <div className='flex items-center justify-center gap-4'>
                    {IconOptionList.map((option, index) => (
                      <div
                        key={index}
                        className={`flex cursor-pointer items-center justify-center rounded-full bg-primary p-2 text-white hover:bg-primary-soft hover:text-slate-800 ${selectedConversation.type === 2 ? option.label === 'Profile' && 'hidden' : ''}
                      
                        ${selectedConversation.type === 1 ? option.label === 'Add-user' && 'hidden' : ''}
                        `}
                        onClick={() => handleClickOption(option.label)}
                      >
                        <IonIcon icon={option.icon} className='text-[20px] ' />
                      </div>
                    ))}
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
                    <div className='grid grid-cols-3 grid-rows-1 gap-2'>
                      {renderMessageList(2)?.map(({ sub_body }: { sub_body: string }) => (
                        <img src={sub_body} key={sub_body} className='h-[90px] w-fit rounded-md object-cover' />
                      ))}
                      {renderMessageList(4)?.map(({ sub_body }: { sub_body: string }) => (
                        <video src={sub_body} key={sub_body} className='h-[90px] w-fit rounded-md object-cover' />
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
                      {renderMessageList(3)
                        ?.slice(0, 2)
                        .map(({ body }: { body: string }) => (
                          <div key={body} className='flex cursor-pointer gap-3 p-2 shadow-sm'>
                            <div className='flex  items-center rounded-[10px] bg-secondery p-2 '>
                              {body && renderTypeFile(body)}
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
                        {members?.map((member) => {
                          const userLogin = member.user_id === user_id
                          return (
                            <div key={member.user_id}>
                              <div className='flex cursor-pointer items-center justify-start gap-2 rounded-[10px] p-1 hover:bg-slate-100'>
                                <div className='flex items-center justify-center rounded-full bg-slate-300 hover:bg-primary-soft'>
                                  <img src={member.avatar} className='h-8 w-8 rounded-full' />
                                </div>
                                <div className='flex w-full flex-1 flex-col items-start justify-around truncate text-ellipsis'>
                                  <p
                                    className={`text-sm ${user_id === member.user_id ? 'text-primary' : 'text-slate-800'}`}
                                  >
                                    {member.fullname}
                                  </p>
                                  {member.role && <p className='text-[10px] font-semibold'>Nhóm trưởng</p>}
                                </div>
                                <div className='uk-inline'>
                                  <button
                                    className='uk-button uk-button-default flex h-6 w-6 items-center justify-center rounded-full shadow-sm hover:bg-slate-100'
                                    type='button'
                                  >
                                    <IonIcon icon='ellipsis-horizontal' className='font-semibold' />
                                  </button>
                                  <div uk-dropdown='mode: click' className='w-[200px]'>
                                    <Link
                                      to={`/profile/${member.user_id}`}
                                      className='flex items-center justify-start gap-2 rounded-[4px] p-2 hover:bg-slate-100'
                                    >
                                      <IonIcon icon='person-circle-outline' className='text-[20px]' />
                                      <p className='text-[14px] font-semibold'>Xem trang cá nhân</p>
                                    </Link>
                                    {!userLogin && (
                                      <div
                                        onClick={() => handleSelect(member)}
                                        className='flex items-center justify-start gap-2 rounded-[4px] p-2 hover:bg-slate-100'
                                      >
                                        <IonIcon icon='chatbubble-ellipses-outline' className='text-[20px]' />
                                        <p className='text-[14px] font-semibold'>Gửi tin nhắn</p>
                                      </div>
                                    )}

                                    {userLogin && (
                                      <div
                                        onClick={() => {
                                          admin ? setShowModalChangeRole(true) : setShowDiaLogDeleteOrLeaveMember(true)
                                          setDataDelete({ user_id: member.user_id, group_id: group_id })
                                        }}
                                        className='flex items-center justify-start gap-2 rounded-[4px] p-2 text-red-500  hover:bg-slate-100'
                                      >
                                        <IonIcon icon='log-out-outline' className='text-[20px]' />

                                        <p className='text-[14px] font-semibold'>Rời khỏi nhóm</p>
                                      </div>
                                    )}

                                    {admin && !userLogin && (
                                      <div
                                        onClick={() => {
                                          setShowDiaLogDeleteOrLeaveMember(true)
                                          setDataDelete({ user_id: member.user_id, group_id: group_id })
                                        }}
                                        className='flex items-center justify-start gap-2 rounded-[4px] p-2 text-red-500  hover:bg-slate-100'
                                      >
                                        <IonIcon icon='log-out-outline' className='text-[20px]' />
                                        <p className='text-[14px] font-semibold'>Xóa thành viên</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
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
                {selectedConversation.type === 2 && (
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
                        <div
                          onClick={() => setIsOpen(true)}
                          className='flex cursor-pointer items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'
                        >
                          <IonIcon icon='pencil-outline' className='text-[22px]' />
                          <p className='text-[14px] font-semibold'>Đổi tên đoạn chat</p>
                        </div>
                        <label className='flex cursor-pointer items-center justify-start gap-2 rounded-[10px] p-2 hover:bg-slate-100'>
                          <input type='file' accept='image/*' hidden onChange={(e) => handleChangeImage(e.target)} />
                          <IonIcon icon='image' className='text-[22px]' />
                          <p className='text-[14px] font-semibold'>Thay đổi ảnh</p>
                        </label>
                      </div>
                    </div>
                  </li>
                )}

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
                      {selectedConversation.type === 1 && (
                        <li>
                          <button
                            onClick={() => setShowDialogBlock(true)}
                            type='button'
                            className='flex w-full items-center gap-5 rounded-md p-3 hover:bg-secondery'
                          >
                            <IonIcon icon='stop-circle-outline' className='text-2xl' />
                            {isBlock ? 'Bỏ chặn người dùng' : 'Chặn người dùng'}
                          </button>
                        </li>
                      )}
                      {selectedConversation.type === 2 && (
                        <li>
                          <button
                            onClick={() => {
                              admin ? setShowModalChangeRole(true) : setShowDiaLogDeleteOrLeaveMember(true)
                              setDataDelete({ user_id: user_id, group_id: group_id })
                            }}
                            type='button'
                            className='flex w-full items-center gap-5 rounded-md p-3 text-red-500 hover:bg-secondery'
                          >
                            <IonIcon icon='stop-circle-outline' className='text-2xl' />
                            Rời khỏi nhóm
                          </button>
                        </li>
                      )}
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
      <>
        {/* modal add member */}
        <ModalAddMember isOpen={openModalAddMember} onClose={() => setOpenModalAddMember(false)} />
        {/* modal change role */}
        <ModalChageRole isOpen={showModalChangeRole} onClose={() => setShowModalChangeRole(false)} />
        {/* Dialog */}
        <Dialog
          isVisible={showDiaLogDeleteOrLeaveMember}
          onClose={() => setShowDiaLogDeleteOrLeaveMember(false)}
          type='warning'
          title='Xác nhận'
          description={
            dataDelete.user_id === user_id
              ? 'Bạn sẽ không thể xem lại tin nhắn sau khi rời nhóm!'
              : 'Thành viên bị xóa không thể xem lại tin nhắn!'
          }
          textBtn={dataDelete.user_id === user_id ? 'Rời nhóm' : 'Xóa'}
          callback={() => handleDeleteOrLeaveMember()}
        />
        <FeatureNotAllow
          setShowDiaLogFeatureNotAllow={setShowDiaLogFeatureNotAllow}
          showDiaLogFeatureNotAllow={showDiaLogFeatureNotAllow}
        />
        <BlockOrUnBlockUserInMsg
          type={isBlock ? 'unBlock' : 'block'}
          show={showDialogBlock}
          setShow={setShowDialogBlock}
          user_id={selectedConversation.id}
        />
      </>
    </>
  )
}

export default ProfileRight
