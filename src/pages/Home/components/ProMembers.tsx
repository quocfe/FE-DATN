import { IonIcon } from '@ionic/react'

function ProMembers() {
  return (
    <div className='box border1 dark:bg-dark2 p-5 px-6'>
      <div className='flex justify-between text-black dark:text-white'>
        <h3 className='text-base font-bold'> Pro Members </h3>
      </div>
      <div
        className='relative mb-2 mt-4 text-sm font-normal capitalize'
        tabIndex={-1}
        uk-slider='autoplay: true;finite: true'
      >
        <div className='uk-slider-container overflow-hidden'>
          <ul className='uk-slider-items -ml-2 w-[calc(100%+0.5rem)]'>
            <li className='w-1/2 pr-2'>
              <a href='timeline.html'></a>
              <div className='border1 flex flex-col items-center rounded-xl p-2 shadow-sm'>
                <a href='timeline.html'></a>
                <a href='timeline.html'>
                  <div className='relative mx-auto mt-2 h-16 w-16'>
                    <img
                      src='/src/assets/images/avatars/avatar-5.jpg'
                      alt=''
                      className='h-full w-full rounded-full object-cover shadow'
                    />
                  </div>
                </a>
                <div className='mt-5 w-full text-center'>
                  <a href='timeline.html'>
                    <h5 className='font-semibold'> Martin Gray</h5>
                  </a>
                  <div className='mt-0.5 text-xs font-medium text-gray-400'> 12K Followers</div>
                  <button
                    type='button'
                    className='border1 mt-4 block w-full rounded-lg bg-secondery py-1.5 text-sm font-semibold'
                  >
                    Follow
                  </button>
                </div>
              </div>
            </li>
            <li className='w-1/2 pr-2'>
              <div className='border1 flex flex-col items-center rounded-xl p-2 shadow-sm'>
                <a href='timeline.html'>
                  <div className='relative mx-auto mt-2 h-16 w-16'>
                    <img
                      src='/src/assets/images/avatars/avatar-4.jpg'
                      alt=''
                      className='h-full w-full rounded-full object-cover shadow'
                    />
                  </div>
                </a>
                <div className='mt-5 w-full text-center'>
                  <a href='timeline.html'>
                    <h5 className='font-semibold'> Alexa Park</h5>
                  </a>
                  <div className='mt-0.5 text-xs font-medium text-gray-400'> 12K Followers</div>
                  <button
                    type='button'
                    className='border1 mt-4 block w-full rounded-lg bg-secondery py-1.5 text-sm font-semibold'
                  >
                    Follow
                  </button>
                </div>
              </div>
            </li>
            <li className='w-1/2 pr-2'>
              <div className='border1 flex flex-col items-center rounded-xl p-2 shadow-sm'>
                <a href='timeline.html'>
                  <div className='relative mx-auto mt-2 h-16 w-16'>
                    <img
                      src='/src/assets/images/avatars/avatar-4.jpg'
                      alt=''
                      className='h-full w-full rounded-full object-cover shadow'
                    />
                  </div>
                </a>
                <div className='mt-5 w-full text-center'>
                  <a href='timeline.html'>
                    <h5 className='font-semibold'> James Lewis</h5>
                  </a>
                  <div className='mt-0.5 text-xs font-medium text-gray-400'> 15K Followers</div>
                  <button
                    type='button'
                    className='border1 mt-4 block w-full rounded-lg bg-secondery py-1.5 text-sm font-semibold'
                  >
                    Follow
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <button
            type='button'
            className='dark:bg-dark3 absolute -left-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-slate-100'
            uk-slider-item='previous'
          >
            <IonIcon icon='chevron-back' className='text-2xl' />
          </button>
          <button
            type='button'
            className='dark:bg-dark3 absolute -right-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-slate-100'
            uk-slider-item='next'
          >
            <IonIcon icon='chevron-forward' className='text-2xl' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProMembers
