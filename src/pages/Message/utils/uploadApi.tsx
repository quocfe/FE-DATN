import axios, { AxiosProgressEvent } from 'axios'
import { toast } from 'react-toastify'
import useFileUploadStore from '~/store/fileUpload.store'

const useFileUpload = () => {
  const { file: fileStore, setFile } = useFileUploadStore()
  const upload = async (file: File) => {
    if (!file) return

    const maxSize = 10 * 1024 * 1024 // 10MB

    // const allowedMimeTypes = [
    //   'image/jpeg',
    //   'image/jpg',
    //   'image/png',
    //   'image/webp',
    //   'video/mp4',
    //   'video/mpeg',
    //   'video/webm',
    //   'audio/mp3',
    //   'audio/wav',
    //   'audio/ogg',
    //   'audio/webm',
    //   'application/pdf',
    //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    //   'application/vnd.ms-powerpoint',
    //   'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    //   'application/vnd.ms-excel',
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    // ]

    if (file.size > maxSize) {
      toast.error('Kích thước file không được vượt quá 10MB')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default')
    formData.append('folder', 'uploads')

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dilajt5zl/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress(progressEvent: AxiosProgressEvent) {
          if (progressEvent.total !== undefined) {
            fileStore.progress = Math.floor((progressEvent.loaded / progressEvent.total) * 100)
            if (progressEvent.loaded == progressEvent.total) {
              fileStore.fileSize =
                progressEvent.total < 1024 ? `${progressEvent.total}KB` : `${progressEvent.loaded / (1024 * 1024)}MB`
            }
            setFile(fileStore)
          }
          setFile(fileStore)
        }
      })

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

  const uploadRecordMessage = async (file: File) => {
    if (!file) return

    const allowedMimeTypes = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/webm']

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default')
    formData.append('folder', 'uploads')
    formData.append('resource_type', 'audio')

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dilajt5zl/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress(progressEvent: AxiosProgressEvent) {
          if (progressEvent.total !== undefined) {
            fileStore.progress = Math.floor((progressEvent.loaded / progressEvent.total) * 100)
            if (progressEvent.loaded == progressEvent.total) {
              fileStore.fileSize =
                progressEvent.total < 1024 ? `${progressEvent.total}KB` : `${progressEvent.loaded / (1024 * 1024)}MB`
            }
            setFile(fileStore)
          }
          setFile(fileStore)
        }
      })

      fileStore.originalName = response.data.original_filename
      fileStore.resourceType = response.data.resource_type
      fileStore.url = response.data.url

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

  const uploadNoPreview = async (file: File) => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default')
    formData.append('folder', 'uploads')

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dilajt5zl/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      console.log('finally')
    }
  }

  return { upload, uploadNoPreview, uploadRecordMessage }
}

export default useFileUpload
