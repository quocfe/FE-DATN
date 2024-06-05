import { IonIcon } from '@ionic/react'
import { useState } from 'react'
import ContentMessage from './ContentMessage'

type TypeMsg = {
  item: TypeMessage
  userid: string | undefined
}

export const TextMsg = ({ item, userid }: TypeMsg) => {
  const me = item.createdBy === userid
  const deleteFromOthers = !me && item.status === false
  const recall = item.status === true
  const haveReplyMessage = item.parent_id
  const userRep = me
    ? item.createdBy === item.replyMessage.createdBy
      ? 'Bạn đã trả lời chính mình'
      : `Bạn đã trả lời ${item.replyMessage.reply_user}`
    : item.createdBy === item.replyMessage.createdBy
      ? `${item.user_name} đã trả lời chính mình`
      : `${item.user_name}  đã trả lời bạn`

  return (
    !deleteFromOthers && (
      <>
        <div className={`flex ${me ? 'flex-row-reverse items-end gap-2' : 'gap-3'} `}>
          {!me && (
            <img
              src={item.thumbnail ? item.thumbnail : 'src/assets/images/avatars/avatar-2.jpg'}
              className='h-9 w-9 rounded-full shadow'
            />
          )}
          {haveReplyMessage ? (
            <div
              className={` 
                mt-2 flex flex-col ${me ? 'items-end' : 'items-start'} 
              `}
            >
              <div className='flex items-center gap-2'>
                <IonIcon icon='arrow-undo' className='text-[17px]' />
                <p className={`${me ? 'text-right' : ''}`}>{userRep}</p>
              </div>
              <div
                className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
              >
                <ContentMessage me={me} recall={recall} item={item.replyMessage} type='reply' />
                <ContentMessage me={me} recall={recall} item={item} />
              </div>
            </div>
          ) : (
            <ContentMessage me={me} recall={recall} item={item} />
          )}
        </div>
      </>
    )
  )
}

export const ImageMsg = ({ item, userid }: TypeMsg) => {
  const me = item.createdBy === userid
  const deleteFromOthers = item.detelectedBy === userid && item.status === false
  const recall = item.status === true
  const haveReplyMessage = item.parent_id
  const userRep = me
    ? item.createdBy === item.replyMessage.createdBy
      ? 'Bạn đã trả lời chính mình'
      : `Bạn đã trả lời ${item.replyMessage.reply_user}`
    : item.createdBy === item.replyMessage.createdBy
      ? `${item.user_name} đã trả lời chính mình`
      : `${item.user_name}  đã trả lời bạn`

  return (
    !deleteFromOthers && (
      <div className={`flex ${me ? 'flex-row-reverse items-end gap-2' : 'gap-3'} `}>
        {!me && (
          <img
            src={item.thumbnail ? item.thumbnail : 'src/assets/images/avatars/avatar-2.jpg'}
            className='h-9 w-9 rounded-full shadow'
          />
        )}
        <div className='max-w-[200px]'>
          {haveReplyMessage ? (
            <div
              className={` 
                mt-2 flex flex-col ${me ? 'items-end' : 'items-start'} 
              `}
            >
              <div className='flex items-center gap-2'>
                <IonIcon icon='arrow-undo' className='text-[17px]' />
                <p className={`${me ? 'text-right' : ''}`}>{userRep}</p>
              </div>
              <div
                className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
              >
                <ContentMessage me={me} recall={recall} item={item.replyMessage} type='reply' />
                <ContentMessage me={me} recall={recall} item={item} />
              </div>
            </div>
          ) : (
            <ContentMessage me={me} recall={recall} item={item} />
          )}
        </div>
      </div>
    )
  )
}

export const FileMsg = ({ item, userid }: TypeMsg) => {
  const me = item.createdBy === userid
  const deleteFromOthers = item.detelectedBy === userid && item.status === false
  const recall = item.status === true
  const haveReplyMessage = item.parent_id
  const userRep = me
    ? item.createdBy === item.replyMessage.createdBy
      ? 'Bạn đã trả lời chính mình'
      : `Bạn đã trả lời ${item.replyMessage.reply_user}`
    : item.createdBy === item.replyMessage.createdBy
      ? `${item.user_name} đã trả lời chính mình`
      : `${item.user_name}  đã trả lời bạn`
  return (
    !deleteFromOthers && (
      <div className={`flex ${me ? 'flex-row-reverse items-end gap-2' : 'gap-3'} `}>
        {!me && (
          <img
            src={item.thumbnail ? item.thumbnail : 'src/assets/images/avatars/avatar-2.jpg'}
            className='h-9 w-9 rounded-full shadow'
          />
        )}
        <div className='max-w-[300px]'>
          {haveReplyMessage ? (
            <div
              className={` 
                mt-2 flex flex-col ${me ? 'items-end' : 'items-start'} 
              `}
            >
              <div className='flex items-center gap-2'>
                <IonIcon icon='arrow-undo' className='text-[17px]' />
                <p className={`${me ? 'text-right' : ''}`}>{userRep}</p>
              </div>
              <div
                className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
              >
                <ContentMessage me={me} recall={recall} item={item.replyMessage} type='reply' />
                <ContentMessage me={me} recall={recall} item={item} />
              </div>
            </div>
          ) : (
            <ContentMessage me={me} recall={recall} item={item} />
          )}
        </div>
      </div>
    )
  )
}
