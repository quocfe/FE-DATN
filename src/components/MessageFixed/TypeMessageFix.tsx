import { IonIcon } from '@ionic/react'
import { configTypeMessage } from '~/pages/Message/utils/configTypeMessage'
import ContentMessage from './ContentMessageFix'
import { MessageFix } from '~/store/messageFix.store'

type TypeMsg = {
  item: TypeMessage
  userid: string
  showImg?: boolean
  infoMessage: InfoMessage
  message_fix: MessageFix
}
export const TextMsg = ({ item, userid, showImg, message_fix, infoMessage }: TypeMsg) => {
  const { me, deleteFromOthers, recall, haveReplyMessage, userRep } = configTypeMessage({ item, userid })
  const recallInReply = item.replyMessage.recallInReply?.filter(
    (re: any) => re.message_id === item.replyMessage.message_id
  )
  const checkRecallInReply = recallInReply?.some((re: any) => re.user_id === userid)

  return (
    !deleteFromOthers && (
      <div className={`flex ${me ? 'flex-row-reverse items-start gap-2' : 'items-end gap-2'} `}>
        {!me &&
          (showImg ? (
            <img
              src={item.thumbnail ? item.thumbnail : 'src/assets/images/avatars/avatar-2.jpg'}
              className='h-6 w-6 rounded-full object-cover shadow'
            />
          ) : (
            <div className='h-6 w-6 ' />
          ))}
        <div className='max-w-[200px]'>
          {haveReplyMessage ? (
            <div
              className={` 
              mt-2 flex 
                flex-col ${me ? 'items-end' : 'items-start'} 
              `}
            >
              {!recall && !checkRecallInReply ? (
                <div className='flex items-center gap-2'>
                  <IonIcon icon='arrow-undo' className='text-[14px]' />
                  <p className={`${me ? 'text-right' : ''} text-[12px]`}>{userRep}</p>
                </div>
              ) : (
                ''
              )}
              <div
                className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
              >
                {!recall
                  ? !checkRecallInReply && (
                      <ContentMessage
                        message_fix={message_fix}
                        infoMessage={infoMessage}
                        me={me}
                        recall={recall}
                        item={item.replyMessage}
                        type='reply'
                      />
                    )
                  : ''}
                <ContentMessage
                  message_fix={message_fix}
                  infoMessage={infoMessage}
                  me={me}
                  recall={recall}
                  item={item}
                />
              </div>
            </div>
          ) : (
            <ContentMessage message_fix={message_fix} infoMessage={infoMessage} me={me} recall={recall} item={item} />
          )}
        </div>
      </div>
    )
  )
}

export const ImageMsg = ({ item, userid, showImg, message_fix, infoMessage }: TypeMsg) => {
  const { me, deleteFromOthers, recall, haveReplyMessage, userRep } = configTypeMessage({ item, userid })
  const check = item.replyMessage.recallInReply?.filter((re: any) => re.message_id === item.replyMessage.message_id)
  const checkRecallInReply = check?.some((re: any) => re.user_id === userid)
  return (
    !deleteFromOthers && (
      <div className={`flex ${me ? 'flex-row-reverse items-start gap-2' : 'items-end gap-2'} `}>
        {!me &&
          (showImg ? (
            <img
              src={item.thumbnail ? item.thumbnail : 'src/assets/images/avatars/avatar-2.jpg'}
              className='h-6 w-6 rounded-full object-cover shadow'
            />
          ) : (
            <div className='h-6 w-6 ' />
          ))}
        <div className='max-w-[200px]'>
          {haveReplyMessage ? (
            <div
              className={` 
                mt-2 flex flex-col ${me ? 'items-end' : 'items-start'} 
              `}
            >
              {!recall && (
                <div className='flex items-center gap-2'>
                  <IonIcon icon='arrow-undo' className='text-[14px]' />
                  <p className={`${me ? 'text-right' : ''} text-[12px]`}>{userRep}</p>
                </div>
              )}
              <div
                className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
              >
                {!recall
                  ? !checkRecallInReply && (
                      <ContentMessage
                        message_fix={message_fix}
                        infoMessage={infoMessage}
                        me={me}
                        recall={recall}
                        item={item.replyMessage}
                        type='reply'
                      />
                    )
                  : ''}
                <ContentMessage
                  message_fix={message_fix}
                  infoMessage={infoMessage}
                  me={me}
                  recall={recall}
                  item={item}
                />
              </div>
            </div>
          ) : (
            <ContentMessage message_fix={message_fix} infoMessage={infoMessage} me={me} recall={recall} item={item} />
          )}
        </div>
      </div>
    )
  )
}

