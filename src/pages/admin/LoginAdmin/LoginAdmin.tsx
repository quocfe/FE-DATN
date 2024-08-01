import { yupResolver } from '@hookform/resolvers/yup'
import { isAxiosError } from 'axios'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useMutationLogin from '~/pages/Login/hooks/useMutationLogin'
import useAuthStore from '~/store/auth.store'
import { LoginForm, loginSchema } from '~/utils/rules'

function LoginAdmin() {
  const navigate = useNavigate()
  const { setProfile, setIsAuthenticated } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutationLogin()

  const handleLogin = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        const userProfile = data.data.data.user
        setProfile(userProfile)
        setIsAuthenticated(true)
        toast.success('Đăng nhập thành công!')
        window.location.pathname = '/admin/dashboard'
      },
      onError: (error) => {
        if (isAxiosError<ErrorResponse<LoginForm>>(error)) {
          if (error.response) {
            const formError = error.response.data.errors

            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof LoginForm, {
                  message: formError[key as keyof LoginForm]
                })
              })
            }
          }
        }
      }
    })
  })

  return (
    <div className='flex min-h-screen'>
      <div className='flex basis-[66.6667%] items-end justify-center bg-[#f4f5fa] py-10'>
        <div>
          <img
            src='https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/assets/tree1-BgCqMC4A.png'
            alt=''
          />
        </div>
        <div className='max-w-[794px]'>
          <img
            src='https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/assets/auth-v2-login-illustration-light-u0hCaQd6.png'
            className='w-full object-contain'
            alt=''
          />
        </div>
      </div>
      <form onSubmit={handleLogin} className='flex flex-1 flex-col justify-center bg-white p-8'>
        <h3 className='text-[22px] font-medium text-gray-500'>
          Đăng nhập với tư cách <span className='text-[#8c57ff]'>Quản Trị Viên</span>
        </h3>
        <p className='pb-5 pt-3 text-[14.5px] text-gray-500'>
          Chào mừng bạn trở lại! Hãy đăng nhập vào tài khoản quản trị viên của bạn để bắt đầu quản lý và điều hành hệ
          thống.
        </p>
        <div className='input-container relative mb-6'>
          <input
            type='text'
            placeholder=''
            className={classNames(
              'peer w-full !border-gray-300 !bg-white !py-[12px] transition-colors focus:!border-[#8c57ff] focus:outline-none',
              {
                '!border-red-500 focus:!border-red-500': errors.email
              }
            )}
            {...register('email')}
          />
          <label
            className={classNames(
              'absolute left-4 top-[12px] cursor-text bg-white text-[15px] text-gray-600 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#8c57ff]',
              {
                '!text-red-500': errors.email
              }
            )}
          >
            Email
          </label>
          <span className='ml-1 mt-1 block text-sm text-red-500'>{errors.email?.message}</span>
        </div>
        <div className='input-container relative'>
          <input
            type='password'
            placeholder=''
            className={classNames(
              'peer w-full !border-gray-300 !bg-white !py-[12px] transition-colors focus:!border-[#8c57ff] focus:outline-none',
              {
                '!border-red-500 focus:!border-red-500': errors.email
              }
            )}
            {...register('password')}
          />
          <label
            className={classNames(
              'absolute left-4 top-[12px] cursor-text bg-white text-[15px] text-gray-600 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#8c57ff]',
              {
                '!text-red-500': errors.password
              }
            )}
          >
            Mật khẩu
          </label>
          <span className='ml-1 mt-1 block text-sm text-red-500'>{errors.password?.message}</span>
        </div>
        <div className='mt-5 flex items-center justify-between text-[15px]'>
          <div className='flex items-center gap-2'>
            <input type='checkbox' className='cursor-pointer rounded-sm !border-gray-300' />
            Ghi nhớ
          </div>
          <div className='text-[#8c57ff]'>Quên mật khẩu?</div>
        </div>
        <button className='mt-7 rounded-md bg-[#8c57ff] py-2.5 text-white'>Đăng nhập</button>
      </form>
    </div>
  )
}

export default LoginAdmin
