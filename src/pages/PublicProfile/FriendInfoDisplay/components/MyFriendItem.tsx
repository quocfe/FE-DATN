import { useState } from 'react'
import { Link } from 'react-router-dom'
import Dialog from '~/components/Dialog'
import { ENDPOINT } from '~/constants/endpoint.constant'
import useBlockedUser from '~/hooks/user/useBlockedUser'

interface Props {
  friend: UserCompact
}

function MyFriendItem({ friend }: Props) {
  // Hooks
  const [showDialogBlockUser, setShowDialogBlockUser] = useState<boolean>(false)

  // Custom Hooks React Query
  const { handleBlockedUser } = useBlockedUser(friend.user_id, false, setShowDialogBlockUser, 'my_friends')

  const commonFriends = friend.CommonFriends

  return (
    <>
      <Dialog
        isVisible={showDialogBlockUser}
        onClose={() => setShowDialogBlockUser(false)}
        type='warning'
        title={`Chắc chắn chặn ${friend.last_name} ${friend.first_name}!`}
        description='Khi được chặn, người dùng sẽ không thể thực hiện các hoạt động như gửi tin nhắn, bình luận, hoặc xem nội dung, bảo vệ cộng đồng khỏi hành vi không phù hợp hoặc spam.'
        textBtn='Chặn người dùng'
        callback={handleBlockedUser}
      />
      <div className='card'>
        <a href='timeline-group.html'>
          <div className='card-media h-24'>
            <img src={friend.Profile?.cover_photo} className='w-full object-cover object-center' alt='' />
            <div className='card-overly' />
          </div>
        </a>
        <div className='card-body relative z-10'>
          <img
            src={friend.Profile?.profile_picture}
            alt=''
            className='relative -mt-8 mb-2 h-11 w-11 rounded-full border-2 border-white object-cover shadow dark:border-slate-800'
          />
          <h4 className='card-title'>
            {friend.last_name} {friend.first_name}
          </h4>
          {commonFriends && commonFriends.length !== 0 ? (
            <div className='mt-2 flex items-center'>
              {commonFriends.slice(0, 2).map((friend) => {
                return (
                  <Link to={`${ENDPOINT.PROFILE}/${friend.user_id}`} className='-mr-2 h-6 w-6' key={friend.user_id}>
                    <img
                      src={friend.Profile?.profile_picture}
                      className='h-full w-full rounded-full border-2 border-gray-200 object-cover'
                      alt=''
                    />
                  </Link>
                )
              })}
              <div className='ml-3 text-sm text-gray-500'> {commonFriends.length} bạn chung</div>
            </div>
          ) : (
            <div className='mt-2 flex h-[24px] items-center'>
              <p className='text-sm'>Không có bạn chung</p>
            </div>
          )}
          <div className='flex gap-2'>
            <Link to={`${ENDPOINT.PROFILE}/${friend.user_id}`} className='button flex-1 bg-primary text-white'>
              Thêm bạn bè
            </Link>
            <a
              onClick={() => setShowDialogBlockUser(true)}
              className='button !w-auto cursor-pointer text-red-600'
              style={{
                backgroundColor: 'rgb(255 236 235)'
              }}
            >
              Chặn
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyFriendItem
