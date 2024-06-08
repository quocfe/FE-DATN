import { IonIcon } from '@ionic/react'
import { FileMsg, ImageMsg, TextMsg, VideoMsg } from '~/pages/Message/components/TypeMessage'
import { useQueryMessage } from '~/pages/Message/hooks/useQueryMessage'
import useAuthStore from '~/store/auth.store'

function MessageFixed() {
  const show = false
  const { data } = useQueryMessage()
  const { profile } = useAuthStore()
  return (
    show && (
      <div className='fixed  bottom-8  right-[200px]  h-[450px] w-[330px] overflow-hidden rounded-se-xl rounded-ss-xl bg-secondery'>
        {/* header */}
        <div className='flex items-center justify-between border-b dark:border-slate-800'>
          <div className='flex min-w-fit items-center justify-start p-2 '>
            <div className='cursor-pointer rounded-md p-1 hover:bg-slate-600 '>
              <img className='h-[32px] w-[32px] rounded-full ' src='src/assets/images/avatars/avatar-5.jpg' />
            </div>
            <p className='ml-1 text-sm font-medium text-black dark:text-white'>Tên người dùng</p>
          </div>
          <div className='flex items-center'>
            <div className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-600'>
              <IonIcon className='cursor-pointer text-xl group-hover:text-white' icon='call' />
            </div>
            <div className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-600'>
              <IonIcon className='cursor-pointer text-xl group-hover:text-white' icon='videocam' />
            </div>
            <div className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-600'>
              <IonIcon className='cursor-pointer text-xl group-hover:text-white' icon='remove' />
            </div>
            <div className='group flex items-center justify-center rounded-full p-1 hover:bg-slate-600'>
              <IonIcon className='cursor-pointer text-xl group-hover:text-white' icon='close' />
            </div>
          </div>
        </div>
        <div className='h-[350px] w-full overflow-y-auto p-5 py-2'>
          <div className='over space-y-2 text-sm font-medium'>
            {data?.data?.data.map((item: TypeMessage, index: number) => {
              switch (item.type) {
                case 1:
                  return <TextMsg key={index} item={item} userid={profile?.user_id} />
                case 2:
                  return <ImageMsg key={index} item={item} userid={profile?.user_id} />
                case 3:
                  return <FileMsg key={index} item={item} userid={profile?.user_id} />
                case 4:
                  return <VideoMsg key={index} item={item} userid={profile?.user_id} />
                default:
                  break
              }
            })}
          </div>
        </div>
      </div>
    )
  )
}

export default MessageFixed
