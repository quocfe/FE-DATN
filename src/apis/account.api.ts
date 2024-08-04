import { ACCOUNT } from '~/constants/account.constant'
import http from '~/utils/http'

class accountApi {
  getAllAccounts() {
    return http.get<AccountResponse>(ACCOUNT.LIST)
  }

  updateAccount(data: { account_id: string; account: AccountUpdate }) {
    return http.post(`${ACCOUNT.UPDATE}/${data.account_id}`, data.account)
  }
}

export default new accountApi()
