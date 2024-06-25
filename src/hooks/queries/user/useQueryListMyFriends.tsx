import { keepPreviousData, useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryListMyFriends(userConfigParams: UserConfigParams = { _page: '1', _limit: '8' }) {
  return useQuery({
    queryKey: ['my_friends', userConfigParams],
    queryFn: () => userApi.fetchAllMyFriends(userConfigParams),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000
  })
}

export default useQueryListMyFriends
