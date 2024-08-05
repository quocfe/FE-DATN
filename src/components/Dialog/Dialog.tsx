import { useEffect } from 'react'
import WarningDialog from './components/WarningDialog'
import NotificationDialog from './components/NotificationDialog'
import SuccessDialog from './components/SuccessDialog'

interface Props {
  isVisible: boolean
  type: 'success' | 'warning' | 'notification'
  title: string
  description: string
  textBtn?: string
  onClose: () => void
  callback?: () => void
}

function Dialog({ isVisible, type, title, description, textBtn, onClose, callback }: Props) {
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

  // Hiển thị
  const renderDialog = () => {
    switch (type) {
      case 'warning':
        return (
          <WarningDialog
            title={title}
            description={description}
            textBtn={textBtn}
            onClose={onClose}
            callback={callback}
          />
        )
      case 'notification':
        return <NotificationDialog title={title} description={description} onClose={onClose} />
      case 'success':
        return (
          <SuccessDialog
            callback={callback}
            description={description}
            onClose={onClose}
            textBtn={textBtn}
            title={title}
          />
        )
      default:
        break
    }
  }

  return (
    <div
      className='fixed inset-0 z-[9999] flex items-center bg-black bg-opacity-10 backdrop-blur-sm'
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
