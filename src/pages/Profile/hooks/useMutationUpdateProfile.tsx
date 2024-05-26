import { useMutation } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useMutationUpdateProfile() {
  return useMutation({
    mutationFn: (profile: UpdateProfile) => userApi.updateProfile(profile)
  })
}

export default useMutationUpdateProfile
