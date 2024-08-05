import http from '~/utils/http';
import { FANPAGE_MEMBER } from '~/constants/fanapge-member.constant';
import { FanpageMemberResponse } from '~/@types/fanpage-member';

class FanpageMemberApi {
  inviteMember(data: any) {
    return http.post<FanpageMemberResponse>(FANPAGE_MEMBER.INVITE, data);
  }

  leaveFanpage(fanpageId: any | string) {
    return http.post<FanpageMemberResponse>(`${FANPAGE_MEMBER.LEAVE}/${fanpageId}`);
  }

  followFanpage(fanpageId: any | string) {
    return http.post<FanpageMemberResponse>(`${FANPAGE_MEMBER.FOLLOW}/${fanpageId}`);
  }

  unfollowFanpage(fanpageId: any | string) {
    return http.post<FanpageMemberResponse>(`${FANPAGE_MEMBER.UNFOLLOW}/${fanpageId}`);
  }

  getFanpageMembers(fanpageId: any | string) {
    return http.get<FanpageMemberResponse>(`${FANPAGE_MEMBER.MEMBERS}/${fanpageId}`);
  }

  getAllFanpageMembers() {
    return http.get<FanpageMemberResponse>(FANPAGE_MEMBER.ALL_MEMBERS);
  }
}

export default new FanpageMemberApi();
