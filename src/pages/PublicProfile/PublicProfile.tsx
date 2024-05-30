import { useNavigate, useParams } from 'react-router-dom'
import useQueryPublicProfile from '~/hooks/queries/useQueryPublicProfile'
import UserInfo from './components/UserInfo'
import Navigation from './components/Navigation'
import FeedStory from './components/FeedStory'
import Introduce from './components/Introduce'
import { useEffect } from 'react'

function PublicProfile() {
  // Hooks
  const { user_id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // React Query
  const { data, error } = useQueryPublicProfile(user_id ?? '')

  if (error?.message === 'Request failed with status code 404') {
    navigate('*')
  }

  const status = data?.data.data.relationship?.status ?? null
  const profile = data?.data.data.user ?? null

  return (
    <div className='mx-auto max-w-[1065px] max-lg:-m-2.5'>
      <div className='dark:bg-dark2 bg-white shadow lg:-mt-10 lg:rounded-b-2xl'>
        {/* Cover */}
        <div className='relative h-48 w-full overflow-hidden lg:h-72'>
          <img src={profile?.Profile.cover_photo} alt='' className='inset-0 h-full w-full object-cover' />
          {/* overly */}
          <div className='absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t from-black/60 pt-20' />
        </div>
        {/* User Info */}
        <UserInfo profile={profile} />
        {/* Navigations */}
        <Navigation profile={profile} status={status} />
      </div>
      <div className='mt-8 flex gap-10 max-lg:flex-col 2xl:gap-12' id='js-oversized'>
        {/* Feed Story */}
        <FeedStory />
        {/* Introduce */}
        <Introduce profile={profile} />
      </div>
    </div>
  )
}

export default PublicProfile
