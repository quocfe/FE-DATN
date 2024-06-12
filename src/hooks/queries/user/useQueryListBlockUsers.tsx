import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryListBlockUsers() {
  return useQuery({
    queryKey: ['list_blocks'],
    queryFn: userApi.fetchAllBlockUsers
  })
}

export default useQueryListBlockUsers
