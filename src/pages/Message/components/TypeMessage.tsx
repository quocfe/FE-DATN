import { IonIcon } from '@ionic/react'
import { useRef, useState } from 'react'
import { useContainerDimensions } from '../hooks/useContainerDimensions'
import useMutationSendReactMessage from '../hooks/useMutationSendReactMessage'
import { getProfileFromLocalStorage } from '~/utils/auth'

const ListEmoji = ['👍', '😀', '😍', '😆', '😱', '🫣']

const ContentMessage = (params: any) => {
  const emojiPosition = params.me ? '' : ''
  const [openEmoji, setOpenEmoji] = useState(false)
  const [openOption, setOpenOption] = useState(false)
  const widthRef = useRef(null)
  const { height, width } = useContainerDimensions(widthRef)
  const sendReactMessageMutaion = useMutationSendReactMessage()

  const emojiContainerStyle = {
    right: params.me ? `${width + 10}px` : 'auto',
    left: params.me ? 'auto' : `${width + 10}px`
  }

  const reactMessageStyle = {
    left: params.me ? `${10}px` : 'auto',
    right: params.me ? 'auto' : `${10}px`
  }

  const handleChoiceReact = (emoji: string) => {
    const data = {
      emoji,
      message_id: params.item.message_id
    }
    sendReactMessageMutaion.mutate(data, {
      onSuccess: () => {
        setOpenOption(false)
        setOpenEmoji(false)
      },
      onError: () => {
        setOpenOption(false)
        setOpenEmoji(false)
      }
    })
  }

  return (
    <div
      ref={widthRef}
      onMouseEnter={() => setOpenOption(true)}
      onMouseLeave={() => {
        setOpenOption(false)
        setOpenEmoji(false)
      }}
      className={` relative w-fit
      max-w-sm cursor-pointer rounded-[10px] text-center 
      ${params.me ? 'bg-gradient-to-tr  text-white ' : 'bg-secondery'}
      ${params.type != 'reply' ? 'from-sky-500 to-blue-500 px-4 py-2 shadow' : ' mb-2  px-2 py-1 text-[12px]'}
      `}
    >
      <div className="before:content-[' '] before:absolute before:-left-16 before:top-0 before:block before:h-[100%] before:w-[100px] before:bg-transparent ">
        {params.item.reactions.length > 0 && (
          <div
            style={reactMessageStyle}
            onMouseEnter={() => setOpenOption(false)}
            className='absolute -bottom-4 flex items-center justify-center rounded-full bg-primary-soft px-[5px]'
          >
            {params.item.reactions?.map((item: any, index: number) => (
              <p key={index} className='text-[12px]'>
                {item.emoji}
              </p>
            ))}
          </div>
        )}
        {!params.recall ? params.item.body : 'Tin nhắn đã được thu hồi'}
        <div
          style={emojiContainerStyle}
          className={`absolute bottom-0 top-0 rounded-[8px]  bg-secondery ${openOption ? 'flex' : 'hidden'} w-[100px] items-center justify-around
        `}
        >
          <IonIcon
            className='cursor-pointer rounded-full p-1 text-black shadow-2xl hover:bg-gray-300'
            icon='ellipsis-horizontal-outline'
          />
          <IonIcon
            className='cursor-pointer rounded-full p-1 text-black shadow-2xl hover:bg-gray-300'
            icon='arrow-undo-outline'
          />
          <div className='relative flex items-center rounded-full p-1 shadow-2xl hover:bg-gray-300'>
            <IonIcon
              className='cursor-pointer text-black '
              icon='happy-outline'
              onClick={() => setOpenEmoji(!openEmoji)}
            />
            <div className="before:content-[' '] before:absolute before:-top-7 before:right-0 before:block before:h-[100%] before:w-[100px] before:bg-transparent">
              <div
                style={{ bottom: `${height}px` }}
                className={`absolute ${openEmoji ? '' : 'hidden'} h-[30px] w-fit rounded-xl bg-primary-soft p-2 shadow-2xl ${params.me ? 'right-0' : 'left-0'}`}
              >
                <div className=' flex h-[100%] w-[100%] items-center gap-1 rounded-sm'>
                  {ListEmoji?.map((emoji) => {
                    return (
                      <span
                        key={emoji}
                        className={`cursor-pointer rounded-full p-[2px] hover:bg-yellow-50 ${emojiPosition}`}
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

const Image = ({ item }: any) => {
  return (
    <img
      src={item.thumbnail ? item.thumbnail : 'src/assets/images/avatars/avatar-2.jpg'}
      className='h-9 w-9 rounded-full shadow'
    />
  )
}

export const TextMsg = ({ item, userid }: any) => {
  const me = item.createdBy === userid
  const deleteFromOthers = !me && item.status === false
  const recall = item.status === true
  const haveReplyMessage = item.parent_id

  return (
    !deleteFromOthers && (
      <div className={`flex ${me ? 'flex-row-reverse items-end gap-2' : 'gap-3'} `}>
        <Image item={item} />
        {haveReplyMessage ? (
          <div className={` ${me ? 'ml-auto' : 'mr-auto'} w-fit rounded-[16px] bg-slate-700 p-3`}>
            <ContentMessage me={me} recall={recall} item={item.replyMessage} type='reply' />
            <ContentMessage me={me} recall={recall} item={item} />
          </div>
        ) : (
          <ContentMessage me={me} recall={recall} item={item} />
        )}
      </div>
    )
  )
}

export const ImageMsg = ({ item, userid }: any) => {
  const me = item.createdBy === userid
  const deleteFromOthers = item.detelectedBy === userid && item.status === false
  const recall = item.detelectedBy === userid && item.status === true

  return (
    deleteFromOthers && (
      <div className={`flex ${me ? 'flex-row-reverse items-end gap-2' : 'gap-3'} `}>
        <img src='src/assets/images/avatars/avatar-3.jpg' className='h-4 w-4 rounded-full shadow' />
        <a className='block overflow-hidden rounded-[18px] border' href='#'>
          <div className='max-w-md'>
            <div className='relative w-72 max-w-full'>
              <div className='relative' style={{ paddingBottom: '57.4286%' }}>
                <div className='absolute inset-0 h-full w-full'>
                  {!recall ? (
                    <img
                      src='src/assets/images/product/product-2.jpg'
                      className='block h-full max-h-52 w-full max-w-full object-cover'
                    />
                  ) : (
                    'Tin nhắn đã thu hồi'
                  )}
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    )
  )
}
