import { useNavigate, useParams } from 'react-router-dom'
import useQueryPublicProfile from '~/hooks/queries/user/useQueryPublicProfile'
import UserInfo from './components/UserInfo'
import Navigation from './components/Navigation'
import React, { useEffect } from 'react'

interface Props {
  children: React.ReactNode
}

function PublicProfile({ children }: Props) {
  // Hooks
  const { user_id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [user_id])

  // React Query
  const { data, error } = useQueryPublicProfile(user_id ?? '')

  if (error?.message === 'Request failed with status code 404') {
    navigate('*')
  }

  const relationship = data?.data.data.relationship ?? null
  const profile = data?.data.data.user ?? null

  if (relationship?.status === 'Đã chặn') {
    navigate('*')
  }

  return (
    <div className='mx-auto max-w-[1065px] max-lg:-m-2.5'>
      <div className='dark:bg-dark2 bg-white shadow lg:-mt-10 lg:rounded-b-2xl'>
        {/* User Info */}
        <UserInfo profile={profile} />
        {/* Navigations */}
        <Navigation profile={profile} relationship={relationship} />
      </div>
      <div className='mt-6 flex gap-8 max-lg:flex-col 2xl:gap-12' id='js-oversized'>
        {children}
      </div>
    </div>
  )
}

export default PublicProfile
