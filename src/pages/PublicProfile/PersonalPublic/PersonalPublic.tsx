import FeedStory from '../components/FeedStory'
import useAuthStore from '~/store/auth.store'
import Introduce from '../components/Introduce'

function PersonalPublic() {
  const { profile } = useAuthStore()

  return (
    <>
      {/* Feed Story */}
      <FeedStory />
      {/* Introduce */}
      <Introduce profile={profile} />
    </>
  )
}

export default PersonalPublic
