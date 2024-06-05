import useAuthStore from '~/store/auth.store'
import Modal from '~/components/Modal'
import { useEffect, useState } from 'react'
import UpdateProfile from './components/UpdateProfile'
import Introduce from './components/Introduce'
import Navigation from './components/Navigation'
import UserInfo from './components/UserInfo'
import CreateStory from '~/components/CreateStory'
import FeedStory from './components/FeedStory'

function Profile() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { profile } = useAuthStore()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} height='70%'>
        <UpdateProfile onClose={() => setShowModal(false)} />
      </Modal>
      <div className='mx-auto max-w-[1065px] max-lg:-m-2.5'>
        <div className='dark:bg-dark2 bg-white shadow lg:-mt-10 lg:rounded-b-2xl'>
          {/* User Info */}
          <UserInfo profile={profile} setShowModal={setShowModal} />
          {/* Navigations */}
          <Navigation />
        </div>
        <div className='mt-8 flex gap-10 max-lg:flex-col 2xl:gap-12' id='js-oversized'>
          {/* Feed Story */}
          <FeedStory profile={profile} />
          {/* Introduce */}
          <Introduce profile={profile} setShowModal={setShowModal} />
          {/* Create Storey */}
          <CreateStory />
        </div>
      </div>
    </>
  )
}

export default Profile
