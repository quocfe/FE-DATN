import useQueryParams from '~/hooks/useQueryParams'

function useUserConfigParams() {
  const urlQueryParams = useQueryParams()

  const userConfigParams: UserConfigParams = {
    _page: urlQueryParams['_page'] || '1',
    _limit: urlQueryParams['_limit'] || '8'
  }

  return userConfigParams
}

export default useUserConfigParams
