// CustomFileInput.tsx

import { IonIcon } from '@ionic/react'
import React, { useState } from 'react'

type CustomFileInputProps = {
  iconName: string
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ iconName }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setSelectedFile(file)
  }

  const handleFileInputClick = () => {
    const inputElement = document.getElementById('fileInput') as HTMLInputElement
    inputElement.click()
  }

  return (
    <label
      htmlFor='fileInput'
      className='flex cursor-pointer items-center gap-3 rounded-full border border-dashed border-gray-300 bg-gray-50 p-4'
      onClick={handleFileInputClick}
    >
      <IonIcon icon={iconName} />
      <input type='file' id='fileInput' name='doc' accept='.png, .jpg' onChange={handleFileChange} className='hidden' />
    </label>
  )
}

export default CustomFileInput
