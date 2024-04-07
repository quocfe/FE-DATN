import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'

interface Props {
  children: React.ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <Sidebar />
      <div
        id='site__main'
        className='mt-[--m-top] h-[calc(100vh-var(--m-top))] p-2.5 xl:ml-[--w-side-sm] 2xl:ml-[--w-side]'
      >
        <div className='mx-auto max-w-[1065px] 2xl:max-w-[1220px]'>{children}</div>
      </div>
    </>
  )
}

export default MainLayout
