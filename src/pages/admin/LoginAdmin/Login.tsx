function LoginAdmin() {
  return (
    <div className='w-ful flex min-h-screen bg-white'>
      <div className='mb-8 ml-8 mt-8 flex w-[57%] items-center justify-center rounded-md bg-[#f8f7fa] shadow-sm'>
        <div className='h-[425px]'>
          <img
            src='https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/illustrations/auth-login-illustration-light.png'
            className='h-full object-contain'
            alt=''
          />
        </div>
      </div>
      <div className='flex-1 p-12'>
        <div id='logo' className='mb-4 pl-16'>
          <svg width='32' height='22' viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
              fill='#7367F0'
            ></path>
            <path
              opacity='0.06'
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
              fill='#161616'
            ></path>
            <path
              opacity='0.06'
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
              fill='#161616'
            ></path>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
              fill='#7367F0'
            ></path>
          </svg>
        </div>
        <form className='px-16'>
          <h3 className='mb-1 text-[22px] font-semibold '>
            <a href='' className='text-[#5D596C]'>
              Đăng nhập với tư cách quản trị viên
            </a>
          </h3>
          <p className='mb-6 text-sm text-[#6F6B7D]'>
            Vui lòng đăng nhập vào tài khoản của bạn và bắt đầu cuộc phiêu lưu
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginAdmin
