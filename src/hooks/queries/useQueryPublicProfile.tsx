import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryPublicProfile(user_id: string) {
  return useQuery({
    queryKey: ['public_profile', { user_id }],
    queryFn: () => userApi.fetchPublicProfile(user_id),
    staleTime: 30 * 60 * 1000
  })
}

export default useQueryPublicProfile
