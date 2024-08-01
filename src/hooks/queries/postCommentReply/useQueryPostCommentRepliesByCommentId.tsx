import { keepPreviousData, useQuery } from '@tanstack/react-query'
import postCommentReplyApi from '~/apis/postCommentReply.api'

function useQueryPostCommentRepliesByCommentId(comment_id: string) {
  return useQuery({
    queryKey: ['post_comment_replies', { comment_id }],
    queryFn: () => postCommentReplyApi.getAllPostCommentReplies(comment_id),
    placeholderData: keepPreviousData,
    enabled: comment_id !== null
  })
}

export default useQueryPostCommentRepliesByCommentId
