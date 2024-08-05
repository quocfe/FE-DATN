import FeedStory from '../components/FeedStory'
import Introduce from '../components/Introduce'
import useAuthStore from '~/store/auth.store'
import { useState } from 'react'
import Modal from '~/components/Modal'
import UpdateProfile from '../components/UpdateProfile'
import CreatePost from '~/components/CreatePost'

function PersonalPrivate() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { profile } = useAuthStore()

  return (
    <>
      {/* Update Profile */}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} height='70%'>
        <UpdateProfile onClose={() => setShowModal(false)} />
      </Modal>
      {/* Posts */}
      <FeedStory />
      {/* Introduce */}
      <Introduce profile={profile} setShowModal={setShowModal} />
    </>
  )
}

export default PersonalPrivate
