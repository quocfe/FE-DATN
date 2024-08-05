import { ROLE } from '~/constants/role.constant'
import http from '~/utils/http'

class roleApi {
  addNewRole(role: { name: string; description: string }) {
    return http.post(ROLE.ADD, role)
  }

  getAllRoles() {
    return http.get<RoleResponse>(ROLE.LIST)
  }

  deleteRole(role_id: string) {
    return http.delete(`${ROLE.DELETE}/${role_id}`)
  }
}

export default new roleApi()
