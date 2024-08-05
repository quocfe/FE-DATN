type Permission = {
  permission_id: string
  name: string
  display_name: string
}

type PermissionReponse = SuccessResponse<{
  permissions: Permission[]
}>
