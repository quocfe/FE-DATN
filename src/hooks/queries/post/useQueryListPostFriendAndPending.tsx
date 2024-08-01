import { keepPreviousData, useQuery } from '@tanstack/react-query'
import postApi from '~/apis/post.api'

function useQueryPostsFromFriendsAndPendingRequests() {
  return useQuery({
    queryKey: ['posts_from_friends_and_pending_requests'],
    queryFn: () => postApi.getAllPostFriendAndPending(),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000
  })
}

export default useQueryPostsFromFriendsAndPendingRequests
