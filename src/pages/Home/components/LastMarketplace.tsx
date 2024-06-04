import { IonIcon } from '@ionic/react'

function LastMarketplace() {
  return (
    <div className='box border1 dark:bg-dark2 p-5 px-6'>
      <div className='flex justify-between text-black dark:text-white'>
        <h3 className='text-base font-bold'> Premium Photos </h3>
        <button type='button'>
          <IonIcon icon='sync-outline' className='text-xl' />
        </button>
      </div>
      <div
        className='relative mb-2 mt-4 text-center text-sm font-medium capitalize'
        tabIndex={-1}
        uk-slider='autoplay: true;finite: true'
      >
        <div className='uk-slider-container overflow-hidden'>
          <ul className='uk-slider-items -ml-2 w-[calc(100%+0.5rem)]'>
            <li className='w-1/2 pr-2'>
              <a href='#'>
                <div className='relative overflow-hidden rounded-lg'>
                  <div className='relative h-40 w-full'>
                    <img
                      src='/src/assets/images/product/product-1.jpg'
                      alt=''
                      className='inset-0 h-full w-full object-cover'
                    />
                  </div>
                  <div className='absolute right-0 top-0 m-2 rounded-full bg-white/60 px-2 py-0.5 text-sm font-semibold dark:bg-slate-800/60'>
                    $12
                  </div>
                </div>
                <div className='mt-3 w-full'> Chill Lotion </div>
              </a>
            </li>
            <li className='w-1/2 pr-2'>
              <a href='#'>
                <div className='relative overflow-hidden rounded-lg'>
                  <div className='relative h-40 w-full'>
                    <img
                      src='/src/assets/images/product/product-3.jpg'
                      alt=''
                      className='inset-0 h-full w-full object-cover'
                    />
                  </div>
                  <div className='absolute right-0 top-0 m-2 rounded-full bg-white/60 px-2 py-0.5 text-sm font-semibold dark:bg-slate-800/60'>
                    $18
                  </div>
                </div>
                <div className='mt-3 w-full'> Gaming mouse </div>
              </a>
            </li>
            <li className='w-1/2 pr-2'>
              <a href='#'>
                <div className='relative overflow-hidden rounded-lg'>
                  <div className='relative h-40 w-full'>
                    <img
                      src='/src/assets/images/product/product-5.jpg'
                      alt=''
                      className='inset-0 h-full w-full object-cover'
                    />
                  </div>
                  <div className='absolute right-0 top-0 m-2 rounded-full bg-white/60 px-2 py-0.5 text-sm font-semibold dark:bg-slate-800/60'>
                    $12
                  </div>
                </div>
                <div className='mt-3 w-full'> Herbal Shampoo </div>
              </a>
            </li>
          </ul>
          <button
            type='button'
            className='dark:bg-dark3 absolute -left-4 top-16 grid h-9 w-9 place-items-center rounded-full bg-white shadow'
            uk-slider-item='previous'
          >
            <IonIcon icon='chevron-back' className='text-2xl' />
          </button>
          <button
            type='button'
            className='dark:bg-dark3 absolute -right-4 top-16 grid h-9 w-9 place-items-center rounded-full bg-white shadow'
            uk-slider-item='next'
          >
            <IonIcon icon='chevron-forward' className='text-2xl' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LastMarketplace
