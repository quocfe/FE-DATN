import { IonIcon } from '@ionic/react'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import Modal from '~/components/Modal'
import useMutationCancelPostReaction from '~/hooks/mutations/post/useMutationCancelPostReaction'
import useMutationCreateReaction from '~/hooks/mutations/post/useMutationCreateReaction'
import useMutationUpdatePostReaction from '~/hooks/mutations/post/useMutationUpdatePostReaction'
import PostDetailReaction from './PostDetailReaction'
import { useState } from 'react'
import PostCommentDetail from './PostCommentDetail'

interface Props {
  reactions: PostReaction[]
  commentCount: string | number
  hasReacted: boolean
  userReactionType: string | null
  post_id: string
}

const reactionIcons: { [key: string]: string } = {
  like: '/src/assets/images/post/like.svg',
  love: '/src/assets/images/post/love.svg',
  haha: '/src/assets/images/post/haha.svg',
  wow: '/src/assets/images/post/wow.svg',
  sad: '/src/assets/images/post/sad.svg',
  angry: '/src/assets/images/post/angry.svg'
}

function PostIcon({ post_id, reactions, commentCount, hasReacted, userReactionType }: Props) {
  const { user_id } = useParams()
  const [isShowDetailReaction, setIsShowDetailReaction] = useState<boolean>(false)
  const [isShowDetailComment, setIsShowDetailComment] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const createPostReactionMutation = useMutationCreateReaction()
  const cancelPostReactionMutation = useMutationCancelPostReaction()
  const updatePostReactionMutation = useMutationUpdatePostReaction()

  // Hủy bỏ tương tác
  const handleCancelReaction = () => {
    cancelPostReactionMutation.mutate(post_id, {
      onSuccess: () => {
        if (user_id) {
          queryClient.invalidateQueries({ queryKey: ['user_posts', { user_id }] })
        } else {
          queryClient.invalidateQueries({ queryKey: ['my_posts'] })
        }
        queryClient.invalidateQueries({ queryKey: ['posts_from_friends_and_pending_requests'] })
      }
    })
  }

  const getReactionDisplayInfo = () => {
    const reactionTextMap: { [key: string]: string } = {
      like: 'Thích ',
      love: 'Yêu thích ',
      haha: 'Haha ',
      wow: 'Wow ',
      sad: 'Buồn ',
      angry: 'Phẫn nộ '
    }

    const reactionColorMap: { [key: string]: string } = {
      like: 'rgb(8, 102, 255)',
      love: 'rgb(243, 62, 88)',
      haha: 'rgb(247, 177, 37)',
      wow: 'rgb(247, 177, 37)',
      sad: 'rgb(233, 113, 15)',
      angry: 'rgb(233, 113, 15)'
    }

    return {
      displayText: reactionTextMap[userReactionType || ''] || '',
      displayColor: reactionColorMap[userReactionType || ''] || 'black'
    }
  }

  const { displayText, displayColor } = getReactionDisplayInfo()

  const renderReactionButton = () => {
    if (hasReacted && userReactionType) {
      return (
        <div className='flex items-center gap-2' onClick={handleCancelReaction}>
          <div className='h-[19px] w-[19px]'>
            <img src={reactionIcons[userReactionType]} className='h-full w-full object-cover' alt='' />
          </div>
          <a href='#!' style={{ color: displayColor }}>
            {displayText}
          </a>
        </div>
      )
    } else {
      return (
        <button type='button' className='flex items-center gap-2' onClick={handleProcessLike}>
          <div className='h-[19px] w-[19px]'>
            <img src={reactionIcons['like']} className='h-full w-full object-cover' alt='' />
          </div>
          Thích
        </button>
      )
    }
  }

  // Tương tác mặc định like bài đăng
  const handleProcessLike = () => {
    handleCreateOrUpdateInteraction(post_id, 'like')
  }

  // tạo mới hoặc cập nhật tương tác
  const handleCreateOrUpdateInteraction = (post_id: string, type: string) => {
    if (!hasReacted) {
      createPostReactionMutation.mutate(
        { post_id, type },
        {
          onSuccess: () => {
            if (user_id) {
              queryClient.invalidateQueries({ queryKey: ['user_posts', { user_id }] })
            } else {
              queryClient.invalidateQueries({ queryKey: ['my_posts'] })
            }
            queryClient.invalidateQueries({ queryKey: ['posts_from_friends_and_pending_requests'] })
          }
        }
      )
    } else {
      updatePostReactionMutation.mutate(
        { post_id, type },
        {
          onSuccess: () => {
            if (user_id) {
              queryClient.invalidateQueries({ queryKey: ['user_posts', { user_id }] })
            } else {
              queryClient.invalidateQueries({ queryKey: ['my_posts'] })
            }
            queryClient.invalidateQueries({ queryKey: ['posts_from_friends_and_pending_requests'] })
          }
        }
      )
    }
  }

  return (
    <>
      {/* Chi tiết tương tác */}
      <Modal
        isVisible={isShowDetailReaction}
        onClose={() => setIsShowDetailReaction(false)}
        width='750px'
        iconClose={false}
      >
        <PostDetailReaction reactions={reactions} reactionIcons={reactionIcons} />
      </Modal>

      {/* Chi tiết bình luận */}
      <Modal isVisible={isShowDetailComment} onClose={() => setIsShowDetailComment(false)} iconClose={false}>
        <PostCommentDetail post_id={post_id} />
      </Modal>

      {reactions.length !== 0 && (
        <div className='flex items-center justify-between gap-4 border-b border-gray-100 p-2.5 text-[13px] sm:px-4'>
          <div className='z-99 relative'>
            <div className='flex cursor-pointer items-center gap-2 hover:underline'>
              <div className='flex'>
                {reactions.slice(0, 3).map((reaction) => {
                  return (
                    <div className='-ml-1.5 h-[18px] w-[18px] cursor-pointer' key={reaction.post_reaction_id}>
                      <img src={reactionIcons[reaction.type]} className='h-full w-full object-cover' alt='' />
                    </div>
                  )
                })}
              </div>
              <span className='text-[13px]' onClick={() => setIsShowDetailReaction(true)}>
                {userReactionType
                  ? `${reactions.length - 1 === 0 ? displayText : `Bạn và ${reactions.length - 1} người khác`}`
                  : reactions.length}
              </span>
            </div>
            <div uk-dropdown='offset:10;pos: bottom-right ; animation: uk-animation-slide-bottom-small'>
              <nav>
                {reactions.slice(0, 6).map((reaction) => {
                  const { user_reaction, type } = reaction
                  return (
                    <div
                      key={reaction.post_reaction_id}
                      className='flex items-center justify-between rounded-md pr-2 hover:bg-gray-100'
                    >
                      <Link to={`/profile/${user_reaction.user_id}`} className='flex w-full items-center gap-2 p-2 '>
                        <img
                          src={user_reaction.Profile.profile_picture}
                          className='h-7 w-7 rounded-full object-cover'
                        />
                        <span className='text-[13px]'>
                          {user_reaction.last_name} {user_reaction.first_name}
                        </span>
                      </Link>
                      <span>
                        <div className='h-[18px] w-[18px]'>
                          <img src={reactionIcons[type]} className='h-full w-full object-cover' alt='' />
                        </div>
                      </span>
                    </div>
                  )
                })}
                {reactions.length - 7 > 0 && (
                  <a href='#!' className='text-[13px]'>
                    Và {reactions.length - 7} người khác ...
                  </a>
                )}
              </nav>
            </div>
          </div>
          <div>
            <span className='cursor-pointer hover:underline' onClick={() => setIsShowDetailComment(true)}>
              {+commentCount > 0 ? `${commentCount} Bình luận` : 'Chưa có bình luận'}{' '}
            </span>
          </div>
        </div>
      )}
      <div className='flex items-center gap-4 p-2.5 text-[13px] font-semibold sm:px-4'>
        <div>
          <div className='flex items-center gap-2.5'>{renderReactionButton()}</div>
          <div
            className='rounded-full bg-white p-1 px-2 text-2xl drop-shadow-md dark:bg-slate-700'
            uk-drop='offset:10;pos: top-left; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left'
          >
            <div
              className='flex gap-2'
              uk-scrollspy='target: > button; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
            >
              <button
                onClick={() => handleCreateOrUpdateInteraction(post_id, 'like')}
                type='button'
                className='text-red-600 duration-300 hover:scale-125'
              >
                <div className='h-[30px] w-[30px]'>
                  <img src={reactionIcons['like']} className='h-full w-full object-cover' alt='' />
                </div>
              </button>
              <button
                onClick={() => handleCreateOrUpdateInteraction(post_id, 'love')}
                type='button'
                className='text-red-600 duration-300 hover:scale-125'
              >
                <div className='h-[30px] w-[30px]'>
                  <img src={reactionIcons['love']} className='h-full w-full object-cover' alt='' />
                </div>
              </button>
              <button
                onClick={() => handleCreateOrUpdateInteraction(post_id, 'haha')}
                type='button'
                className='text-red-600 duration-300 hover:scale-125'
              >
                <div className='h-[30px] w-[30px]'>
                  <img src={reactionIcons['haha']} className='h-full w-full object-cover' alt='' />
                </div>
              </button>
              <button
                onClick={() => handleCreateOrUpdateInteraction(post_id, 'wow')}
                type='button'
                className='text-red-600 duration-300 hover:scale-125'
              >
                <div className='h-[30px] w-[30px]'>
                  <img src={reactionIcons['wow']} className='h-full w-full object-cover' alt='' />
                </div>
              </button>
              <button
                onClick={() => handleCreateOrUpdateInteraction(post_id, 'sad')}
                type='button'
                className='text-red-600 duration-300 hover:scale-125'
              >
                <div className='h-[30px] w-[30px]'>
                  <img src={reactionIcons['sad']} className='h-full w-full object-cover' alt='' />
                </div>
              </button>
              <button
                onClick={() => handleCreateOrUpdateInteraction(post_id, 'angry')}
                type='button'
                className='text-red-600 duration-300 hover:scale-125'
              >
                <div className='h-[30px] w-[30px]'>
                  <img src={reactionIcons['angry']} className='h-full w-full object-cover' alt='' />
                </div>
              </button>
            </div>
            <div className='absolute -bottom-1 left-3 hidden h-2.5 w-2.5 rotate-45 bg-white' />
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <button type='button' className='button-icon bg-slate-200/70 dark:bg-slate-700'>
            <IonIcon className='text-lg' icon='chatbubble-outline'></IonIcon>
          </button>
          <span> bình luận</span>
        </div>
        <div className='flex items-center gap-3'>
          <button type='button' className='button-icon bg-slate-200/70 dark:bg-slate-700'>
            <IonIcon className='text-lg' icon='share-social-outline'></IonIcon>
          </button>
          <span> chia sẻ</span>
        </div>
        <button type='button' className='button-icon ml-auto'>
          <IonIcon className='text-xl' icon='paper-plane-outline' />
        </button>
        <button type='button' className='button-icon'>
          <IonIcon className='text-xl' icon='share-outline' />
        </button>
      </div>
    </>
  )
}

export default PostIcon
