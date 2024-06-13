import { IonIcon } from '@ionic/react'
import { Link } from 'react-router-dom'

interface Props {
  user: UserCompactWithStatus
}

function SearchItem({ user }: Props) {
  return (
    <Link
      to={`/profile/${user.user_id}`}
      className='relative flex items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
    >
      <img src={user.Profile?.profile_picture} className='h-9 w-9 rounded-full object-cover' alt='' />
      <div>
        <div>
          {user.last_name} {user.first_name}{' '}
        </div>
        <div className='mt-0.5 text-xs font-medium text-blue-500'> {user.status} </div>
      </div>
      <IonIcon
        icon='close'
        className='md hydrated absolute right-3 top-1/2 -translate-y-1/2 text-base'
        role='img'
        aria-label='close'
      />
    </Link>
  )
}

export default SearchItem
