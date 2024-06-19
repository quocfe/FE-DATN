import Comment from './component/comment'
import { useQuery } from '@tanstack/react-query'
import commentVideoApi from '~/apis/comment-video.api'
import { useParams } from 'react-router-dom'

interface CommentVideoProps {
  refetchCommentVideo: boolean
}

const CommentVideo = ({ refetchCommentVideo }: CommentVideoProps) => {
  const { id: video_id } = useParams()

  const {
    data: commentVideo,
    refetch: refetchComment,
    isLoading
  } = useQuery({
    queryKey: ['getCommentVideoItem', refetchCommentVideo],
    queryFn: async () => {
      const res = await commentVideoApi.getCommentVideoItem(video_id as string)
      return res.data.data
    }
  })

  return (
    <div className='relative '>
      {!isLoading &&
        commentVideo?.map((item) => {
          return (
            <div key={item.id}>
              <div className=''>
                <Comment comment={item} refetchComment={refetchComment} />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default CommentVideo
