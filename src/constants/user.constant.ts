export const USER = {
  LIST: 'user/list',
  PROFILE: 'user/profile',
  UPDATE: 'user/profile/update',
  FRIENDS: 'user/friends',
  RECEIVERD_FRIEND_REQUEST: 'user/list/received_friend_request',
  SENDER_FRIEND_REQUEST: 'user/sender_friend_request',
  CANCEL_FRIEND_REQUEST: 'user/friend/cancel_friend_request',
  BLOCKED_USER: 'user/friend/blocked_user',
  ACCEPT_FRIEND_REQUEST: 'user/friend/accept_friend_request'
} as const
