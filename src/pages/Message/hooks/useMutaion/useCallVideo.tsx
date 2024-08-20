import { useSocketContext } from '~/context/socket'
import useMessageStore from '~/store/message.store'
import { getProfileFromLocalStorage } from '~/utils/auth'

interface props {
  group_message_id: string
  user_id: string
  group_name: string | undefined
  avatar: string
  type: number
  setFeatureNotAllow: (value: boolean) => void
  // featureNotAllow: boolean | undefined
}

function useCallVideo({ group_message_id, user_id, group_name, avatar, type, setFeatureNotAllow }: props) {
  const { setVideoCall, setAcceptCall } = useMessageStore()
  const { socket } = useSocketContext()
  const { user_id: user_login, first_name, last_name, Profile } = getProfileFromLocalStorage()

  // const dataVideoCall = {
  //   group_message_id: selectedConversation?.group_id,
  //   group_name: infoMessage?.group_name,
  //   avatar: infoMessage?.avatar,
  //   user_id: selectedConversation?.id
  // }

  const handleClickVideoCall = () => {
    if (type === 1) {
      const dataToSocket = {
        group_message_id: group_message_id,
        user_id: user_id,
        room_id: `123${Date.now()}`,
        group_name: first_name + ' ' + last_name,
        avatar: Profile.profile_picture
      }
      const dataVideoCall = {
        group_message_id,
        group_name,
        avatar,
        user_id
      }
      console.log('dataToSocket', dataToSocket)
      setAcceptCall(false)
      setVideoCall(dataVideoCall as {})

      socket?.emit('callVideo', dataToSocket)
    } else {
      setFeatureNotAllow(true)
    }
  }
  return handleClickVideoCall
}

export default useCallVideo
