import { PERMISSION } from '~/constants/permission.constant'
import http from '~/utils/http'

class permissionApi {
  getAllPermissions() {
    return http.get<PermissionReponse>(PERMISSION.LIST)
  }
}

export default new permissionApi()
