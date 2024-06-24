import useAuthStore from '~/store/auth.store'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
import UserInfo from './components/UserInfo'

interface Props {
  children: React.ReactNode
}

function Profile({ children }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='mx-auto max-w-[1065px] max-lg:-m-2.5'>
      <div className='dark:bg-dark2 bg-white shadow lg:-mt-10 lg:rounded-b-2xl'>
        {/* User Info */}
        <UserInfo />
        {/* Navigations */}
        <Navigation />
      </div>
      {/* Content */}
      <div className='mt-6 flex gap-8 max-lg:flex-col 2xl:gap-12' id='js-oversized'>
        {children}
      </div>
    </div>
  )
}

export default Profile