export const FileMsg = ({ item, userid, showImg, message_fix, infoMessage }: TypeMsg) => {
  const { me, deleteFromOthers, recall, haveReplyMessage, userRep } = configTypeMessage({ item, userid })
  const check = item.replyMessage.recallInReply?.filter((re: any) => re.message_id === item.replyMessage.message_id)
  const checkRecallInReply = check?.some((re: any) => re.user_id === userid)
  return (
    !deleteFromOthers && (
      <div className={`flex ${me ? 'flex-row-reverse items-start gap-2' : 'items-end gap-2'} `}>
        {!me &&
          (showImg ? (
            <img
              src={item.thumbnail ? item.thumbnail : 'src/assets/images/avatars/avatar-2.jpg'}
              className='h-6 w-6 rounded-full object-cover shadow'
            />
          ) : (
            <div className='h-6 w-6 ' />
          ))}
        <div className='max-w-[200px]'>
          {haveReplyMessage ? (
            <div
              className={` 
                mt-2 flex flex-col ${me ? 'items-end' : 'items-start'} 
              `}
            >
              {!recall && (
                <div className='flex items-center gap-2'>
                  <IonIcon icon='arrow-undo' className='text-[14px]' />
                  <p className={`${me ? 'text-right' : ''} text-[12px]`}>{userRep}</p>
                </div>
              )}
              <div
                className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
              >
                {!recall
                  ? !checkRecallInReply && (
                      <ContentMessage
                        message_fix={message_fix}
                        infoMessage={infoMessage}
                        me={me}
                        recall={recall}
                        item={item.replyMessage}
                        type='reply'
                      />
                    )
                  : ''}
                <ContentMessage
                  message_fix={message_fix}
                  infoMessage={infoMessage}
                  me={me}
                  recall={recall}
                  item={item}
                />
              </div>
            </div>
          ) : (
            <ContentMessage message_fix={message_fix} infoMessage={infoMessage} me={me} recall={recall} item={item} />
          )}
        </div>
      </div>
    )
  )
}

export const VideoMsg = ({ item, userid, showImg, message_fix, infoMessage }: TypeMsg) => {
  const { me, deleteFromOthers, recall, haveReplyMessage, userRep } = configTypeMessage({ item, userid })
  const check = item.replyMessage.recallInReply?.filter((re: any) => re.message_id === item.replyMessage.message_id)
  const checkRecallInReply = check?.some((re: any) => re.user_id === userid)
  return (
    !deleteFromOthers && (
      <div className={`flex ${me ? 'flex-row-reverse items-start gap-2' : 'items-end gap-2'} `}>
        {!me &&
          (showImg ? (
            <img
              src={item.thumbnail ? item.thumbnail : 'src/assets/images/avatars/avatar-2.jpg'}
              className='h-6 w-6 rounded-full object-cover shadow'
            />
          ) : (
            <div className='h-6 w-6 ' />
          ))}
        <div className='max-w-[200px]'>
          {haveReplyMessage ? (
            <div
              className={` 
                mt-2 flex flex-col ${me ? 'items-end' : 'items-start'} 
              `}
            >
              {!recall && !checkRecallInReply ? (
                <div className='flex items-center gap-2'>
                  <IonIcon icon='arrow-undo' className='text-[14px]' />
                  <p className={`${me ? 'text-right' : ''} text-[12px]`}>{userRep}</p>
                </div>
              ) : (
                ''
              )}
              <div
                className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
              >
                {!recall
                  ? !checkRecallInReply && (
                      <ContentMessage
                        message_fix={message_fix}
                        infoMessage={infoMessage}
                        me={me}
                        recall={recall}
                        item={item.replyMessage}
                        type='reply'
                      />
                    )
                  : ''}
                <ContentMessage
                  message_fix={message_fix}
                  infoMessage={infoMessage}
                  me={me}
                  recall={recall}
                  item={item}
                />
              </div>
            </div>
          ) : (
            <ContentMessage message_fix={message_fix} infoMessage={infoMessage} me={me} recall={recall} item={item} />
          )}
        </div>
      </div>
    )
  )
}

export const AudioMsg = ({ item, userid, showImg, message_fix, infoMessage }: TypeMsg) => {
  const { me, deleteFromOthers, recall, haveReplyMessage, userRep } = configTypeMessage({ item, userid })
  const check = item.replyMessage.recallInReply?.filter((re: any) => re.message_id === item.replyMessage.message_id)
  const checkRecallInReply = check?.some((re: any) => re.user_id === userid)
  return (
    !deleteFromOthers && (
      <div className={`flex ${me ? 'flex-row-reverse items-start gap-2' : 'items-end gap-2'} `}>
        {!me &&
          (showImg ? (
            <img
              src={item.thumbnail ? item.thumbnail : 'src/assets/images/avatars/avatar-2.jpg'}
              className='h-6 w-6 rounded-full object-cover shadow'
            />
          ) : (
            <div className='h-6 w-6 ' />
          ))}
        <div className=''>
          {haveReplyMessage ? (
            <div
              className={` 
                mt-2 flex flex-col ${me ? 'items-end' : 'items-start'} 
              `}
            >
              {!recall && !checkRecallInReply ? (
                <div className='flex items-center gap-2'>
                  <IonIcon icon='arrow-undo' className='text-[14px]' />
                  <p className={`${me ? 'text-right' : ''} text-[12px]`}>{userRep}</p>
                </div>
              ) : (
                ''
              )}
              <div
                className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
              >
                {!recall
                  ? !checkRecallInReply && (
                      <ContentMessage
                        message_fix={message_fix}
                        infoMessage={infoMessage}
                        me={me}
                        recall={recall}
                        item={item.replyMessage}
                        type='reply'
                      />
                    )
                  : ''}
                <ContentMessage
                  message_fix={message_fix}
                  infoMessage={infoMessage}
                  me={me}
                  recall={recall}
                  item={item}
                />
              </div>
            </div>
          ) : (
            <ContentMessage message_fix={message_fix} infoMessage={infoMessage} me={me} recall={recall} item={item} />
          )}
        </div>
      </div>
    )
  )
}

export const VideoCallMsg = ({ item, userid, showImg, message_fix, infoMessage }: TypeMsg) => {
  const { me, deleteFromOthers, recall, haveReplyMessage, userRep } = configTypeMessage({ item, userid })
  const recallInReply = item.replyMessage.recallInReply?.filter(
    (re: any) => re.message_id === item.replyMessage.message_id
  )
  const checkRecallInReply = recallInReply?.some((re: any) => re.user_id === userid)

  return (
    !deleteFromOthers && (
      <div className={`flex ${me ? 'flex-row-reverse items-start gap-2' : 'items-end gap-2'} `}>
        {!me &&
          (showImg ? (
            <img
              src={item.thumbnail ? item.thumbnail : 'src/assets/images/avatars/avatar-2.jpg'}
              className='h-6 w-6 rounded-full object-cover shadow'
            />
          ) : (
            <div className='h-6 w-6 ' />
          ))}
        {haveReplyMessage ? (
          <div
            className={` 
              mt-2 flex 
                flex-col ${me ? 'items-end' : 'items-start'} 
              `}
          >
            {!recall && !checkRecallInReply ? (
              <div className='flex items-center gap-2'>
                <IonIcon icon='arrow-undo' className='text-[14px]' />
                <p className={`${me ? 'text-right' : ''} text-[12px]`}>{userRep}</p>
              </div>
            ) : (
              ''
            )}
            <div
              className={`rounded-[14px] 
                ${me ? 'items-end' : 'items-start'} flex w-fit flex-col `}
            >
              {!recall
                ? !checkRecallInReply && (
                    <ContentMessage
                      message_fix={message_fix}
                      infoMessage={infoMessage}
                      me={me}
                      recall={recall}
                      item={item.replyMessage}
                      type='reply'
                    />
                  )
                : ''}
              <ContentMessage message_fix={message_fix} infoMessage={infoMessage} me={me} recall={recall} item={item} />
            </div>
          </div>
        ) : (
          <ContentMessage message_fix={message_fix} infoMessage={infoMessage} me={me} recall={recall} item={item} />
        )}
      </div>
    )
  )
}
