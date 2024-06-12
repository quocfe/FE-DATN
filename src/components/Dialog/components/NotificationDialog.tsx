interface Props {
  title: string
  description: string
  onClose: () => void
}

function NotificationDialog({ title, description, onClose }: Props) {
  return (
    <div className='flex flex-col items-center justify-center p-5 md:max-w-md'>
      <div
        className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full'
        style={{ backgroundColor: 'rgb(220, 252, 231)' }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='rgb(22, 163, 74)'
          aria-hidden='true'
          className='h-6 w-6'
        >
          <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5'></path>
        </svg>
      </div>
      <h3 className='mt-5 text-center text-base font-semibold leading-6 text-gray-900' id='modal-title'>
        {title}
      </h3>
      <div className='mt-2'>
        <p className='text-center text-sm text-gray-500'>{description}</p>
      </div>
      <button
        onClick={onClose}
        type='button'
        className='inline-flex w-full justify-center rounded-md px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset sm:mt-5'
        style={{
          backgroundColor: 'rgb(79, 70, 229)'
        }}
      >
        Quay lại
      </button>
    </div>
  )
}

export default NotificationDialog
