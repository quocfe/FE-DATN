import { yupResolver } from '@hookform/resolvers/yup'
import { useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useMutationAddNewRole from '~/hooks/mutations/role/useMutationAddNewRole'
import { RoleType, roleSchema } from '~/utils/rules'

interface Props {
  setShowModalAddRole: React.Dispatch<React.SetStateAction<boolean>>
}

function AddRole({ setShowModalAddRole }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<RoleType>({
    resolver: yupResolver(roleSchema)
  })

  const queryClient = useQueryClient()
  const addNewRoleMutation = useMutationAddNewRole()

  const handleAddRole = handleSubmit((data) => {
    addNewRoleMutation.mutate(data, {
      onSuccess: () => {
        reset()
        toast.success('Thêm mới vai trò thành công!')
        queryClient.invalidateQueries({ queryKey: ['roles'] })
        setShowModalAddRole(false)
      },
      onError: (error) => {
        if (isAxiosError<ErrorResponse<RoleType>>(error)) {
          if (error.response) {
            const message = error.response.data.message
            toast.error(message)
          }
        }
      }
    })
  })

  return (
    <div className='p-5'>
      <h1 className='pty-4 py-2 text-center text-xl font-medium !text-gray-800'>Thêm vai trò</h1>
      <p className='mx-auto max-w-[85%] text-center text-sm text-gray-600'>
        Mỗi vai trò có thể có các quyền hạn khác nhau, tùy thuộc vào nhiệm vụ mà người dùng đảm nhận. Việc tạo vai trò
        giúp hệ thống phân quyền và quản lý người dùng một cách linh hoạt và an toàn hơn.
      </p>
      <form onSubmit={handleAddRole} className='mt-7'>
        <div className='input-container relative mb-6'>
          <input
            {...register('name')}
            type='text'
            placeholder=''
            className={classNames(
              'peer w-full !border-gray-300 !bg-white !py-[12px] transition-colors focus:!border-[#8c57ff] focus:outline-none',
              {
                '!border-red-500 focus:!border-red-500': errors.name
              }
            )}
          />
          <label
            className={classNames(
              'absolute left-4 top-[12px] cursor-text bg-white text-[15px] text-gray-600 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#8c57ff]',
              {
                '!text-red-500': errors.name
              }
            )}
          >
            Tên vai trò
          </label>
          <span className='ml-1 mt-1 block text-sm text-red-500'>{errors.name?.message}</span>
        </div>
        <div className='input-container relative mb-6'>
          <input
            {...register('description')}
            type='text'
            placeholder=''
            className={classNames(
              'peer w-full !border-gray-300 !bg-white !py-[12px] transition-colors focus:!border-[#8c57ff] focus:outline-none',
              {
                '!border-red-500 focus:!border-red-500': errors.description
              }
            )}
          />
          <label
            className={classNames(
              'absolute left-4 top-[12px] cursor-text bg-white text-[15px] text-gray-600 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#8c57ff]',
              {
                '!text-red-500': errors.description
              }
            )}
          >
            Mô tả ngắn
          </label>
          <span className='ml-1 mt-1 block text-sm text-red-500'>{errors.description?.message}</span>
        </div>
        <button className='w-full rounded-md bg-[#8c57ff] py-2.5 text-white'>Thêm mới</button>
      </form>
    </div>
  )
}

export default AddRole
