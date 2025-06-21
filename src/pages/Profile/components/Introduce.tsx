import EducationIcon from '~/components/icons/Profile/EducationIcon'
import HomeTownIcon from '~/components/icons/Profile/HomeTownIcon'
import JobIcon from '~/components/icons/Profile/JobIcon'
import RelationshipIcon from '~/components/icons/Profile/RelationshipIcon'
import MyFriends from './MyFriends'
import React from 'react'
import useQueryMediaResources from '~/hooks/queries/user/useQueryMediaResources'
import useQueryReceivedFriendRequests from '~/hooks/queries/user/useQueryReceivedFriendRequests'


interface Props {
  profile: UserProfile | null
  setShowModal: (value: React.SetStateAction<boolean>) => void
}

const relationshipStatuses = [
  'Độc thân',
  'Đang hẹn hò',
  'Đang tìm hiểu',
  'Phức tạp',
  'Đã kết hôn',
  'Đã ly hôn',
  'Không xác định'
]

const ProfileItem = ({ icon, title, text }: { icon: JSX.Element; title: string; text: string }) => (
  <li className='flex items-center gap-3'>
    {icon}
    <div>
      {title} <span className='font-semibold text-black dark:text-white'>{text}</span>
    </div>
  </li>
)

function Introduce({ profile, setShowModal }: Props) {
  const { data: resfriendRequests } = useQueryReceivedFriendRequests({ _page: '1', _limit: '100' })
  const { data } = useQueryMediaResources()
  const media_resources = data?.data.data.media_resources ?? []
  const getRelationshipStatus = (status: number) => relationshipStatuses[status] || 'Không xác định'

  const friendRequests = resfriendRequests?.data.data.friends

  return (
    <div className='lg:w-[400px]'>
      <div
        className='max-lg:grid max-lg:gap-6 sm:grid-cols-2 lg:space-y-4 lg:pb-8'
        uk-sticky='media: 1024; end: #js-oversized; offset: 80'
      >
        <div className='box p-5 px-6'>
          <div className='items-ce flex justify-between text-black dark:text-white'>
            <h3 className='text-lg font-bold'> Giới thiệu </h3>
            <a className='cursor-pointer text-sm text-blue-500' onClick={() => setShowModal(true)}>
              Chỉnh sửa
            </a>
          </div>
          <ul className='mt-4 space-y-4 text-sm text-gray-700 dark:text-white/80'>
            {profile?.Profile.home_town && (
              <ProfileItem icon={<HomeTownIcon />} title='Sống tại' text={profile.Profile.home_town} />
            )}
            {profile?.Profile.education && (
              <ProfileItem icon={<EducationIcon />} title='Học tại' text={profile.Profile.education} />
            )}
            {profile?.Profile.job && <ProfileItem icon={<JobIcon />} title='Làm việc tại' text={profile.Profile.job} />}
            {profile?.Profile.relationship_status && profile.Profile.relationship_status < 7 && (
              <ProfileItem
                icon={<RelationshipIcon />}
                title='Tình trạng'
                text={getRelationshipStatus(
                  profile.Profile.relationship_status === 0 ? 0 : profile.Profile.relationship_status - 1
                )}
              />
            )}
            <li className='flex items-center gap-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
              <div>
                Có <span className='font-semibold text-black dark:text-white'> {friendRequests?.length} </span> người
                theo dõi
              </div>
            </li>
          </ul>
          {/* Hobbies */}
          {profile?.Interests && (
            <div className='mt-4 flex flex-wrap gap-1 text-sm font-semibold capitalize'>
              {profile.Interests.map((interest) => (
                <div
                  key={interest.interest_id}
                  className='inline-flex items-center gap-2 rounded-full border border-gray-100 px-2.5 py-0.5 shadow'
                >
                  {interest.interest_name}
                </div>
              ))}
            </div>
          )}
          <div className='mb-2 mt-4 grid grid-cols-2 gap-1 overflow-hidden rounded-lg text-center text-sm'>
            {media_resources.slice(0, 4).map((media) => {
              if (media.media_type === 'image') {
                return (
                  <div className='relative aspect-[4/3] w-full' key={media.media_id}>
                    <img src={media.media_url} alt='' className='inset-0 h-full w-full object-cover object-center' />
                  </div>
                )
              } else {
                return (
                  <video
                    key={media.media_id}
                    src={media.media_url}
                    className='h-full w-full object-cover'
                    controls
                  ></video>
                )
              }
            })}
          </div>
        </div>
        {/* Bạn bè */}
        <MyFriends />
      </div>
    </div>
  )
}

export default React.memo(Introduce)
