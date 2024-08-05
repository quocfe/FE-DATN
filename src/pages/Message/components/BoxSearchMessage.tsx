import { IonIcon } from '@ionic/react'
import _ from 'lodash'
import useConversationStore from '~/store/conversation.store'

type BoxSearchMessageType = {
  boxSearchRef: React.LegacyRef<HTMLDivElement>
}

function BoxSearchMessage({ boxSearchRef }: BoxSearchMessageType) {
  const { setSearchParam, setToggleBoxSearchMessage } = useConversationStore()

  return (
    // <div className='absolute left-0 flex items-center w-full h-full px-4 bg-white shadow-sm -bottom-full'>
    // </div>
    <div ref={boxSearchRef} className='flex w-full'>
      <div
        className='flex-1 rounded-xl bg-secondery max-md:hidden sm:relative'
        aria-haspopup='true'
        aria-expanded='false'
      >
        <div className='absolute bottom-1/2 left-3 flex translate-y-1/2'>
          <IonIcon icon='search' className='md hydrated text-[13px]' role='img' aria-label='search' />
        </div>
        <input
          onChange={_.debounce((e) => setSearchParam(e.target.value), 500)}
          type='text'
          placeholder='Search'
          className='w-full !rounded-lg !py-2 !pl-10 !pr-12 !text-[13px]'
        />
        <div
          onClick={() => setToggleBoxSearchMessage(false)}
          className='absolute bottom-1/2 right-3 flex translate-y-1/2 cursor-pointer rounded-full bg-slate-200 p-2'
        >
          <IonIcon icon='close' className='md hydrated text-[13px]' role='img' aria-label='search' />
        </div>
      </div>
    </div>
  )
}

export default BoxSearchMessage
