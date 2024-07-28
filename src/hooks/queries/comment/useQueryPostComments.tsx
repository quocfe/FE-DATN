import { useQuery } from '@tanstack/react-query'
import postCommentApi from '~/apis/postComment.api'

function useQueryPostComments(post_id: string) {
  return useQuery({
    queryKey: ['post_comments', { post_id }],
    queryFn: () => postCommentApi.getAllPostComments(post_id),
    staleTime: 5 * 60 * 1000
  })
}

export default useQueryPostComments
