import { useQuery } from '@tanstack/react-query'
import accountApi from '~/apis/account.api'

function useQueryListAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: accountApi.getAllAccounts
  })
}

export default useQueryListAccounts
