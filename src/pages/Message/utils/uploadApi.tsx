import { useState } from 'react'
import axios from 'axios'

const useFileUpload = () => {
  const upload = async (file: File) => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default') // replace with your Cloudinary upload preset
    formData.append('folder', 'uploads')

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dilajt5zl/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log('response', response.data.url)
      return response.data.url
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      console.log('finally')
    }
  }

  return { upload }
}

export default useFileUpload
