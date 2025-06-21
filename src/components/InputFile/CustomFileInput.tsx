// CustomFileInput.tsx

import { IonIcon } from '@ionic/react'
import axios from 'axios'
import { head } from 'lodash'
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import useConversationStore from '~/store/conversation.store'
import errorImg from '../../../public/false.webp'
import { toast } from 'react-toastify'

type CustomFileInputProps = {
  iconName?: string
  setFile: (file: any) => void
  file: File | null
  setPreview?: React.Dispatch<{}> | undefined
  preview?: string | null
  type: number
  children?: React.ReactNode
  messageFixes?: boolean
  group_id?: string
  setIsDragAccept?: React.Dispatch<boolean> | undefined
}

// type = 1 (có xem trước)
// type = 2 (ko xem trước)
// type = 3 (drop zone)

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  iconName,
  setFile,
  type,
  setPreview,
  children,
  messageFixes,
  group_id,
  setIsDragAccept
}) => {
  const [previewInner, setPreviewInner] = useState<string | null>(null)
  // const [isDragAccept, setIsDragAccept] = useState<boolean>(false)
  const [errors, setErrors] = useState<boolean>(false)
  const { setTogglePreviewBox, setTogglePreviewBoxFix, setPreviewImg, setCheckDropAttach } = useConversationStore()
  if (type === 1) {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles, fileRejections) => {
        if (fileRejections.length > 0) {
          console.log('false')
          setErrors(true)
          toast.error('Ảnh không được quá 10mb')
          setFile(null)
        }
        const file = acceptedFiles[0]
        if (file) {
          setErrors(false)
          setFile(file)
        }
        const src = file ? URL?.createObjectURL(file) : errorImg
        setPreviewInner(src)
        if (typeof setPreview === 'function') {
          setPreview(URL.createObjectURL(file))
        }
      },
      maxSize: 10 * 1024 * 1024,
      multiple: false,
      accept: {
        'image/png': ['.png', '.jpg', '.jpeg', '.webp']
      }
    })
    return (
      <label
        {...getRootProps()}
        htmlFor='fileInput'
        className={`flex cursor-pointer  items-center rounded-full border border-dashed ${errors ? 'border-red-400 ' : 'border-gray-300 bg-gray-50'} ${!previewInner ? 'gap-3 p-4' : ''} `}
      >
        {previewInner ? (
          <div>
            <img
              src={previewInner}
              alt='Selected'
              className='h-14 w-16 shrink-0 overflow-hidden rounded-full object-cover'
            />
          </div>
        ) : (
          <IonIcon icon={iconName} />
        )}
        <input {...getInputProps()} className='hidden' />
      </label>
    )
  }
  if (type === 2) {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0]
        setFile(file)
        console.log('2')
        if (typeof setPreview === 'function') {
          setPreview({ file: file, group_id: group_id })
        }
      },
      multiple: false,
      accept: {
        'image/png': ['.png', '.jpg', '.jpeg', '.webp'],
        'video/mp4': ['.mp4', '.mpeg', '.webm'],
        'audio/mp3': ['.mp3'],
        'text/plain': ['.txt'],
        'application/pdf': ['.pdf'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx', '.doc'],
        'application/msword': ['.doc'],
        'application/vnd.ms-powerpoint': ['.ppt', '.pot', '.pps', '.ppa'],
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx', '.potx', '.ppsx'],
        'application/vnd.ms-excel': ['.xls', '.xlt', '.xla'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', '.xltx']
      }
    })
    return (
      <button
        type='button'
        {...getRootProps()}
        className={`dark:bg-dark3 shrink-0 rounded-full  ${messageFixes ? '' : 'border border-sky-100 bg-sky-50 p-1.5 shadow-sm '}  text-sky-600 duration-100 hover:scale-[1.15] dark:border-0`}
      >
        <IonIcon className={`flex  ${messageFixes ? 'text-xl' : 'text-2xl'}`} icon={iconName} />
        <input {...getInputProps()} className='hidden' />
      </button>
    )
  }
  if (type === 3) {
    const { getRootProps, getInputProps, isDragAccept } = useDropzone({
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0]
        // setTogglePreviewBox(true)
        setFile(file)
        if (typeof setIsDragAccept === 'function') {
          setIsDragAccept(true)
          setPreviewImg(file)
        }

        // if (typeof setPreview === 'function') {
        //   setPreview({ file: file, group_id: group_id })
        // }
      },
      multiple: false,
      onDragEnter: () => {
        // if (typeof setIsDragAccept === 'function') {
        //   setIsDragAccept(true)
        // }
      },
      onDragLeave: () => {
        // if (typeof setIsDragAccept === 'function') {
        //   setIsDragAccept(false)
        // }
      },
      noClick: true
    })

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} className='hidden' />
        <div className='relative h-full w-full'>
          {isDragAccept && (
            <div className='absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-75'>
              <p className='text-lg text-white'>Thả tệp tại đây</p>
            </div>
          )}
          {children}
        </div>
      </div>
    )
  }
}

export default CustomFileInput
