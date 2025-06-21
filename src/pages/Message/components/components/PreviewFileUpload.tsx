import { memo, useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import useFileUploadStore from '~/store/fileUpload.store'
import useConversationStore from '~/store/conversation.store'
import ProgressBar from '@ramonak/react-progress-bar'
import { IonIcon } from '@ionic/react'

function PreviewFileUpload() {
  const { file: fileStore } = useFileUploadStore()
  const { setPreviewImg, previewImg } = useConversationStore()

  const [objectURL, setObjectURL] = useState('')
  useEffect(() => {
    if (previewImg) {
      const url = URL?.createObjectURL(previewImg)
      setObjectURL(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [previewImg])

  return (
    fileStore.progress > 0 && (
      <div className='mt-5 flex justify-end '>
        <div className='relative max-w-[70%]'>
          {previewImg?.type?.includes('video') && (
            <div className='h-[80px] w-[180px]'>
              <video src={objectURL} className='absolute  aspect-video  rounded-[14px] object-cover opacity-20' />
              <div className='inset-center' style={{ width: 50, height: 50 }}>
                <CircularProgressbar value={fileStore?.progress} />
              </div>
            </div>
          )}
          {previewImg?.type?.includes('image') && (
            <div className='h-[80px] w-[180px]'>
              <img src={objectURL} className='absolute aspect-video rounded-[14px] object-fill opacity-50' />
              <div className='inset-center' style={{ width: 50, height: 50 }}>
                <CircularProgressbar value={fileStore?.progress} />
              </div>
            </div>
          )}
          {previewImg?.type?.includes('application') && (
            <div className='group flex cursor-pointer flex-col gap-2  rounded-[14px] border-[2px] border-transparent bg-[#0084ff] px-4 py-2  text-left text-white shadow'>
              <div className='flex items-center gap-2'>
                <IonIcon icon='document' className='h-5 w-5 flex-shrink-0' />
                <p className='text-sm '>{previewImg.path}</p>
              </div>
              <ProgressBar
                height='10px'
                labelSize='8px'
                labelAlignment='outside'
                bgColor='#78b5ea'
                baseBgColor='#E4F1FC'
                completed={fileStore?.progress}
              />
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default memo(PreviewFileUpload)
