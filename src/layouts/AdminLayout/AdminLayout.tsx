import NavbarAdmin from '~/components/NavbarAdmin'
import SidebarAdmin from '~/components/SidebarAdmin'

interface Props {
  children: React.ReactNode
}

function AdminLayout({ children }: Props) {
  return (
    <>
      <div className='min-h-screen bg-[#f8f7fa]'>
        <SidebarAdmin />
        <div className='ml-[275px] overflow-x-hidden'>
          <NavbarAdmin />
          <div className='px-6'>{children}</div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout
