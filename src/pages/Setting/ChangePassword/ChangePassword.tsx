import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { ChangePasswordForm, changePasswordSchema } from '~/utils/rules'
import useMutationChangePassword from './hooks/useMutationChangePassword'
import { toast } from 'react-toastify'
import { isAxiosError } from '~/utils/utils'
import Dialog from '~/components/Dialog'

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema)
  })

  // React Query
  const changePasswordMutation = useMutationChangePassword()

  const handleChangePassword = handleSubmit((dataChangePassword) => {
    const data: ChangePassword = {
      old_password: dataChangePassword.currentPassword,
      new_password: dataChangePassword.new_password
    }

    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        reset()
        toast.success('Đổi mật khẩu thành công')
      },
      onError: (error) => {
        if (isAxiosError<ErrorResponse>(error)) {
          if (error.response) {
            const formError = error.response.data
            const errorMessage = formError.message
            setError('currentPassword', {
              message: errorMessage,
              type: 'server'
            })
          }
        }
      }
    })
  })

  return (
    <div>
      {/* <Dialog isVisible={true} onClose={() => false} type='notification' /> */}
      <form onSubmit={handleChangePassword}>
        <div className='mx-auto max-w-lg space-y-6'>
          <div>
            <div className='items-center justify-between gap-16 max-md:space-y-3 md:flex'>
              <label className='text-right md:w-40'> Mật khẩu hiện tại </label>
              <div className='flex-1 max-md:mt-4'>
                <input type='password' placeholder='******' className='w-full' {...register('currentPassword')} />
              </div>
            </div>
            <span className='ml-[225px] mt-2 block text-sm text-red-500'>{errors.currentPassword?.message}</span>
          </div>
          <div>
            <div className='items-center justify-between gap-16 max-md:space-y-3 md:flex'>
              <label className='text-right md:w-40'> Mật khẩu mới </label>
              <div className='flex-1 max-md:mt-4'>
                <input type='password' placeholder='******' className='w-full' {...register('new_password')} />
              </div>
            </div>
            <span className='ml-[225px] mt-2 block text-sm text-red-500'>{errors.new_password?.message}</span>
          </div>
          <div>
            <div className='items-center justify-between gap-16 max-md:space-y-3 md:flex'>
              <label className='text-right md:w-40'> Xác nhận mật khẩu </label>
              <div className='flex-1 max-md:mt-4'>
                <input type='password' placeholder='******' className='w-full' {...register('confirm_password')} />
              </div>
            </div>
            <span className='ml-[225px] mt-2 block text-sm text-red-500'>{errors.confirm_password?.message}</span>
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
      </form>
    </div>
  )
}

export default ChangePassword
