import { IonIcon } from '@ionic/react'
import { memo, useCallback, useMemo } from 'react'
import useConversationStore from '~/store/conversation.store'
import useMessageStore from '~/store/message.store'
import { calculateTimeAgo } from '~/utils/helpers'
import { useQueryStatusMessage } from '../../hooks/useQuery/useQueryStatusMessage'

const STATUS_ORDER = ['đã xem', 'đã nhận', 'đã gửi']

const StatusMessage = ({ group_id_fixed }: { group_id_fixed?: string }) => {
  const { selectedConversation } = useConversationStore()
  let idQueryStatusMessage =
    Object.keys(selectedConversation).length != 0 ? selectedConversation.group_id : group_id_fixed
  const { data: dataStatus } = useQueryStatusMessage(idQueryStatusMessage)

  const highestStatus = useMemo(() => {
    return STATUS_ORDER.find((status) =>
      dataStatus?.data.data?.some((item) => item.status === status && item.group_message_id === idQueryStatusMessage)
    )
  }, [dataStatus?.data.data])

  const renderContent = useCallback(
    (status: string) => {
      const seenMessages = dataStatus?.data.data?.filter((item) => item.status === 'đã xem')

      switch (status) {
        case 'đã xem':
          return seenMessages?.length ? (
            <div className='flex'>
              {seenMessages.length > 4 && (
                <div className='group relative mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-600 text-xs text-white'>
                  <p className='text-[8px]'>+{seenMessages.length < 10 ? seenMessages.length - 4 : '10'}</p>
                  <div className='absolute -top-6 right-0 hidden min-w-[120px] items-center justify-center rounded-sm bg-white p-1 shadow-sm group-hover:flex'>
                    <p className='text-[11px] font-medium text-gray-600'>
                      +{seenMessages.length < 10 ? seenMessages.length - 4 : '10'} người khác
                    </p>
                  </div>
                </div>
              )}
              {seenMessages.slice(0, 4).map((seen) => (
                <div key={seen.seen_message_id} className='group relative'>
                  <img
                    src={seen.avatar}
                    alt='Avatar'
                    className={`mr-1 ${group_id_fixed ? 'h-4 w-4' : 'h-5 w-5'} rounded-full object-cover`}
                  />
                  <div className='absolute -top-6 right-0 hidden min-w-[120px] items-center justify-center rounded-sm bg-white p-1 shadow-sm group-hover:flex'>
                    <p className='text-[11px] font-medium'>
                      đã xem {calculateTimeAgo(seen.updatedAt?.toString() ?? '').toLocaleLowerCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : null
        case 'đã nhận':
        case 'đã gửi':
          return (
            <div className='group relative'>
              <IonIcon
                className='my-anchor-element'
                title={status}
                name={status === 'đã nhận' ? 'checkmark-circle' : 'checkmark-circle-outline'}
              />
              <div className='absolute -top-6 right-0 hidden min-w-[60px] items-center justify-center rounded-sm bg-white p-1 shadow-sm group-hover:flex'>
                <p className='text-[11px] font-semibold'>{status}</p>
              </div>
            </div>
          )
        default:
          return (
            <div className='group relative'>
              <IonIcon className='my-anchor-element' name='checkmark-circle' />
              <div className='absolute -top-6 right-0 hidden min-w-[60px] items-center justify-center rounded-sm bg-white p-1 shadow-sm group-hover:flex'>
                <p className='text-[11px] font-semibold'>đã gửi</p>
              </div>
            </div>
          )
      }
    },
    [dataStatus?.data.data]
  )

  return (
    <div className='status123 mt-2 flex cursor-pointer justify-end'>
      {highestStatus && renderContent(highestStatus)}
    </div>
  )
}

export default memo(StatusMessage)
