import { IonIcon } from '@ionic/react'
import Trend from './Trend'
import ProMembers from './ProMembers'
import LastMarketplace from './LastMarketplace'
import SuggestMakeFriends from './SuggestMakeFriends'
import ReceivedRequestFriends from './ReceivedRequestFriends'

function Sidebar() {
  return (
    <div className='flex-1'>
      <div
        className='max-lg:grid max-lg:gap-6 sm:grid-cols-2 lg:space-y-4 lg:pb-8'
        uk-sticky='media: 1024; end: #js-oversized; offset: 80'
      >
        {/* Lời mời kết bạn */}
        <ReceivedRequestFriends />
        {/* Gợi ý kết bạn */}
        <SuggestMakeFriends />
        {/* peaple you might know */}
        <div className='box border1 dark:bg-dark2 hidden p-5 px-6'>
          <div className='flex justify-between text-black dark:text-white'>
            <h3 className='text-base font-bold'> Peaple You might know </h3>
            <button type='button'>
              <IonIcon icon='sync-outline' className='text-xl' />
            </button>
          </div>
          <div className='mb-2 mt-5 space-y-4 text-xs font-normal capitalize text-gray-500 dark:text-white/80'>
            <div className='flex items-center gap-3'>
              <a href='timeline.html'>
                <img
                  src='/src/assets/images/avatars/avatar-7.jpg'
                  alt=''
                  className='h-10 w-10 rounded-full bg-gray-200'
                />
              </a>
              <div className='flex-1'>
                <a href='timeline.html'>
                  <h4 className='text-sm font-semibold text-black dark:text-white'> Johnson smith</h4>
                </a>
                <div className='mt-0.5'> Suggested For You </div>
              </div>
              <button type='button' className='rounded-full bg-secondery px-4 py-1.5 text-sm font-semibold'>
                Follow
              </button>
            </div>
            <div className='flex items-center gap-3'>
              <a href='timeline.html'>
                <img
                  src='/src/assets/images/avatars/avatar-5.jpg'
                  alt=''
                  className='h-10 w-10 rounded-full bg-gray-200'
                />
              </a>
              <div className='flex-1'>
                <a href='timeline.html'>
                  <h4 className='text-sm font-semibold text-black dark:text-white'> James Lewis</h4>
                </a>
                <div className='mt-0.5'> Followed by Johnson </div>
              </div>
              <button type='button' className='rounded-full bg-secondery px-4 py-1.5 text-sm font-semibold'>
                Follow
              </button>
            </div>
            <div className='flex items-center gap-3'>
              <a href='timeline.html'>
                <img
                  src='/src/assets/images/avatars/avatar-2.jpg'
                  alt=''
                  className='h-10 w-10 rounded-full bg-gray-200'
                />
              </a>
              <div className='flex-1'>
                <a href='timeline.html'>
                  <h4 className='text-sm font-semibold text-black dark:text-white'> John Michael</h4>
                </a>
                <div className='mt-0.5'> Followed by Monroe</div>
              </div>
              <button type='button' className='rounded-full bg-secondery px-4 py-1.5 text-sm font-semibold'>
                Follow
              </button>
            </div>
            <div className='flex items-center gap-3'>
              <a href='timeline.html'>
                <img
                  src='/src/assets/images/avatars/avatar-3.jpg'
                  alt=''
                  className='h-10 w-10 rounded-full bg-gray-200'
                />
              </a>
              <div className='flex-1'>
                <a href='timeline.html'>
                  <h4 className='text-sm font-semibold text-black dark:text-white'> Monroe Parker</h4>
                </a>
                <div className='mt-0.5'> Suggested For You </div>
              </div>
              <button type='button' className='rounded-full bg-secondery px-4 py-1.5 text-sm font-semibold'>
                Follow
              </button>
            </div>
            <div className='flex items-center gap-3'>
              <a href='timeline.html'>
                <img
                  src='/src/assets/images/avatars/avatar-4.jpg'
                  alt=''
                  className='h-10 w-10 rounded-full bg-gray-200'
                />
              </a>
              <div className='flex-1'>
                <a href='timeline.html'>
                  <h4 className='text-sm font-semibold text-black dark:text-white'> Martin Gray</h4>
                </a>
                <div className='mt-0.5'> Suggested For You </div>
              </div>
              <button type='button' className='rounded-full bg-secondery px-4 py-1.5 text-sm font-semibold'>
                Follow
              </button>
            </div>
          </div>
        </div>
        {/* latest marketplace items */}
        <LastMarketplace />
        {/* Pro Members */}
        <ProMembers />
        {/* Trends */}
        <Trend />
      </div>
    </div>
  )
}

export default Sidebar
