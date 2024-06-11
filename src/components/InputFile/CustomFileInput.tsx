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
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ iconName, setFile }) => {
  const [preview, setPreview] = useState<string | null>(null)

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      setFile(file)
      setPreview(URL.createObjectURL(file))
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
      {preview ? (
        <div>
          <img src={preview} alt='Selected' className='h-14 w-16 shrink-0 overflow-hidden rounded-full object-cover' />
        </div>
      ) : (
        <IonIcon icon={iconName} />
      )}
      <input {...getInputProps()} className='hidden' />
    </label>
  )
}

export default CustomFileInput
