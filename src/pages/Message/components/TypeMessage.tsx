import { IonIcon } from '@ionic/react'
import { useState } from 'react'
import ContentMessage from './ContentMessage'
import { configTypeMessage } from '../utils/configTypeMessage'

type TypeMsg = {
  item: TypeMessage
  userid: string
}

export const TextMsg = ({ item, userid }: TypeMsg) => {
  const { me, deleteFromOthers, recall, haveReplyMessage, userRep } = configTypeMessage({ item, userid })
  const check = item.replyMessage.recallInReply.filter((re: any) => re.message_id === item.replyMessage.message_id)
  const check2 = check.some((re: any) => re.user_id === userid)

  return (
    !deleteFromOthers && (
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
            {!recall && !check2 ? (
              <div className='flex items-center gap-2'>
                <IonIcon icon='arrow-undo' className='text-[17px]' />
                <p className={`${me ? 'text-right' : ''}`}>{userRep}</p>
              </div>
            ) : (
              ''
            )}
            <div
              className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
            >
              {!recall
                ? !check2 && <ContentMessage me={me} recall={recall} item={item.replyMessage} type='reply' />
                : ''}
              <ContentMessage me={me} recall={recall} item={item} />
            </div>
          </div>
        ) : (
          <ContentMessage me={me} recall={recall} item={item} />
        )}
      </div>
    )
  )
}

export const ImageMsg = ({ item, userid }: TypeMsg) => {
  const { me, deleteFromOthers, recall, haveReplyMessage, userRep } = configTypeMessage({ item, userid })
  const check = item.replyMessage.recallInReply.filter((re: any) => re.message_id === item.replyMessage.message_id)
  const check2 = check.some((re: any) => re.user_id === userid)
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
              {!recall && (
                <div className='flex items-center gap-2'>
                  <IonIcon icon='arrow-undo' className='text-[17px]' />
                  <p className={`${me ? 'text-right' : ''}`}>{userRep}</p>
                </div>
              )}
              <div
                className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
              >
                {!recall
                  ? !check2 && <ContentMessage me={me} recall={recall} item={item.replyMessage} type='reply' />
                  : ''}
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
  const { me, deleteFromOthers, recall, haveReplyMessage, userRep } = configTypeMessage({ item, userid })
  const check = item.replyMessage.recallInReply.filter((re: any) => re.message_id === item.replyMessage.message_id)
  const check2 = check.some((re: any) => re.user_id === userid)
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
              {!recall && (
                <div className='flex items-center gap-2'>
                  <IonIcon icon='arrow-undo' className='text-[17px]' />
                  <p className={`${me ? 'text-right' : ''}`}>{userRep}</p>
                </div>
              )}
              <div
                className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
              >
                {!recall
                  ? !check2 && <ContentMessage me={me} recall={recall} item={item.replyMessage} type='reply' />
                  : ''}
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

export const VideoMsg = ({ item, userid }: TypeMsg) => {
  const { me, deleteFromOthers, recall, haveReplyMessage, userRep } = configTypeMessage({ item, userid })
  const check = item.replyMessage.recallInReply.filter((re: any) => re.message_id === item.replyMessage.message_id)
  const check2 = check.some((re: any) => re.user_id === userid)
  return (
    !deleteFromOthers && (
      <div className={`flex ${me ? 'flex-row-reverse items-end gap-2' : 'gap-3'} `}>
        {!me && (
          <img
            src={item.thumbnail ? item.thumbnail : 'src/assets/images/avatars/avatar-2.jpg'}
            className='h-9 w-9 rounded-full shadow'
          />
        )}
        <div className=''>
          {haveReplyMessage ? (
            <div
              className={` 
                mt-2 flex flex-col ${me ? 'items-end' : 'items-start'} 
              `}
            >
              {!recall && !check2 ? (
                <div className='flex items-center gap-2'>
                  <IonIcon icon='arrow-undo' className='text-[17px]' />
                  <p className={`${me ? 'text-right' : ''}`}>{userRep}</p>
                </div>
              ) : (
                ''
              )}
              <div
                className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
              >
                {!recall
                  ? !check2 && <ContentMessage me={me} recall={recall} item={item.replyMessage} type='reply' />
                  : ''}
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
