import { IonIcon } from '@ionic/react'

function Trend() {
  return (
    <div className='box border1 dark:bg-dark2 p-5 px-6'>
      <div className='flex justify-between text-black dark:text-white'>
        <h3 className='text-base font-bold'> Trends for you </h3>
        <button type='button'>
          <IonIcon icon='sync-outline' className='text-xl' />
        </button>
      </div>
      <div className='mb-2 mt-5 space-y-3.5 text-xs font-normal capitalize text-gray-600 dark:text-white/80'>
        <a href='#'>
          <div className='p flex items-center gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='-mt-2 h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5'
              />
            </svg>
            <div className='flex-1'>
              <h4 className='text-sm font-semibold text-black dark:text-white'> artificial intelligence </h4>
              <div className='mt-0.5'> 1,245,62 post </div>
            </div>
          </div>
        </a>
        <a href='#' className='block'>
          <div className='flex items-center gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='-mt-2 h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5'
              />
            </svg>
            <div className='flex-1'>
              <h4 className='text-sm font-semibold text-black dark:text-white'> Web developers</h4>
              <div className='mt-0.5'> 1,624 post </div>
            </div>
          </div>
        </a>
        <a href='#' className='block'>
          <div className='flex items-center gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='-mt-2 h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5'
              />
            </svg>
            <div className='flex-1'>
              <h4 className='text-sm font-semibold text-black dark:text-white'> Ui Designers</h4>
              <div className='mt-0.5'> 820 post </div>
            </div>
          </div>
        </a>
        <a href='#' className='block'>
          <div className='flex items-center gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='-mt-2 h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5'
              />
            </svg>
            <div className='flex-1'>
              <h4 className='text-sm font-semibold text-black dark:text-white'> affiliate marketing </h4>
              <div className='mt-0.5'> 480 post </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Trend
