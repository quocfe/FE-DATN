import { useRef, useState } from 'react'
import { useContainerDimensions } from '../hooks/useContainerDimensions'
import useMutationSendReactMessage from '../hooks/useMutationSendReactMessage'
import { IonIcon } from '@ionic/react'
import ModalUnSendOption from './ModalUnSendOption'

const ListEmoji = ['👍', '😀', '😍', '😆', '😱', '🫣']

const ContentMessage = (params: any) => {
  const [openEmoji, setOpenEmoji] = useState(false)
  const [openOption, setOpenOption] = useState(false)
  const [isOpenModalOption, setIsOpenModalOption] = useState(false)
  const [openOptionMessage, setOpenOptionMessage] = useState(false)
  const widthRef = useRef(null)
  const { height, width } = useContainerDimensions(widthRef)
  const sendReactMessageMutaion = useMutationSendReactMessage()

  const handleChoiceReact = (emoji: string) => {
    const data = {
      emoji,
      message_id: params.item.message_id
    }
    sendReactMessageMutaion.mutate(data, {
      onSuccess: () => {
        setOpenOptionMessage(false)
        setOpenEmoji(false)
      },
      onError: () => {
        setOpenOptionMessage(false)
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
        break
      default:
        break
    }
  }
  if (params.recall) {
    return (
      <div
        ref={widthRef}
        className={` relative w-fit
      max-w-sm cursor-pointer rounded-[10px] text-center 
      ${params.me ? 'bg-gradient-to-tr  text-white ' : 'bg-secondery'}
      ${params.type != 'reply' ? 'from-sky-500 to-blue-500 px-4 py-2 shadow' : ' mb-2  px-2 py-1 text-[12px]'}
      `}
      >
        <div
          className={`before:content-[' '] before:absolute ${params.me ? `before:right-full` : `before:left-full`} before:top-0 before:block before:h-[100%] before:w-[100px] before:bg-transparent `}
        >
          Tin nhắn đã được thu hồi
        </div>
      </div>
    )
  }
  return (
    <div
      ref={widthRef}
      onMouseEnter={() => setOpenOptionMessage(true)}
      onMouseLeave={() => {
        setOpenOptionMessage(false)
        setOpenEmoji(false)
        setOpenOption(false)
      }}
      className={` relative w-fit
      max-w-sm cursor-pointer rounded-[10px] text-center 
      ${params.me ? 'bg-gradient-to-tr  text-white ' : 'bg-secondery'}
      ${params.type != 'reply' ? 'from-sky-500 to-blue-500 px-4 py-2 shadow' : ' mb-2  px-2 py-1 text-[12px]'}
      `}
    >
      <div
        className={`before:content-[' '] before:absolute ${params.me ? `before:right-full` : `before:left-full`} before:top-0 before:block before:h-[100%] before:w-[100px] before:bg-transparent `}
      >
        {params.item.reactions.length > 0 && (
          <div
            onMouseEnter={() => setOpenOptionMessage(false)}
            className={`absolute -bottom-4 flex items-center justify-center rounded-full bg-primary-soft px-[5px]`}
          >
            {params.item.reactions?.map((item: any, index: number) => (
              <p key={index} className='text-[12px]'>
                {item.emoji}
              </p>
            ))}
          </div>
        )}
        {params.item.body}
        <div
          className={`absolute ${params.me ? 'right-full mr-2' : 'left-full ml-2'} bottom-0 top-0 rounded-[8px]  bg-secondery ${openOptionMessage ? 'flex' : 'hidden'} w-[100px] items-center justify-around
        `}
        >
          <div className='relative flex items-center rounded-full p-1 shadow-2xl hover:bg-gray-300'>
            <IonIcon className='cursor-pointer text-black ' icon='arrow-undo-outline' />
          </div>
          <div className='relative flex items-center rounded-full p-1 shadow-2xl hover:bg-gray-300'>
            <IonIcon
              onClick={() => setOpenOption(!openOption)}
              className='cursor-pointer text-black '
              icon='ellipsis-horizontal-outline'
            />
            <div className="before:content-[' '] before:absolute before:-top-7 before:right-0 before:block before:h-[100%] before:w-[100px] before:bg-transparent">
              <div
                style={{ bottom: `${height}px` }}
                className={`absolute ${openOption ? '' : 'hidden'}  h-fit w-[140px] rounded-[14px] bg-primary-soft py-3 shadow-2xl ${params.me ? 'right-0' : 'left-0'} flex select-none flex-col gap-3  px-3 text-left `}
              >
                <p
                  onClick={() => handleClickOption('unsend')}
                  className='cursor-pointer rounded-[8px] px-2 py-1 text-[12px] text-black hover:bg-secondery '
                >
                  Gỡ tin nhắn
                </p>
                <p
                  onClick={() => handleClickOption('pin')}
                  className='cursor-pointer rounded-[8px] px-2  py-1 text-[12px] text-black hover:bg-secondery '
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
          <div className='relative flex items-center rounded-full p-1 shadow-2xl hover:bg-gray-300'>
            <IonIcon
              className='cursor-pointer text-black '
              icon='happy-outline'
              onClick={() => setOpenEmoji(!openEmoji)}
            />
            <div className="before:content-[' '] before:absolute before:-top-7 before:right-0 before:block before:h-[100%] before:w-[100px] before:bg-transparent">
              <div
                style={{ bottom: `${height}px` }}
                className={`absolute ${openEmoji ? '' : 'hidden'} right-0 h-[30px] w-fit rounded-xl bg-primary-soft p-2 shadow-2xl`}
              >
                <div className=' flex h-[100%] w-[100%] items-center gap-1 rounded-sm'>
                  {ListEmoji?.map((emoji) => {
                    return (
                      <span
                        key={emoji}
                        className={`cursor-pointer rounded-full p-[2px] hover:bg-secondery`}
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
    </div>
  )
}

export default ContentMessage
