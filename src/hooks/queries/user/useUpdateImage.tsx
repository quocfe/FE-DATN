import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import useMutationUpdateProfile from '~/pages/Profile/hooks/useMutationUpdateProfile'
import useAuthStore from '~/store/auth.store'

const useUpdateImage = () => {
  const { setProfile } = useAuthStore()
  const updateProfileMutation = useMutationUpdateProfile()

  const updateImage = (type: 'profile_picture' | 'cover_photo', file: File) => {
    const formData = new FormData()
    formData.append(type, file)

    updateProfileMutation.mutate(formData, {
      onSuccess: (data) => {
        const userProfile = data.data.data.user
        setProfile(userProfile)
        localStorage.setItem('profile', JSON.stringify(userProfile))
        toast.success(`Cập nhật ${type === 'profile_picture' ? 'ảnh đại diện' : 'ảnh bìa'} thành công!`)
      },
      onError: (error) => {
        if (isAxiosError<ErrorResponse>(error)) {
          if (error.response) {
            const formError = error.response.data
            toast.error(formError.message)
          }
        }
      }
    })
  }

  return { updateImage }
}

export default useUpdateImage
