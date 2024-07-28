/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonIcon } from '@ionic/react'
import { UseMutateFunction } from '@tanstack/react-query'
import React, { useMemo, useRef, useState } from 'react'
import SvgIcon from '~/helpers/SvgIcon'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'
import { reasonDenunciation } from './contants'

interface ModalReportProps {
  reportVideo: ResponseCheckReportVideo | undefined
  patchReportVideo: UseMutateFunction<SuccessResponse<PatchReportVideo>, Error, string[] | undefined, unknown>
}

interface ContentReport {
  index: number
  content: Array<string>
}

const ModalReport = ({ reportVideo, patchReportVideo }: ModalReportProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [contentReport, setContentReport] = useState<ContentReport>({
    index: 1,
    content: []
  })

  const ref = useRef<HTMLDivElement>(null)

  function closeModal() {
    document.documentElement.classList.remove('overflow-hidden')
    setContentReport({ index: 1, content: [] })
    setIsOpen(false)
  }

  useOnClickOutside(ref, () => {
    closeModal()
  })

  function openModal() {
    if (!reportVideo?.data.isReport) {
      document.documentElement.classList.add('overflow-hidden')
      setContentReport({ index: 1, content: [] })
      return setIsOpen(true)
    }

    return patchReportVideo([])
  }

  const { subText, title, titleSub } = useMemo(() => {
    if (contentReport.index === 1) {
      return {
        title: 'Tại sao bạn tố cáo video này?',
        titleSub:
          'Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm ngay sự giúp đỡ trước khi báo cáo với Facebook.',
        subText: reasonDenunciation.map((item) => item.title)
      }
    }
    if (contentReport.index === 2) {
      const reason = reasonDenunciation.find((item) => item.key === contentReport.index)
      return {
        title: reason?.titleSub,
        titleSub: null,
        subText: reason?.subText
      }
    }

    return {
      title: 'Bạn sắp gửi báo cáo',
      titleSub:
        'Chúng tôi chỉ gỡ nội dung vi phạm Tiêu chuẩn cộng đồng. Bạn có thể xem lại hoặc chỉnh sửa chi tiết báo cáo ở bên dưới.',
      subText: []
    }
  }, [contentReport])

  const handleSetResone = (text: string) => {
    if (contentReport.index === 1) {
      return setContentReport((prev) => ({
        index: prev.index + 1,
        content: [text]
      }))
    }

    if (contentReport.index === 2) {
      return setContentReport((prev) => ({
        index: prev.index + 1,
        content: [...prev.content, text]
      }))
    }
  }

  const handleBackReport = () => {
    return setContentReport({
      index: 1,
      content: []
    })
  }

  return (
    <React.Fragment>
      <button
        type='button'
        className='flex w-full items-center gap-x-2 rounded-lg px-2.5 py-2 hover:bg-slate-100'
        onClick={openModal}
      >
        <IonIcon className='text-xl' name='flag-outline' />
        <div className='flex flex-col items-start'>
          <span className='text-sm font-medium text-black'>
            {!reportVideo?.data.isReport ? 'Báo cáo video' : 'Bỏ báo cáo video'}
          </span>
          <span className='text-[12px] font-normal text-[#65676B]'>
            {!reportVideo?.data.isReport ? 'Tôi lo ngại về video này.' : ''}
          </span>
        </div>
      </button>
      {!reportVideo?.data.isReport && isOpen && (
        <div
          className='fixed left-0 top-0 z-[99999] flex h-full w-full items-center justify-center bg-[#f4f4f4cc]'
          style={{
            boxShadow:
              '0 12px 28px 0 rgba(0, 0, 0, 0.2),0 2px 4px 0 rgba(0, 0, 0, 0.1),inset 0 0 0 1px rgba(255, 255, 255, 0.5)'
          }}
        >
          <div ref={ref} className=' w-full rounded-lg bg-white shadow-xl md:w-[620px]'>
            <div className='px-2'>
              {/* Header Modal */}
              <div className='flex items-center justify-between border-b border-b-gray-100 px-4 py-3'>
                <div className=''>
                  {contentReport.index !== 1 && (
                    <div className='cursor-pointer' onClick={handleBackReport}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-6'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' />
                      </svg>
                    </div>
                  )}
                </div>

                <div className='text-xl font-bold text-black'>Tố cáo</div>
                <div className='cursor-pointer rounded-full bg-gray-100 px-2 py-2' onClick={closeModal}>
                  <SvgIcon name='close' />
                </div>
              </div>
              {/* Content Modal */}
              <div className='py-2 '>
                <div className='px-2'>
                  <h3 className='text-xl font-bold text-black'>{title}</h3>
                  <p className='text-sm text-gray-500'>{titleSub}</p>
                </div>
                <div className='mt-3 flex flex-col gap-y-2'>
                  {contentReport.index < 3 ? (
                    subText?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className='flex cursor-pointer items-center justify-between gap-x-3 rounded-lg px-2 py-1 hover:bg-slate-100'
                          onClick={() => handleSetResone(item)}
                        >
                          <div className='flex-1 text-base font-medium text-black'>{item}</div>
                          <div className='rounded-full bg-gray-100 p-2'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='size-5'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                              />
                            </svg>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className='flex flex-col gap-y-2'>
                      <div className='flex w-full items-center justify-between'>
                        <p className='text-base font-bold'>Chi tiết báo cáo</p>
                        <button
                          className='rounded-lg px-3 py-2 font-medium text-blue-500 hover:bg-blue-100'
                          onClick={handleBackReport}
                        >
                          Chỉnh sửa
                        </button>
                      </div>
                      <div className='flex flex-col gap-y-3'>
                        {contentReport.content.map((item, index) => {
                          return (
                            <div className='rounded-lg bg-[#F0F2F5] px-3 py-4' key={index}>
                              <p className='text-base font-semibold text-black'>{item}</p>
                            </div>
                          )
                        })}
                        <div className='border-t-[rgba(0, 0, 0, 0.1)] mt-3 border-t pt-5'>
                          <button
                            className='w-full rounded-lg bg-blue-500 py-2 font-medium text-white hover:bg-blue-600'
                            onClick={() => {
                              patchReportVideo(contentReport.content as any)
                              closeModal()
                            }}
                          >
                            Gửi
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default ModalReport
