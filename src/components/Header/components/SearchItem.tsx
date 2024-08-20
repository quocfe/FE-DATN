import { IonIcon } from '@ionic/react'
import { Link } from 'react-router-dom'
import useMutationCreateSearchHistory from '../hooks/useMutationCreateSearchHistory'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import useMutationDeleteSearchHistory from '../hooks/useMutationDeleteSearchHistory'

interface Props {
  user: UserCompactWithStatus
  isHistory: boolean
}

function SearchItem({ user, isHistory }: Props) {
  // React Query
  const queryClient = useQueryClient()
  const addNewSearchHistoryMutation = useMutationCreateSearchHistory()
  const deleteSearchHistoryMutation = useMutationDeleteSearchHistory()

  // Thêm mới lịch sử tìm kiếm
  const handleAddNewSearchHistory = () => {
    const data: CreateSearchHistory = {
      target_id: user.user_id,
      search_type: 'user'
    }

    addNewSearchHistoryMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['search_histories'] })
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  // Xóa lịch sử tìm kiếm
  const handleDeleteSearchHistory = () => {
    deleteSearchHistoryMutation.mutate(user.user_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['search_histories'] })
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  return (
    <div className='relative flex items-center justify-between gap-2 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'>
      <Link
        to={`/profile/${user.user_id}`}
        className='flex flex-1 cursor-pointer items-center gap-4'
        onClick={handleAddNewSearchHistory}
      >
        <img src={user.Profile?.profile_picture} className='h-9 w-9 rounded-full object-cover' alt='' />
        <div>
          <div>
            {user.last_name} {user.first_name}
          </div>
          <div className='mt-0.5 text-xs font-medium text-blue-500'>
            {user.status === 'Đã chấp nhận' ? 'Bạn bè' : user.status}
          </div>
        </div>
      </Link>
      {isHistory && (
        <IonIcon
          icon='close'
          className='md hydrated right-3 cursor-pointer text-base hover:text-red-600'
          role='img'
          aria-label='close'
          onClick={handleDeleteSearchHistory}
        />
      )}
    </div>
  )
}

export default SearchItem
