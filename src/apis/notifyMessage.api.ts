import { NOTIFY_MESSAGE } from '~/constants/notifyMessage.constant'
import http from '~/utils/http'

class NotifyMessageApi {
  getAllNotify() {
    return http.get<any>(`${NOTIFY_MESSAGE.GET_ALL}`, { withCredentials: true })
  }
  deleteNotify(id: string) {
    return http.delete<any>(`${NOTIFY_MESSAGE.DELETE}/${id}`, { withCredentials: true })
  }
}

export default new NotifyMessageApi()
