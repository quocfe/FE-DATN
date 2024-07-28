import { calculateTimeAgo } from '~/utils/helpers'

interface Props {
  comment_reply: PostCommentReply
}

function PostCommentReplyItem({ comment_reply }: Props) {
  const { user_reply, replied_to_user } = comment_reply
  return (
    <div className='relative flex items-start gap-3'>
      <a href='timeline.html'>
        <img
          src={user_reply.Profile.profile_picture}
          alt=''
          className='mt-1 h-6 w-6 rounded-full object-cover object-center'
        />
      </a>
      <div>
        <div className='rounded-md px-3 py-2 shadow-sm' style={{ backgroundColor: 'rgb(250 250 250)' }}>
          <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
            {user_reply.last_name} {user_reply.first_name}
          </a>
          <div>
            <p className='mt-0.5'>
              <span className='font-medium text-primary'>
                @{replied_to_user.last_name} {replied_to_user.first_name}
              </span>{' '}
              {comment_reply.content}
            </p>
            {comment_reply.media_url !== '' && (
              <div className='mt-1.5 w-[300px] cursor-pointer overflow-hidden rounded-md shadow-sm'>
                {comment_reply.media_url && comment_reply.media_url !== '' && (
                  <>
                    {comment_reply.media_url.includes('mp4') ? (
                      <video src={comment_reply.media_url} className='w-full object-cover' controls></video>
                    ) : (
                      <img src={comment_reply.media_url} alt='' className='h-full w-full object-cover' />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='mt-2 flex gap-3'>
          <div className='cursor-pointer'>{calculateTimeAgo(comment_reply.createdAt)}</div>
          <div className='cursor-pointer'>Thích</div>
          <div className='cursor-pointer'>Phản hồi</div>
        </div>
      </div>
    </div>
  )
}

export default PostCommentReplyItem
