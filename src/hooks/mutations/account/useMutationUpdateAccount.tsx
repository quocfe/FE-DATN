import { useMutation } from '@tanstack/react-query'
import accountApi from '~/apis/account.api'

function useMutationUpdateAccount() {
  return useMutation({
    mutationFn: (data: { account_id: string; account: AccountUpdate }) => accountApi.updateAccount(data)
  })
}

export default useMutationUpdateAccount
