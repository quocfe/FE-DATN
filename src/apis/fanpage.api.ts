import http from '~/utils/http';
import { FANPAGE } from '~/constants/fanapge.constant';
import { FanpageResponse, FanpageNoId } from '~/@types/fanpage';

class FanpageApi {
  fetchAllFanpages() {
    return http.get<FanpageResponse>(FANPAGE.LIST);
  }

  createFanpage(fanpage: FanpageNoId) {
    return http.post<FanpageResponse>(FANPAGE.CREATE, fanpage);
  }

  deleteFanpage(id: number | string) {
    return http.delete<FanpageResponse>(`${FANPAGE.DELETE}/${id}`);
  }

  updateFanpage(id: number | string, fanpage: FanpageNoId) {
    return http.put<FanpageResponse>(`${FANPAGE.UPDATE}/${id}`, fanpage);
  }

  getFanpageDetail(id: any) {
    return http.get<any>(`${FANPAGE.DETAIL}/${id}`);
  }

  getFanpagesByUserId(userId: number | string) {
    return http.get<FanpageResponse>(`${FANPAGE.USER}/${userId}`);
  }
}

export default new FanpageApi();
