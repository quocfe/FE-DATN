// CustomFileInput.tsx

import { IonIcon } from '@ionic/react'
import axios from 'axios'
import { head } from 'lodash'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type CustomFileInputProps = {
  iconName: string
  setFile: (file: any) => void
  file: File | null
  setPreview?: (preview: any | null) => void
  preview?: string | null
  type: number
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ iconName, setFile, type, setPreview, preview }) => {
  const [previewInner, setPreviewInner] = useState<string | null>(null)

  if (type === 1) {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0]
        setFile(file)
        setPreviewInner(URL.createObjectURL(file))
        if (typeof setPreview === 'function') {
          setPreview(URL.createObjectURL(file))
        }
      },
      accept: {
        'image/png': ['.png', '.jpg', '.jpeg', '.webp']
      }
    })
    return (
      <label
        {...getRootProps()}
        htmlFor='fileInput'
        className={`flex cursor-pointer  items-center rounded-full border border-dashed border-gray-300 bg-gray-50 ${!preview ? 'gap-3 p-4' : ''} `}
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
        if (typeof setPreview === 'function') {
          setPreview(file)
        }
      },
      accept: {
        'image/png': ['.png', '.jpg', '.jpeg', '.webp'],
        'video/mp4': ['.mp4', '.mpeg', '.webm'],
        'audio/mp3': ['.mp3'],
        'text/plain': ['.txt'],
        'application/pdf': ['.pdf']
        // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx, .doc'],
        // 'application/vnd.ms-powerpoint': ['.ppt'],
        // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx, .xls'],
        // 'application/vnd.ms-excel': ['.xlsx, .xls']
      }
    })
    return (
      <button
        type='button'
        {...getRootProps()}
        className='dark:bg-dark3 shrink-0 rounded-full border border-sky-100 bg-sky-50 p-1.5 text-sky-600 shadow-sm duration-100 hover:scale-[1.15] dark:border-0'
      >
        <IonIcon className='flex text-2xl' icon='image' />
        <input {...getInputProps()} className='hidden' />
      </button>
    )
  }
}

export default CustomFileInput
