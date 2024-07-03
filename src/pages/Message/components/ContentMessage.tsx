import { IonIcon } from '@ionic/react'
import { useEffect, useRef, useState } from 'react'
import useConversationStore from '~/store/conversation.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import { calculateHoureAgo } from '~/utils/helpers'
import useMutationSendReactMessage from '../hooks/useMutationSendReactMessage'
import { useQueryMessage } from '../hooks/useQueryMessage'
import { downloadFileFormLink } from '../utils/downloadFileFormLink'
import ModalUnSendOption from './ModalUnSendOption'
import useMessageStore from '~/store/message.store'
import { useQueryInfinifyMessage } from '../hooks/useQueryInfinifyMessage'
import { handleToOldMessage } from '../utils/handleToOldMessage'

const ListEmoji = ['👍', '😀', '😍', '😆', '😱', '🫣']
const ContentMessage = (params: any) => {
  const { refetch, data } = useQueryMessage()
  const groupId = data?.data?.data.info.group_id
  const widthRef = useRef<HTMLDivElement>(null)
  const [openEmoji, setOpenEmoji] = useState(false)
  const [openOption, setOpenOption] = useState(false)
  const [startLoad, setStartLoad] = useState(false)
  const [isOpenModalOption, setIsOpenModalOption] = useState(false)
  const sendReactMessageMutaion = useMutationSendReactMessage()
  const { setToggleBoxReply, setPinMessage } = useConversationStore()
  const { setGoToOldMessage } = useMessageStore()
  const { data: dataMsg, isFetchingNextPage, hasNextPage, fetchNextPage } = useQueryInfinifyMessage()
  const { user_id } = getProfileFromLocalStorage()
  const houreSend = calculateHoureAgo(params.item.createdAt)
  const emojiUserSelected = params.item.reactions?.filter((reaction: any) => reaction.createdBy === user_id)

  const handleChoiceReact = (emoji: string) => {
    const data = {
      emoji,
      message_id: params.item.message_id,
      receiver: groupId
    }
    sendReactMessageMutaion.mutate(data, {
      onSuccess: () => {
        setOpenEmoji(false)
        refetch()
      },
      onError: () => {
        setOpenEmoji(false)
      }
    })
  }

  const handleClickOption = (option: string) => {
    switch (option) {
      case 'unsend':
        setIsOpenModalOption(true)
        break
      case 'pin':
        setPinMessage(params.item)
        break
      default:
        break
    }
  }

  const renderContent = (params: any) => {
    switch (params.item.type) {
      case 1:
        return params.item.body.includes('youtube') ? (
          <a
            href={params.item.body}
            target='_blank'
            rel='noopener noreferrer'
            className={`${params.type === 'reply' ? '-mt-[10px] truncate text-gray-400' : ''} text-[15px]`}
          >
            {params.item.status === false ? 'Tin nhắn đã thu hồi' : params.item.body}
          </a>
        ) : (
          <p className={`${params.type === 'reply' ? '-mt-[10px] truncate text-gray-400' : ''} text-[15px]`}>
            {params.item.status === false ? 'Tin nhắn đã thu hồi' : params.item.body}
          </p>
        )
      case 2:
        return params.type != 'reply' ? (
          <div uk-lightbox='animation: fade'>
            <div className='group relative'>
              <a className='uk-button uk-button-default' href={params.item.sub_body}>
                <img
                  alt={params.item.body}
                  src={params.item.sub_body}
                  className={`${params.type != 'reply' ? 'h-full w-full rounded-se-[14px] rounded-ss-[14px]' : 'h-40 w-40 '} max-w-full object-contain`}
                />
              </a>
              <div
                onClick={() =>
                  downloadFileFormLink({
                    pdfUrl: params.item.sub_body,
                    fileName: params.item.body
                  })
                }
                className={`absolute ${params.me ? 'left-[8px]' : 'right-[8px]'} top-4 hidden items-center rounded-sm bg-secondery p-[4px] group-hover:flex`}
              >
                <IonIcon icon='download-outline' className='text-[16px]' />
              </div>
            </div>
          </div>
        ) : params.item.status === false ? (
          'Tin nhắn đã thu hồi'
        ) : (
          <img
            alt={params.item?.body}
            src={params.item?.sub_body}
            className={`${params.type != 'reply' ? ' h-full w-full rounded-se-[14px] rounded-ss-[14px]' : 'h-40 w-40 rounded-[8px]'}
            max-w-full object-cover 
            opacity-90 contrast-50`}
          />
        )
      case 3:
        return (
          <div
            onClick={() =>
              params.type == 'reply'
                ? ''
                : downloadFileFormLink({ pdfUrl: params.item.sub_body, fileName: params.item.body })
            }
            className={`flex items-center gap-2 `}
          >
            <IonIcon icon='document' className='h-5 w-5 flex-shrink-0' />
            <p> {params.item.status === false ? 'Tin nhắn đã thu hồi' : params.item.body}</p>
          </div>
        )
      case 4:
        return params.type != 'reply' ? (
          <video width={300} controls className='rounded-[16px] p-2'>
            <source src={params.item.sub_body} type='video/mp4' />
          </video>
        ) : params.item.status === false ? (
          'Tin nhắn đã thu hồi'
        ) : (
          <video width={100} className='rounded-[8px]'>
            <source src={params.item.sub_body} type='video/mp4' />
          </video>
        )
      default:
        break
    }
  }

  const handleGoToOld = () => {
    console.log('start')
    //  const element = document.getElementById(IdMsg)
    // fetchNextPage()

    console.log('end')
  }

  if (params.recall) {
    return (
      <div
        ref={widthRef}
        className={`relative w-fit max-w-sm cursor-pointer rounded-[10px] 
        ${params.me ? 'bg-gradient-to-tr text-right text-white ' : 'bg-secondery text-left'}
        ${params.type != 'reply' ? 'from-sky-500 to-blue-500 px-4 py-2 shadow' : 'mb-2 w-full px-2 py-1 text-end text-[10px]'}
        `}
      >
        <div
          className={`before:content-[' '] before:absolute ${params.me ? 'before:right-full' : 'before:left-full'} before:top-0 before:block before:h-[100%] before:w-[100px] before:bg-transparent`}
        >
          Tin nhắn đã được thu hồi
        </div>
      </div>
    )
  }

  return (
    <div
      ref={widthRef}
      id={params.type === 'reply' ? '' : params.item.message_id}
      onClick={() => (params.type === 'reply' && params.item.status === true ? handleGoToOld() : '')}
      onMouseLeave={() => {
        setOpenEmoji(false)
        setOpenOption(false)
      }}
      className={` relative min-w-[80px]  cursor-pointer border-[2px] border-transparent
      ${params.item.type === 4 ? 'h-[100%]' : ''}
      ${params.me ? 'text-left' : 'text-right'}
      ${params.item.reactions?.length > 0 ? 'mb-3' : ''}
      ${params.me ? (params.item.type === 2 || params.item.type === 4 ? 'bg-transparent ' : ' bg-[#0084ff]') : 'bg-secondery !text-gray-700'}
      ${
        params.type != 'reply'
          ? `${params.item.type === 2 || params.item.type === 4 ? '' : 'max-w-[60%] px-4 py-2'} group  rounded-[14px] text-white shadow`
          : `-mb-4 !bg-secondery px-4 py-5 text-gray-700 ${params.me ? 'rounded-s-[14px] rounded-t-[14px]' : 'rounded-e-[14px] rounded-ss-[14px]'}`
      }`}
    >
      <div
        className={`before:content-[' '] before:absolute ${params.me ? 'before:right-full' : 'before:left-full'} before:top-0 before:block before:h-[100%] before:w-[100px] before:bg-transparent`}
      >
        {params.item.reactions?.length > 0 && (
          <div
            className={`
            ${params.me ? 'left-0' : 'right-0'}
            absolute -bottom-[10px] flex items-center justify-center rounded-full bg-primary-soft px-[5px]`}
          >
            {params.item.reactions?.map((item: any, index: number) => (
              <p key={index} className='text-[12px]'>
                {item.emoji}
              </p>
            ))}
          </div>
        )}
        {/* content */}
        {renderContent(params)}
        <div
          className={`absolute ${params.me ? 'right-full mr-2' : 'left-full ml-2'} bottom-0 hidden h-[30px] w-[100px] items-center justify-around rounded-[8px] bg-secondery shadow-inner group-hover:flex`}
        >
          <div
            onClick={(e) => {
              e.stopPropagation()
              setToggleBoxReply(params.item)
            }}
            className='relative flex items-center rounded-full p-1 shadow-2xl hover:bg-gray-300'
          >
            <IonIcon className='cursor-pointer text-black ' icon='arrow-undo-outline' />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation()
              setOpenOption(!openOption)
              setOpenEmoji(false)
            }}
            className='relative flex items-center rounded-full p-1 shadow-2xl hover:bg-gray-300'
          >
            <IonIcon className='cursor-pointer text-black ' icon='ellipsis-horizontal-outline' />
            <div className="before:content-[' '] before:absolute before:-top-7 before:right-0 before:block before:h-[100%] before:w-[100px] before:bg-transparent">
              <div
                style={{ bottom: `40px` }}
                className={`absolute ${openOption ? '' : 'hidden'} h-fit w-[140px] rounded-[14px] bg-primary-soft py-3 shadow-2xl ${params.me ? 'right-0' : 'left-0'} flex select-none flex-col gap-3 px-3 text-left`}
              >
                <p
                  onClick={() => handleClickOption('unsend')}
                  className='cursor-pointer rounded-[8px] px-2 py-1 text-[12px] text-black hover:bg-secondery'
                >
                  Gỡ tin nhắn
                </p>
                <p
                  onClick={() => handleClickOption('pin')}
                  className='cursor-pointer rounded-[8px] px-2 py-1 text-[12px] text-black hover:bg-secondery'
                >
                  Ghim tin nhắn
                </p>
              </div>
              <ModalUnSendOption
                message={params.item}
                isOpen={isOpenModalOption}
                onClose={() => setIsOpenModalOption(false)}
              />
            </div>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation()
              setOpenEmoji(!openEmoji)
              setOpenOption(false)
            }}
            className='relative flex items-center rounded-full p-1 shadow-2xl hover:bg-gray-300'
          >
            <IonIcon className='cursor-pointer text-black ' icon='happy-outline' />
            <div className="before:content-[' '] before:absolute before:-top-7 before:right-0 before:block before:h-[100%] before:w-[100px] before:bg-transparent">
              <div
                style={{ bottom: '40px' }}
                className={`absolute ${openEmoji ? '' : 'hidden'} right-0 h-[30px] w-fit rounded-xl bg-primary-soft p-2 shadow-inner`}
              >
                <div className='flex h-[100%] w-[100%] items-center gap-1 rounded-sm'>
                  {ListEmoji?.map((emoji) => {
                    return (
                      <span
                        key={emoji}
                        className={`cursor-pointer rounded-full p-[2px] hover:bg-secondery
                          ${emojiUserSelected ? (emojiUserSelected[0]?.emoji === emoji ? 'bg-bgbody shadow-sm' : '') : ''}
                        `}
                        onClick={() => handleChoiceReact(emoji)}
                      >
                        {emoji}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {params?.type != 'reply' && (
        <p
          className={`${params.me ? `${params.item.type === 2 || params.item.type === 4 ? 'px-2 py-2 text-gray-700' : ' text-white'}` : ` text-gray-700 ${params.item.type === 2 ? 'px-2 py-1' : ''}`} mt-2 text-[11px]`}
        >
          {houreSend}
        </p>
      )}
    </div>
  )
}

export default ContentMessage
