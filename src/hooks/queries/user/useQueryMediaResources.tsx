import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryMediaResources() {
  return useQuery({
    queryKey: ['my_media_resources'],
    queryFn: userApi.getAllMediaResource,
    staleTime: 1 * 60 * 1000
  })
}

export default useQueryMediaResources
