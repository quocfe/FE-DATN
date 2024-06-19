import { useState } from 'react'
import axios from 'axios'
import useFileUploadStore from '~/store/fileUpload.store'

const useFileUpload = () => {
  const { file: fileStore, setFile } = useFileUploadStore()
  const upload = async (file: File) => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default') // replace with your Cloudinary upload preset
    formData.append('folder', 'uploads')

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dilajt5zl/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress({ total, loaded }) {
          if (total) {
            fileStore.progress = Math.floor(loaded / total) * 100
            if (loaded == total) {
              fileStore.fileSize = total < 1024 ? total : loaded / (1024 * 1024)
            }
          }
          setFile(fileStore)
        }
      })
      console.log('response.data', response.data)
      fileStore.originalName = response.data.original_filename
      fileStore.resourceType = response.data.resource_type
      fileStore.url = response.data.url
      fileStore.height = response.data.height
      fileStore.width = response.data.width
      setFile(fileStore)
      return response.data
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      console.log('finally')
      fileStore.originalName = ''
      fileStore.resourceType = ''
      fileStore.url = ''
      fileStore.progress = 0
      setFile(fileStore)
    }
  }

  return { upload }
}

export default useFileUpload
