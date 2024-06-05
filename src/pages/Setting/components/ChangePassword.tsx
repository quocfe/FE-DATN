function ChangePassword() {
  return (
    <div>
      <div>
        <div className='mx-auto max-w-lg space-y-6'>
          <div className='items-center justify-between gap-16 max-md:space-y-3 md:flex'>
            <label className='text-right md:w-40'> Mật khẩu hiện tại </label>
            <div className='flex-1 max-md:mt-4'>
              <input type='password' placeholder='******' className='w-full' />
            </div>
          </div>
          <div className='items-center justify-between gap-16 max-md:space-y-3 md:flex'>
            <label className='text-right md:w-40'> Mật khẩu mới </label>
            <div className='flex-1 max-md:mt-4'>
              <input type='password' placeholder='******' className='w-full' />
            </div>
          </div>
          <div className='items-center justify-between gap-16 max-md:space-y-3 md:flex'>
            <label className='text-right md:w-40'> Xác nhận mật khẩu mới </label>
            <div className='flex-1 max-md:mt-4'>
              <input type='password' placeholder='******' className='w-full' />
            </div>
          </div>
        </div>
        <div className='mt-10 flex items-center justify-center gap-4'>
          <button type='submit' className='button bg-secondery py-2 max-md:flex-1 lg:px-6'>
            Quay lại
          </button>
          <button type='submit' className='button bg-primary py-2 text-white max-md:flex-1 lg:px-10'>
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
