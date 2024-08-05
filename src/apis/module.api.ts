import { MODULE } from '~/constants/module.constant'
import http from '~/utils/http'

class moduleApi {
  getAllModules() {
    return http.get<ModuleResponse>(MODULE.LIST)
  }
}

export default new moduleApi()
