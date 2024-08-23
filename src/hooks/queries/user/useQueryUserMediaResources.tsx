import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryUserMediaResources(user_id: string) {
  return useQuery({
    queryKey: ['media_resources', { user_id }],
    queryFn: () => userApi.getAllUserMediaResource(user_id),
    staleTime: 1 * 60 * 1000
  })
}

export default useQueryUserMediaResources
