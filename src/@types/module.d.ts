type Module = {
  module_id: string
  name: string
}

type ModuleResponse = SuccessResponse<{
  modules: Module[]
}>

type ModulePermission = {
  module_id: string
  name: string
  permissions: Permission[]
}
