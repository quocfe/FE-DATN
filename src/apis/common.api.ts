import http from '~/utils/http'

class CommonApi {
  searchAll(query: string) {
    return http.get<SearchAllResponse>(`search_all/${query}`)
  }
}

export default new CommonApi()
