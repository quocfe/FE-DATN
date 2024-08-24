import FeedStory from '../components/FeedStory'
import useAuthStore from '~/store/auth.store'
import Introduce from '../components/Introduce'

function PersonalPublic() {
  return (
    <>
      {/* Feed Story */}
      <FeedStory />
      {/* Introduce */}
      <Introduce />
    </>
  )
}

export default PersonalPublic
