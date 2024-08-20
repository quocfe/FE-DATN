import { IonIcon } from '@ionic/react'

const SideBarMessageSkelaton = () => {
  return (
    <div className=' relative border-r md:w-[360px] dark:border-slate-700'>
      <div
        id='side-chat'
        className='dark:bg-dark2 left-0 top-0 z-50 bg-white max-md:fixed max-md:h-screen max-md:w-5/6 max-md:-translate-x-full max-md:shadow'
      >
        {/* heading title */}
        <div className='border-b p-4 dark:border-slate-700'>
          <div className='mt-2 flex items-center justify-between'>
            <div className='h-[30px] w-[100px] rounded bg-slate-300'></div>
            {/* right action buttons */}
            <div className='flex items-center gap-2.5'>
              <div className='h-[30px] w-[50px] rounded bg-slate-300'></div>
              <div className='h-[30px] w-[50px] rounded bg-slate-300'></div>
              {/* mobile toggle menu */}
              <button
                type='button'
                className='md:hidden'
                uk-toggle='target: #side-chat ; cls: max-md:-translate-x-full'
              >
                <div className='h-[30px] w-[100px] rounded bg-slate-300'></div>
              </button>
            </div>
          </div>
          <div className='relative mt-4'>
            {/* search */}
            <div className='h-[30px] w-[100%] rounded bg-slate-300'></div>
          </div>
        </div>
        {/* users list */}
        <div className='h-[calc(100vh-130px)] space-y-2 overflow-y-auto p-2 md:h-[calc(100vh-204px)]'>
          <div className='relative flex cursor-pointer items-center gap-4 rounded-xl p-2 duration-200 hover:bg-secondery '>
            <div className='relative h-14 w-14 shrink-0'>
              <img className='h-full w-full rounded-full bg-slate-300 object-cover' />
            </div>
            <div className='flex h-full min-w-0 flex-1 flex-col justify-evenly gap-1'>
              <div className='flex items-center gap-2'>
                <div className='h-[30px] w-[100%] rounded bg-slate-300'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* overly */}
    </div>
  )
}

export default SideBarMessageSkelaton
