import { IonIcon } from '@ionic/react'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import useMutationAddPostComment from '~/hooks/mutations/postComment/useMutationAddPostComment'
import useMutationUpdatePostComment from '~/hooks/mutations/postComment/useMutationUpdatePostComment'
import useMutationAddPostCommentReply from '~/hooks/mutations/postCommentReply/useMutationAddPostCommentReply'
import useAuthStore from '~/store/auth.store'

interface Props {
  post_id: string
  isCommentDetail?: boolean
  editComment: PostComment | null
  replyPostComment: PostComment | null
  replyPostCommentReply: PostCommentReply | null
  setEditComment: React.Dispatch<React.SetStateAction<PostComment | null>>
  setReplyPostComment: React.Dispatch<React.SetStateAction<PostComment | null>>
  setReplyPostCommentReply: React.Dispatch<React.SetStateAction<PostCommentReply | null>>
}

function PostAddComment({
  post_id,
  isCommentDetail = false,
  editComment,
  setEditComment,
  replyPostComment,
  setReplyPostComment,
  replyPostCommentReply,
  setReplyPostCommentReply
}: Props) {
  const [content, setContent] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { profile } = useAuthStore()
  const inputMediaRef = useRef<HTMLInputElement | null>(null)

  // React Query
  const addPostCommentMutation = useMutationAddPostComment()
  const addPostCommentReplyMutation = useMutationAddPostCommentReply()
  const updatePostCommentMutation = useMutationUpdatePostComment()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (replyPostComment) {
      setContent(`@ ${replyPostComment.user_comment.last_name} ${replyPostComment.user_comment.first_name} `)
    }
    if (replyPostCommentReply) {
      setContent(`@ ${replyPostCommentReply.user_reply.last_name} ${replyPostCommentReply.user_reply.first_name} `)
    }
    if (editComment) {
      setContent(editComment.content)
    }
  }, [editComment, replyPostComment, replyPostCommentReply])

  // Xử lý bình luận
  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    if (content || selectedFile) {
      if (selectedFile) {
        formData.append('media', selectedFile)
      }
      formData.append('content', content)
    } else {
      alert('Comment trống!')
      return
    }

    if (editComment) {
      const data = {
        comment_id: editComment.comment_id,
        formData
      }
      updatePostCommentMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['post_comments', { post_id }] })
          setContent('')
          setEditComment(null)
          setSelectedFile(null)
        }
      })
    } else if (replyPostComment) {
      const replied_to_user_id = replyPostComment.user_id
      formData.append('replied_to_user_id', replied_to_user_id)

      const fullname = `@ ${replyPostComment.user_comment.last_name} ${replyPostComment.user_comment.first_name}`

      const newContent = content.replace(fullname, '')

      formData.delete('content')
      formData.append('content', newContent)

      const data = {
        comment_id: replyPostComment.comment_id,
        formData
      }

      addPostCommentReplyMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['post_comment_replies', { comment_id: replyPostComment.comment_id }]
          })
          setContent('')
          setSelectedFile(null)
          setReplyPostComment(null)
        }
      })
    } else if (replyPostCommentReply) {
      const replied_to_user_id = replyPostCommentReply.user_id
      formData.append('replied_to_user_id', replied_to_user_id)

      const fullname = `@ ${replyPostCommentReply.user_reply.last_name} ${replyPostCommentReply.user_reply.first_name}`

      const newContent = content.replace(fullname, '')

      formData.delete('content')
      formData.append('content', newContent)

      const data = {
        comment_id: replyPostCommentReply.comment_id,
        formData
      }

      addPostCommentReplyMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['post_comment_replies', { comment_id: replyPostCommentReply.comment_id }]
          })
          setContent('')
          setSelectedFile(null)
          setReplyPostComment(null)
        }
      })
    } else {
      const data = {
        post_id,
        formData
      }

      addPostCommentMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['post_comments', { post_id }] })
          setContent('')
          setSelectedFile(null)
        }
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const FilePreview = ({ file }: { file: File }) => {
    // Kiểm tra xem file có phải là video không
    const isVideo = file.type.startsWith('video/')

    // Nếu là video, sử dụng thẻ <video> để xem trước
    if (isVideo) {
      return (
        <div className='file-display relative h-36 w-[250px]'>
          <video
            className='h-full w-full rounded-md object-cover'
            src={URL.createObjectURL(file)}
            controls // Thêm điều khiển để người dùng có thể chạy video
          />
          <IonIcon
            icon='close-circle-outline'
            className='absolute -right-4 -top-4 z-20 cursor-pointer text-2xl '
            onClick={() => setSelectedFile(null)}
          ></IonIcon>
        </div>
      )
    }

    // Nếu là ảnh, sử dụng thẻ <img>
    return (
      <div
        className={classNames('file-display relative h-28 w-[200px]', {
          'h-[135px] w-[225px]': isCommentDetail === true
        })}
      >
        <img className='h-full w-full rounded-md object-cover' src={URL.createObjectURL(file)} alt='Selected' />
        <button
          onClick={() => setSelectedFile(null)}
          className='absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-md bg-primary text-white'
        >
          <IonIcon name='close-outline' className='text-xl'></IonIcon>
        </button>
      </div>
    )
  }

  return (
    <>
      <div
        className={classNames('', {
          'absolute bottom-0 w-full': isCommentDetail === true
        })}
      >
        {selectedFile && <FilePreview file={selectedFile} />}
        <form
          onSubmit={handleSubmitComment}
          className={classNames(
            'flex w-full items-center gap-1 border-t border-gray-100 bg-white p-2.5 sm:px-4 sm:py-3 dark:border-slate-700/40',
            {}
          )}
        >
          <img src={profile?.Profile.profile_picture} alt='' className='h-6 w-6 rounded-full object-cover' />
          <div className='relative h-10 flex-1 overflow-hidden'>
            <input
              type='text'
              className='w-full !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent'
              placeholder='Nội dung bình luận ...'
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <div className='!top-2 pr-2' uk-drop='pos: bottom-right; mode: click'>
              <div
                className='flex items-center gap-2'
                uk-scrollspy='target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true'
              >
                <a className='cursor-pointer' onClick={() => inputMediaRef.current?.click()}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-6 w-6 fill-sky-600'
                  >
                    <path
                      fillRule='evenodd'
                      d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
                <input type='file' hidden ref={inputMediaRef} onChange={handleFileChange} />
              </div>
            </div>
          </div>
          {editComment ? (
            <>
              <button
                onClick={() => {
                  setContent('')
                  if (editComment) {
                    setEditComment(null)
                  }
                  if (replyPostComment) {
                    setReplyPostComment(null)
                  }
                }}
                type='button'
                className='rounded-full bg-secondery px-3.5 py-1.5 text-sm'
              >
                Thoát
              </button>
              <button type='submit' className='rounded-full bg-secondery px-3.5 py-1.5 text-sm'>
                Cập nhật
              </button>
            </>
          ) : replyPostComment ? (
            <>
              <button
                onClick={() => {
                  setContent('')
                  if (editComment) {
                    setEditComment(null)
                  }
                  if (replyPostComment) {
                    setReplyPostComment(null)
                  }
                }}
                type='button'
                className='rounded-full bg-secondery px-3.5 py-1.5 text-sm'
              >
                Thoát
              </button>
              <button type='submit' className='rounded-full bg-secondery px-3.5 py-1.5 text-sm'>
                Trả lời
              </button>
            </>
          ) : replyPostCommentReply ? (
            <>
              <button
                onClick={() => {
                  setContent('')
                  if (editComment) {
                    setEditComment(null)
                  }
                  if (replyPostCommentReply) {
                    setReplyPostCommentReply(null)
                  }
                }}
                type='button'
                className='rounded-full bg-secondery px-3.5 py-1.5 text-sm'
              >
                Thoát
              </button>
              <button type='submit' className='rounded-full bg-secondery px-3.5 py-1.5 text-sm'>
                Trả lời
              </button>
            </>
          ) : (
            <button type='submit' className='rounded-full bg-secondery px-3.5 py-1.5 text-sm'>
              Bình luận
            </button>
          )}
        </form>
      </div>
    </>
  )
}

export default PostAddComment
