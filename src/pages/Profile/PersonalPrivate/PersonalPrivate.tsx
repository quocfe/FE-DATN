import CreateStory from '~/components/CreateStory'
import FeedStory from '../components/FeedStory'
import Introduce from '../components/Introduce'
import useAuthStore from '~/store/auth.store'
import { useState } from 'react'
import Modal from '~/components/Modal'
import UpdateProfile from '../components/UpdateProfile'

function PersonalPrivate() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { profile } = useAuthStore()

  return (
    <>
      {/* Update Profile */}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} height='70%'>
        <UpdateProfile onClose={() => setShowModal(false)} />
      </Modal>
      {/* Feed Story */}
      <FeedStory profile={profile} />
      {/* Introduce */}
      <Introduce profile={profile} setShowModal={setShowModal} />
      {/* Create Storey */}
      <CreateStory />
    </>
  )
}

export default PersonalPrivate
