import { IonIcon } from '@ionic/react'
import _ from 'lodash'
import useConversationStore from '~/store/conversation.store'

type BoxSearchMessageType = {
  boxSearchRef: React.LegacyRef<HTMLDivElement>
}

function BoxSearchMessage({ boxSearchRef }: BoxSearchMessageType) {
  const { setSearchParam, setToggleBoxSearchMessage } = useConversationStore()

  return (
    <div ref={boxSearchRef} className='flex w-full gap-2'>
      <div
        className=' flex-1 rounded-xl bg-secondery max-md:hidden sm:relative sm:w-[80%]'
        aria-haspopup='true'
        aria-expanded='false'
      >
        <div className='absolute bottom-1/2 left-3 flex translate-y-1/2'>
          <IonIcon icon='search' className='md hydrated text-xl' role='img' aria-label='search' />
        </div>
        <input
          onChange={_.debounce((e) => setSearchParam(e.target.value), 500)}
          type='text'
          placeholder='Search'
          className='w-full !rounded-lg !py-2 !pl-10'
        />
      </div>
      <button
        onClick={() => setToggleBoxSearchMessage(false)}
        className='btn rounded-xl bg-secondery p-2 text-[14px] font-semibold'
      >
        Đóng
      </button>
    </div>
    // <div className='absolute left-0 flex items-center w-full h-full px-4 bg-white shadow-sm -bottom-full'>
    // </div>
  )
}

export default BoxSearchMessage
