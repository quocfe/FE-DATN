import { toast } from 'react-toastify'
import useMutationDeleteMessage from '~/pages/Message/hooks/useMutaion/useMutationDeleteGroup'
import { useQueryInfinifyConversation } from '~/pages/Message/hooks/useQuery/useQueryInfinifyConversation'
import useMessageFixStore from '~/store/messageFix.store'
import Dialog from '../Dialog'

interface props {
  showDiaLogDeleteConversation: boolean
  setShowDiaLogDeleteConversation: (value: boolean) => void
  group_id: string
}

function DeleteConversationMsg({ showDiaLogDeleteConversation, setShowDiaLogDeleteConversation, group_id }: props) {
  const { removeMessageFix, removeHiddenMessageFix } = useMessageFixStore()
  const deleteConversatonMuation = useMutationDeleteMessage()
  const { refetch } = useQueryInfinifyConversation()

  const handleDeleteConversation = () => {
    deleteConversatonMuation.mutate(group_id, {
      onSuccess: () => {
        setShowDiaLogDeleteConversation(false)
        refetch()
        removeMessageFix(group_id)
        removeHiddenMessageFix(group_id)
      },
      onError: () => {
        toast.warning('Đã xảy ra lỗi')
      }
    })
  }
  return (
    <Dialog
      isVisible={showDiaLogDeleteConversation}
      onClose={() => setShowDiaLogDeleteConversation(false)}
      type='warning'
      title='Xóa cuộc trò chuyện'
      description='Bạn không thể xem lại tin nhắn sau khi xóa cuộc hội thoại này!.'
      textBtn='Xóa'
      callback={() => handleDeleteConversation()}
    />
  )
}

export default DeleteConversationMsg
