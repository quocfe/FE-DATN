import { useEffect } from 'react'
import Navigation from './components/Navigation'
import UserInfo from './components/UserInfo'

interface Props {
  children: React.ReactNode
}

function Profile({ children }: Props) {
  // const queryClient = useQueryClient()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = async () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const threshold = document.documentElement.scrollHeight * 0.9

      if (scrollPosition >= threshold) {
        // > 90%
        // const data = await http.get<PostResponse>('post/my_post?_limit=1&_page=2')
        // queryClient.setQueryData(['my_posts'], data)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='mx-auto max-w-[1065px]  max-lg:-m-2.5'>
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
