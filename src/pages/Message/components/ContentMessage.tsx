import { IonIcon } from '@ionic/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import useConversationStore from '~/store/conversation.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import { calculateHoureAgo, formatTimeDuration } from '~/utils/helpers'
import useMutationSendReactMessage from '../hooks/useMutaion/useMutationSendReactMessage'
import { useQueryInfinifyMessage } from '../hooks/useQuery/useQueryInfinifyMessage'
import { useQueryMessage } from '../hooks/useQuery/useQueryMessage'
import { downloadFileFormLink } from '../utils/downloadFileFormLink'
import { handleToOldMessage } from '../utils/handleToOldMessage'
import ModalUnSendOption from './ModalUnSendOption'
import useFileUploadStore from '~/store/fileUpload.store'
import LazyLoad from 'react-lazy-load'
import { useWavesurfer } from '@wavesurfer/react'
import WaveSurfer from 'wavesurfer.js'
import ModalMemberReact from './ModalMemberReact'
import { renderTypeFile } from '../utils/renderTypeFile'
import { MessageFix } from '~/store/messageFix.store'
import { useQueryClient } from '@tanstack/react-query'
import ModalReportMessage from './ModalReportMessage'
import ReportMessage from '~/components/ReportMessage'
interface props {
  recall: boolean
  me: boolean
  item: TypeMessage | any
  type?: string
}
const ListEmoji = ['👍', '😀', '😍', '😆', '😱', '🫣']
const ContentMessage = (params: props) => {
  const { refetch, data } = useQueryMessage(1, 1)
  const queryClient = useQueryClient()
  const infoMessage = data?.data?.data.info
  const groupId = infoMessage?.group_id
  const widthRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef(null)
  const [openEmoji, setOpenEmoji] = useState(false)
  const [openOption, setOpenOption] = useState(false)
  const [timeWaveSurfer, setTimeWaveSurfer] = useState<string>()
  const [isOpenModalOption, setIsOpenModalOption] = useState(false)
  const [isOpenModalReport, setIsOpenModalReport] = useState(false)
  const [isOpenModalReactMsg, setIsOpenModalReactMsg] = useState(false)
  const sendReactMessageMutaion = useMutationSendReactMessage()
  const { setToggleBoxReply, setPinMessage, selectedConversation } = useConversationStore()
  const { fetchNextPage } = useQueryInfinifyMessage()

  const { user_id } = getProfileFromLocalStorage()
  const houreSend = calculateHoureAgo(params.item.createdAt)
  const emojiUserSelected = params.item.reactions?.filter((reaction: any) => reaction.createdBy === user_id)
  const isBlockedOrBlocking =
    infoMessage?.list_block_user?.includes(infoMessage.group_id) ||
    infoMessage?.list_blocked_user?.includes(infoMessage.group_id)

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
      case 'report':
        setIsOpenModalReport(true)
        break
      default:
        break
    }
  }

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 40,
    width: '100%',
    waveColor: params.me ? '#ffffff' : '#0084ff',
    progressColor: params.me ? '#b1d7ea' : '#ffffff',
    barHeight: 10,
    barWidth: 2,
    cursorColor: 'none',
    url: params.item.sub_body
  })

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  useEffect(() => {
    let duration = 0
    const handleDecode = (timeWaveSurfer: number) => {
      duration = timeWaveSurfer
      setTimeWaveSurfer(formatTimeDuration(duration))
    }
    const handleTimeUpdate = (currentTime: number) => {
      setTimeWaveSurfer(formatTimeDuration(duration - currentTime))
    }
    wavesurfer?.on('decode', handleDecode)
    wavesurfer?.on('timeupdate', handleTimeUpdate)

    return () => {
      wavesurfer?.on('decode', handleDecode)
      wavesurfer?.on('timeupdate', handleTimeUpdate)
    }
  }, [wavesurfer])

  const renderContent = () => {
    const isUnsent = params.item.status === false
    const isReply = params.type === 'reply'
    const linkRegex = /(https?:\/\/[^\s]+)/g
    if (Object.keys(params.item).length == 0 && params.type == 'reply') {
      return <p className={`-mt-[10px]  truncate break-words text-[15px] text-gray-400`}>Bạn đã xóa tin nhắn này</p>
    }
    switch (params.item.type) {
      case 1:
        return params.item.body.match(linkRegex) ? (
          <a
            href={params.item.body}
            target='_blank'
            rel='noopener noreferrer'
            className={`${isReply ? '-mt-[10px] truncate text-gray-400' : ''} text-[15px] underline`}
          >
            {isUnsent ? 'Tin nhắn đã thu hồi' : params.item.body}
          </a>
        ) : (
          <p className={`${isReply ? '-mt-[10px]  truncate text-gray-400' : ''} break-words text-[15px]`}>
            {isUnsent ? 'Tin nhắn đã thu hồi' : params.item.body}
          </p>
        )
      case 2:
        return !isReply ? (
          <div uk-lightbox='animation: fade'>
            <div className='group relative'>
              <a className='uk-button uk-button-default' href={params.item.sub_body}>
                <img
                  alt={params.item.body}
                  src={params.item.sub_body}
                  className={`${!isReply ? 'h-full w-full rounded-se-[14px] rounded-ss-[14px]' : 'h-40 w-40 '} max-w-full object-contain`}
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
        ) : isUnsent ? (
          'Tin nhắn đã thu hồi'
        ) : (
          <img
            alt={params.item?.body}
            src={params.item?.sub_body}
            className={`${params.type != 'reply' ? 'aspect-square h-full w-full rounded-se-[14px] rounded-ss-[14px]' : 'h-20 w-20 rounded-[8px]'}
              max-w-full object-cover 
              opacity-90 contrast-50`}
          />
        )
      case 3:
        return (
          <div className={` flex items-center gap-2 ${params.me ? 'flex-row' : 'flex-row-reverse'} `}>
            {params.item.body && renderTypeFile(params.item.body)}
            {isReply ? (
              <p className='truncate'>{isUnsent ? 'Tin nhắn đã thu hồi' : params.item.body}</p>
            ) : (
              <a
                className='underline'
                target='_blank'
                href={`https://docs.google.com/gview?url=${params.item.sub_body}&embedded=true`}
              >
                {isUnsent ? 'Tin nhắn đã thu hồi' : params.item.body}
              </a>
            )}
          </div>
        )
      case 4:
        return params.type != 'reply' ? (
          <video width={300} controls className='aspect-video rounded-[16px] p-2'>
            <source src={params.item.sub_body} type='video/mp4' />
          </video>
        ) : isUnsent ? (
          'Tin nhắn đã thu hồi'
        ) : (
          <video width={100} className='rounded-[8px]'>
            <source src={params.item.sub_body} type='video/mp4' />
          </video>
        )
      case 5:
        return params.type != 'reply' ? (
          <div className='h-[40px] w-[200px]'>
            <div className='flex flex-row items-center justify-start gap-1'>
              <div className='z-10 flex h-full w-10 items-center justify-center'>
                <div
                  onClick={onPlayPause}
                  className='flex h-full w-full flex-1 items-center justify-evenly bg-transparent'
                >
                  <IonIcon
                    name={isPlaying ? 'pause-circle' : 'play-circle'}
                    className={`text-[30px] ${params.me ? 'text-white' : 'text-[#0084ff]'}`}
                  />
                </div>
              </div>
              <div ref={containerRef} className='w-[100%]' />
              <p className='text-[12px]'>{timeWaveSurfer}</p>
            </div>
          </div>
        ) : // <p>tin nhắn thoại</p>
        isUnsent ? (
          'Tin nhắn đã thu hồi'
        ) : (
          <p>Tin nhắn thoại</p>
        )
      case 6:
        return !isUnsent ? (
          params.item.sub_body ? (
            <div className='flex items-start justify-start gap-4 p-1'>
              <IonIcon icon='videocam' className='text-[26px]' />
              <div className='flex flex-col items-start justify-start gap-2'>
                <p className={`${isReply ? '-mt-[10px] truncate text-gray-400' : ''} text-[14px]`}>
                  {params.item.body}
                </p>
                <p className={`${isReply ? '-mt-[10px] truncate text-gray-400' : ''} text-[11px] font-extralight`}>
                  {params.item.sub_body}
                </p>
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-start gap-4'>
              <IonIcon icon='videocam-off' className='text-[26px]' />
              <div className='flex flex-col justify-evenly gap-2'>
                <p className={`${isReply ? '-mt-[10px] truncate text-gray-400' : ''} text-[14px]`}>
                  {params.item.body}
                </p>
              </div>
            </div>
          )
        ) : (
          <p className={`${isReply ? '-mt-[10px] truncate text-gray-400' : ''} text-[15px]`}>Tin nhắn đã thu hồi</p>
        )

      default:
        break
    }
  }

  const renderEmoji = () => {
    return (
      params.item.reactions?.length > 0 && (
        <>
          <div
            onClick={() => selectedConversation.type === 2 && setIsOpenModalReactMsg(true)}
            className={`
            ${params.me ? 'left-0' : 'right-0'}
            absolute -bottom-[10px] flex items-center justify-center rounded-full bg-primary-soft  px-[5px]`}
          >
            {selectedConversation.type === 2
              ? params.item.reactions?.length > 2
                ? params.item.reactions?.slice(0, 2).map((item: any, index: number) => (
                    <>
                      <p key={index} className='text-[12px]'>
                        {item.emoji ?? ''}
                      </p>
                    </>
                  ))
                : params.item.reactions.map((item: any, index: number) => (
                    <p key={index} className='text-[12px]'>
                      {item.emoji}
                    </p>
                  ))
              : selectedConversation.type === 1 && params.item.reactions?.length > 0
                ? params.item.reactions.map((item: any, index: number) => (
                    <p key={index} className='text-[12px]'>
                      {item.emoji}
                    </p>
                  ))
                : null}
            {selectedConversation.type === 2 && params.item.reactions?.length > 2 && (
              <p className='text-[12px]'>+{(params.item.reactions?.length ?? 0) - 2}</p>
            )}
          </div>
          {selectedConversation.type === 2 && (
            <ModalMemberReact
              reactArr={params.item.reactions}
              group_id={params.item.group_message_id}
              isOpen={isOpenModalReactMsg}
              onClose={() => setIsOpenModalReactMsg(false)}
            />
          )}
        </>
      )
    )
  }

  const handleGoToOldMessage = async () => {
    let checkEl = document.getElementById(params.item.message_id)

    while (!checkEl) {
      // Gọi hàm loadMoreMessages để tải thêm dữ liệu
      const fetch = await fetchNextPage()

      setTimeout(() => {
        const element = document.getElementById(params.item.message_id)
        if (element) {
          handleToOldMessage(params.item.message_id)
        } else {
          console.log(' không tìm thấy tin nhắn cần tìm trong setTimeout')
          return
        }
      }, 300)

      if (!fetch.hasNextPage) {
        console.log('Đã tải hết tin nhắn, không tìm thấy tin nhắn cần tìm.')
        return
      }
    }
    if (checkEl) {
      setTimeout(() => {
        const element = document.getElementById(params.item.message_id)
        if (element) {
          handleToOldMessage(params.item.message_id)
        }
      }, 300)
      console.log('Đã di chuyển tới tin nhắn.')
    } else {
      console.log('Không tìm thấy tin nhắn.')
    }
  }

  function handleMouseLeave() {
    if (!isBlockedOrBlocking) {
      setOpenEmoji(false)
      setOpenOption(false)
    }
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

  if (params.item.is_report) {
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
          Tin nhắn vi phạm chính sách
        </div>
      </div>
    )
  }

  return (
    <div
      ref={widthRef}
      id={params.type === 'reply' ? '' : params.item.message_id}
      onClick={() => (params.type === 'reply' && params.item.status === true ? handleGoToOldMessage() : '')}
      onMouseLeave={handleMouseLeave}
      className={` relative mt-1 cursor-pointer border-[2px] border-transparent
      ${params.item.type === 4 ? 'h-[100%]' : ''}
      ${params.me ? 'text-left' : 'text-left'}
      ${params.item.reactions?.length > 0 ? 'mb-3' : ''}
      ${params.me ? (params.item.type === 2 || params.item.type === 4 ? 'bg-transparent ' : ' bg-[#0084ff]') : 'bg-secondery !text-gray-700'}
      ${
        params.type != 'reply'
          ? `${params.item.type === 2 || params.item.type === 4 ? '' : 'px-4 py-2'} group  rounded-[14px] text-white shadow`
          : `-mb-4  !bg-secondery ${params.item.type === 2 || params.item.type === 4 ? 'p-0 opacity-30' : 'px-4 py-5'}  text-gray-700 ${params.me ? 'rounded-s-[14px] rounded-t-[14px]' : 'rounded-e-[14px] rounded-ss-[14px]'}`
      }
      ${params.type === 'reply' ? (params.item.type == 1 || params.item.type == 3 ? 'max-w-[200px]' : '') : ''}
      `}
    >
      <div
        className={`before:content-[' '] before:absolute ${params.me ? 'before:right-full' : 'before:left-full'} before:top-0 before:block before:h-[100%] before:w-[100px] before:bg-transparent`}
      >
        {renderEmoji()}
        {/* content */}
        {renderContent()}
        <div
          className={`absolute ${params.me ? 'right-full mr-2' : 'left-full ml-2'} bottom-0 hidden h-[30px] w-[100px] items-center justify-around rounded-[8px] bg-secondery shadow-inner ${!isBlockedOrBlocking && 'group-hover:flex'}`}
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
                <p
                  onClick={() => handleClickOption('report')}
                  className='cursor-pointer rounded-[8px] px-2 py-1 text-[12px] text-black hover:bg-secondery'
                >
                  Báo cáo
                </p>
              </div>
              <ModalUnSendOption
                message={params.item}
                isOpen={isOpenModalOption}
                onClose={() => setIsOpenModalOption(false)}
              />
              <ReportMessage
                showDiaLogReportMessage={isOpenModalReport}
                setShowDiaLogReportMessage={setIsOpenModalReport}
                message_id={params.item.message_id}
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
        <div className={`mt-2 flex items-center text-[11px] ${params.item.type === 3 ? 'justify-between' : ''}`}>
          <p
            className={`${params.me ? `${params.item.type === 2 || params.item.type === 4 ? 'px-2 py-2 text-gray-700' : ' text-white'}` : ` text-gray-700 ${params.item.type === 2 ? 'px-2 py-1' : ''}`} `}
          >
            {houreSend}
          </p>
          {params.item.type === 3 && (
            <div className='flex items-center gap-2'>
              <div
                onClick={() =>
                  params.type == 'reply'
                    ? ''
                    : downloadFileFormLink({ pdfUrl: params.item.sub_body, fileName: params.item.body })
                }
                className='flex items-center justify-center rounded-xl p-2'
              >
                <IonIcon
                  className={`text-[12px] font-bold ${params.me ? 'text-white' : 'text-primary'}  `}
                  icon='cloud-download-outline'
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ContentMessage
