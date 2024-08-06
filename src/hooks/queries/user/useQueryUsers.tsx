import { keepPreviousData, useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryUsers(userConfigParams: UserConfigParams = { _page: '1', _limit: '8' }) {
  return useQuery({
    queryKey: ['users', userConfigParams],
    queryFn: () => userApi.fetchAllUsers(userConfigParams),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000
  })
}

export default useQueryUsers
