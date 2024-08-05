import { toast } from 'react-toastify'
import useFileUploadStore from '~/store/fileUpload.store'

const useFileUpload = () => {
  const uploadStory = async (file: File) => {
    if (!file) return

    const maxSize = 20 * 1024 * 1024 // 20MB

    if (file.size > maxSize) {
      toast.error('Kích thước file không được vượt quá 20MB')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default')
    formData.append('folder', 'uploads')

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dfb778pls/upload', {
        method: 'POST',
        body: formData,
      
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error('Error uploading file')
    } finally {
      console.log('finally')
    }
  }

  return { uploadStory }
}
export default useFileUpload
