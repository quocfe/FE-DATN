import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: userApi.fetchAllUsers,
    staleTime: 5 * 60 * 1000
  })
}

export default useQueryUsers
