import { memo, useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import useFileUploadStore from '~/store/fileUpload.store'
import useConversationStore from '~/store/conversation.store'

function PreviewFileUpload() {
  const { file: fileStore } = useFileUploadStore()
  const { previewImg } = useConversationStore()
  const [objectURL, setObjectURL] = useState('')

  useEffect(() => {
    if (previewImg) {
      const url = URL.createObjectURL(previewImg)
      setObjectURL(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [previewImg])

  return (
    fileStore.progress > 0 && (
      <div className='flex justify-end '>
        <div className='relative h-40 w-40 '>
          {previewImg?.type.includes('video') ? (
            <video src={objectURL} className='absolute  h-full w-full rounded-[14px] object-cover opacity-20' />
          ) : (
            <img src={objectURL} className='absolute h-full w-full rounded-[14px] object-cover opacity-20' />
          )}

          <div className='inset-center' style={{ width: 50, height: 50 }}>
            <CircularProgressbar value={fileStore?.progress} />
          </div>
        </div>
      </div>
    )
  )
}

export default memo(PreviewFileUpload)
