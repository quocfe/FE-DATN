import useAuthStore from '~/store/auth.store'

function BasicInfo() {
  const { profile } = useAuthStore()

  return (
    <div>
      <div>
        <div className='space-y-6'>
          <div className='items-center gap-10 md:flex'>
            <label className='text-right md:w-32'> Họ </label>
            <div className='flex-1 max-md:mt-4'>
              <input type='text' placeholder='Monroe' className='w-full' defaultValue={profile?.last_name} />
            </div>
          </div>
          <div className='items-center gap-10 md:flex'>
            <label className='text-right md:w-32'> Tên </label>
            <div className='flex-1 max-md:mt-4'>
              <input type='text' placeholder='Monroe' className='w-full' defaultValue={profile?.first_name} />
            </div>
          </div>
          <div className='items-center gap-10 md:flex'>
            <label className='text-right md:w-32'> Email </label>
            <div className='flex-1 max-md:mt-4'>
              <input type='text' placeholder='info@mydomain.com' className='w-full' defaultValue={profile?.email} />
            </div>
          </div>
          <div className='items-center gap-10 md:flex'>
            <label className='text-right md:w-32'> Giới tính </label>
            <div className='flex-1 max-md:mt-4'>
              <select className='w-full !rounded-md !border-0 lg:w-1/2' defaultValue={profile?.gender}>
                <option value={1}>Nam</option>
                <option value={2}>Nữ</option>
                <option value={3}>Khác</option>
              </select>
            </div>
          </div>
        </div>
        <div className='mt-10 flex items-center gap-4 lg:pl-[10.5rem]'>
          <button type='submit' className='button bg-secondery py-2 max-md:flex-1 lg:px-6'>
            Quay lại
          </button>
          <button type='submit' className='button bg-primary py-2 text-white max-md:flex-1 lg:px-10'>
            Cập nhật <span className='ripple-overlay' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BasicInfo
