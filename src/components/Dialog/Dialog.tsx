import { useEffect } from 'react'

interface Props {
  isVisible: boolean
  onClose: () => void
  type: 'success' | 'notification' | 'warning'
}

const Warning = () => {
  return (
    <>
      <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 md:max-w-lg'>
        <div className='sm:flex sm:items-start'>
          <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
            <svg
              className='h-6 w-6 text-red-600'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
              />
            </svg>
          </div>
          <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
            <h3 className='text-base font-semibold leading-6 text-gray-900' id='modal-title'>
              Deactivate account
            </h3>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                Are you sure you want to deactivate your account? All of your data will be permanently removed. This
                action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
        <button
          type='button'
          className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
        >
          Hủy chặn
        </button>
        <button
          type='button'
          className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
        >
          Quay lại
        </button>
      </div>
    </>
  )
}

const Notification = () => {
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
        Deactivate account
      </h3>
      <div className='mt-2'>
        <p className='text-center text-sm text-gray-500'>
          Are you sure you want to deactivate your account? All of your data will be permanently removed. This action
          cannot be undone.
        </p>
      </div>
      <button
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

function Dialog({ isVisible, onClose, type }: Props) {
  useEffect(() => {
    document.body.style.overflowY = isVisible ? 'hidden' : 'auto'

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [isVisible])

  if (!isVisible) return

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement

    if (target.id === 'wrapper-modal') onClose()
  }

  const renderDialog = () => {
    switch (type) {
      case 'warning':
        return <Warning />
      case 'notification':
        return <Notification />
      default:
        break
    }
  }

  return (
    <div
      className='fixed inset-0 z-[1010] flex items-center bg-black bg-opacity-10 backdrop-blur-sm'
      id='wrapper-modal'
      onClick={handleClose}
    >
      <div className='dark:bg-dark2 relative mx-auto inline-block overflow-hidden rounded-lg bg-white text-sm text-black shadow-xl'>
        {/* close button */}
        <button onClick={onClose} type='button' className='button-icon absolute right-0 top-0 m-2.5'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        <div>{renderDialog()}</div>
      </div>
    </div>
  )
}

export default Dialog
