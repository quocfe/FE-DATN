import { toast } from 'react-toastify'
import useMutationBlockedUser from '../mutations/user/useMutationBlockedUser'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

function useBlockedUser(
  user_id: string | undefined,
  shouldNavigate: boolean = true,
  setShowDialog?: React.Dispatch<React.SetStateAction<boolean>>,
  keyRefresh?: string
) {
  const navigate = useNavigate()

  const blockedUserMutation = useMutationBlockedUser()
  const queryClient = useQueryClient()

  const handleBlockedUser = () => {
    if (user_id) {
      blockedUserMutation.mutate(user_id, {
        onSuccess: () => {
          toast.success('Chặn người dùng thành công')
          if (shouldNavigate) {
            navigate('/')
          } else if (setShowDialog && keyRefresh) {
            queryClient.invalidateQueries({ queryKey: [keyRefresh] })
            setShowDialog(false)
          }
        },
        onError: () => {
          toast.error('Đã có lỗi xảy ra!')
        }
      })
    }
  }
  return { handleBlockedUser }
}

export default useBlockedUser
