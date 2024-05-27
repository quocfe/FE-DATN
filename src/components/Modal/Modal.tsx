import { useEffect } from 'react'

interface Props {
  isVisible: boolean
  onClose: () => void
  children: React.ReactNode
  width?: string
  height?: string
  overFlow?: boolean
}

function Modal({ isVisible, onClose, children, overFlow, height }: Props) {
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

  return (
    <div
      className='fixed inset-0 z-[1010] flex items-center bg-black bg-opacity-10 backdrop-blur-sm'
      id='wrapper-modal'
      onClick={handleClose}
    >
      <div
        className={`${overFlow ? 'overflow-hidden overflow-y-scroll' : ' '} dark:bg-dark2 relative mx-auto h-${height}  w-full  rounded-lg bg-white text-sm text-black shadow-xl md:w-[450px]`}
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* close button */}
        <button onClick={onClose} type='button' className='button-icon absolute  right-0 top-4 m-2.5'>
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
        {children}
      </div>
    </div>
  )
}

export default Modal
