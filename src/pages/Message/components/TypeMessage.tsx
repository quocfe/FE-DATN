import { IonIcon } from '@ionic/react'
import { useState } from 'react'

const ListEmoji = ['👍', '😀', '😍', '😆', '😱', '🫣']

const ContentMessage = (params: any) => {
  const positonOption = params.me
    ? '-bottom-4 left-2 bg-secondery text-black'
    : '-bottom-4 right-2 bg-primary text-white'
  const emojiPosition = params.me ? '' : ''
  const [openEmoji, setOpenEmoji] = useState(false)

  const handleSendReactMessage = () => {
    setOpenEmoji(false)
  }

  return (
    <>
      <p
        className={`relative max-w-sm rounded-[10px] text-center  ${params.me ? 'bg-gradient-to-tr  text-white ' : 'bg-secondery'}
      ${params.type != 'reply' ? 'from-sky-500 to-blue-500 px-4 py-2 shadow' : ' mb-2  px-2 py-1 text-[12px]'}
      `}
      >
        {!params.recall ? params.item.body : 'Tin nhắn đã được thu hồi'}
        <IonIcon
          onClick={() => setOpenEmoji(!openEmoji)}
          icon='happy-outline'
          className={`absolute cursor-pointer rounded-full p-1 shadow-2xl ${positonOption}`}
        />
        <div
          className={`absolute ${!openEmoji ? 'hidden' : ''} -top-3 w-fit rounded-sm bg-white p-2 shadow-2xl ${params.me ? 'right-0' : 'left-0'}`}
        >
          <div className=' flex w-[100%] items-center gap-1 rounded-sm '>
            {ListEmoji?.map((emoji) => {
              return (
                <span
                  key={emoji}
                  className={`cursor-pointer rounded-full p-[2px] hover:bg-gray-200 ${emojiPosition}`}
                  onClick={handleSendReactMessage}
                >
                  {emoji}
                </span>
              )
            })}
          </div>
        </div>
      </p>
    </>
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
