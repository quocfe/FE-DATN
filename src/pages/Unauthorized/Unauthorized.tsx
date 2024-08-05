import { Link } from 'react-router-dom'

function Unauthorized() {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-12 overflow-hidden py-8 '>
      <img className='w-[32%]' src='/public/403-Error-Forbidden.svg' alt='' />
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-center text-[25px] font-medium'>Bạn không có quyền truy cập</h1>
        <p className='text-center text-lg '>Bạn đã cố truy cập một trang mà bạn không có sự cho phép trước..</p>
        <Link to={'/admin/dashboard'} className='rounded-md bg-[#7367f0] px-5 py-2 text-[15px] text-white'>
          Quay về
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized
