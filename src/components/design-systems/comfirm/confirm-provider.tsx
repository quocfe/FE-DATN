import React, { ReactNode, createContext, useCallback, useContext, useState } from 'react'
import { cn } from '~/helpers'

interface ConfigType {
  title?: string | null
  content?: ReactNode
  isIcon?: boolean
  color?: string | null
  callbackOK: () => Promise<void> | void
  callBackClose?: () => Promise<void> | void
  confirmOk?: string | null
  confirmCancel?: string | null
  icon?: ReactNode
}

const ConfirmContext = createContext<((props: ConfigType) => void) | null>(null)

export const useConfirm = (): ((props: ConfigType) => void) => {
  const confirm = useContext(ConfirmContext)
  if (!confirm) {
    throw new Error('useConfirm must be used within a ConfirmProvider')
  }

  return confirm
}

function ConfirmProvider(props: { children: ReactNode }) {
  const [config, setConfig] = useState<ConfigType>({
    title: null,
    content: null,
    color: null,
    confirmOk: 'Xác nhận',
    confirmCancel: 'Hủy bỏ',
    callbackOK: () => {},
    callBackClose: () => {}
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const confirm = useCallback((config: ConfigType) => {
    setConfig(config)
    setIsOpen(true)
  }, [])

  const handleClose = async () => {
    config?.callBackClose && (await config.callBackClose())
    return setIsOpen(false)
  }

  const handleConfirm = async () => {
    if (config?.callbackOK) {
      setIsLoading(true)
      try {
        await config.callbackOK()
      } catch (error) {
        console.error('Error during callback:', error)
      }
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {props.children}
      {isOpen && (
        <div className='relative z-[99999999] h-screen' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

          <div className='fixed inset-0 z-[99999] h-screen w-screen overflow-hidden'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <div className='relative flex min-h-[200px] transform flex-col justify-between overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <svg
                        className='h-6 w-6 text-red-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                        />
                      </svg>
                    </div>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <h3 className='text-base font-semibold leading-6 text-gray-900' id='modal-title'>
                        {config?.title}
                      </h3>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>{config?.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button
                    type='button'
                    className={cn(
                      'flex w-full min-w-28 items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto',
                      {
                        'hover:bg-red-500': !isLoading,
                        'opacity-50': isLoading
                      }
                    )}
                    disabled={isLoading}
                    onClick={handleConfirm}
                  >
                    {isLoading && (
                      <div role='status'>
                        <svg
                          aria-hidden='true'
                          className='h-3 w-3 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
                          viewBox='0 0 100 101'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                            fill='currentColor'
                          />
                          <path
                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                            fill='currentFill'
                          />
                        </svg>
                      </div>
                    )}
                    {isLoading || config?.confirmOk}
                  </button>
                  <button
                    type='button'
                    className={cn(
                      'mt-3 inline-flex w-full min-w-28 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0 sm:w-auto',
                      {
                        'hover:bg-gray-50': !isLoading,
                        'opacity-50': isLoading
                      }
                    )}
                    onClick={handleClose}
                    disabled={isLoading}
                  >
                    {config?.confirmCancel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  )
}

export default ConfirmProvider
