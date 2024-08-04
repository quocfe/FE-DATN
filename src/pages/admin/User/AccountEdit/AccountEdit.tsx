import { useEffect, useState } from 'react'
import classNames from 'classnames'
import useQueryListModules from '~/hooks/queries/module/useQueryListModules'
import useQueryListPermissions from '~/hooks/queries/permission/useQueryListPermissions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AccountUpdateForm, accountUpdateSchema } from '~/utils/rules'
import { useQueryClient } from '@tanstack/react-query'
import useMutationUpdateAccount from '~/hooks/mutations/account/useMutationUpdateAccount'
import { toast } from 'react-toastify'

interface Props {
  account: Account
  setShowEditAccount: React.Dispatch<React.SetStateAction<boolean>>
}

function AccountEdit({ account, setShowEditAccount }: Props) {
  const { data: resListPermissions } = useQueryListPermissions()
  const { data: resListModules } = useQueryListModules()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AccountUpdateForm>({
    resolver: yupResolver(accountUpdateSchema)
  })

  const queryClient = useQueryClient()
  const updateAccountMutation = useMutationUpdateAccount()

  const permissions = resListPermissions?.data.data.permissions ?? []
  const modules = resListModules?.data.data.modules ?? []

  // State để quản lý trạng thái của các checkbox
  /**
   * Record<string, string[]
   * Record<Role, Permissions[]>
   */
  const [checkedPermissions, setCheckedPermissions] = useState<Record<string, string[]>>(() => {
    // Khởi tạo checkedPermissions dựa trên các permission có sẵn của account
    const initialState: Record<string, string[]> = {}

    account.modules.forEach((module) => {
      initialState[module.module_id] = module.permissions.map((p) => p.permission_id)
    })

    return initialState
  })

  // Kiểm tra & checked input các permission đang có
  const isPermissionChecked = (module_id: string, permission_id: string) => {
    if (account.role.name === 'Super Admin') {
      return true
    }

    return checkedPermissions[module_id]?.includes(permission_id) ?? false
  }

  const handlePermissionChange = (module_id: string, permissionId: string) => {
    setCheckedPermissions((prevState) => {
      const currentPermissions = prevState[module_id] || []

      if (currentPermissions.includes(permissionId)) {
        // Nếu permission đã được chọn, bỏ chọn nó
        return {
          ...prevState,
          [module_id]: currentPermissions.filter((id) => id !== permissionId)
        }
      } else {
        // Nếu permission chưa được chọn, thêm nó vào
        return {
          ...prevState,
          [module_id]: [...currentPermissions, permissionId]
        }
      }
    })
  }

  const handleUpdateAccoutn = handleSubmit((data) => {
    // Lấy danh sách các module kèm với các permissions đã chọn
    const selectedModules = modules.map((module) => ({
      name: module.name,
      permissions: permissions
        .filter((permission) => isPermissionChecked(module.module_id, permission.permission_id))
        .map((permission) => ({
          name: permission.name
        }))
    }))

    console.log(selectedModules)

    const dataUpdate = {
      account_id: account.account_id,
      account: {
        user: data,
        modules: selectedModules
      }
    }

    updateAccountMutation.mutate(dataUpdate, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['accounts'] })
        toast.success('Cập nhật tài khoản thành công')
        setShowEditAccount(false)
      }
    })
  })

  return (
    <form onSubmit={handleUpdateAccoutn} className='p-5'>
      <h1 className='mb-7 mt-5 text-xl font-medium text-gray-700'>Cập nhật tài khoản "{account.username}" </h1>
      <div className='grid grid-cols-4 gap-5'>
        <div className='input-container relative col-span-2'>
          <input
            {...register('username')}
            type='text'
            placeholder=''
            defaultValue={account.username}
            className={classNames(
              'peer w-full !border-gray-300 !bg-white !py-[12px] transition-colors focus:!border-[#8c57ff] focus:outline-none',
              {
                '!border-red-500 focus:!border-red-500': errors.username
              }
            )}
          />
          <label
            className={classNames(
              'absolute left-4 top-[12px] cursor-text bg-white text-[15px] text-gray-600 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#8c57ff]',
              {
                '!text-red-500': errors.username
              }
            )}
          >
            Tên người dùng
          </label>
          <span className='ml-1 mt-1 block text-sm text-red-500'>{errors.username?.message}</span>
        </div>
        <div className='input-container relative col-span-2'>
          <input
            {...register('phone_number')}
            type='text'
            defaultValue={account.phone_number}
            placeholder=''
            className={classNames(
              'peer w-full !border-gray-300 !bg-white !py-[12px] transition-colors focus:!border-[#8c57ff] focus:outline-none',
              {
                '!border-red-500 focus:!border-red-500': errors.phone_number
              }
            )}
          />
          <label
            className={classNames(
              'absolute left-4 top-[12px] cursor-text bg-white text-[15px] text-gray-600 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#8c57ff]',
              {
                '!text-red-500': errors.phone_number
              }
            )}
          >
            Số điện thoại
          </label>
          <span className='ml-1 mt-1 block text-sm text-red-500'>{errors.phone_number?.message}</span>
        </div>
        <div className='input-container relative col-span-2'>
          <input
            {...register('address')}
            type='text'
            defaultValue={account.address}
            placeholder=''
            className={classNames(
              'peer w-full !border-gray-300 !bg-white !py-[12px] transition-colors focus:!border-[#8c57ff] focus:outline-none',
              {
                '!border-red-500 focus:!border-red-500': errors.address
              }
            )}
          />
          <label
            className={classNames(
              'absolute left-4 top-[12px] cursor-text bg-white text-[15px] text-gray-600 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#8c57ff]',
              {
                '!text-red-500': errors.address
              }
            )}
          >
            Địa chỉ
          </label>
          <span className='ml-1 mt-1 block text-sm text-red-500'>{errors.address?.message}</span>
        </div>
        <div className='input-container relative '>
          <select
            {...register('role_id')}
            defaultValue={account.role.role_id}
            className={classNames(
              'peer w-full !border-gray-300 !bg-white !py-[12px] transition-colors focus:!border-[#8c57ff] focus:outline-none',
              {
                '!border-red-500 focus:!border-red-500': false
              }
            )}
          >
            <option value='super-admin'>Super Admin</option>
            <option value='manager-admin'>User Admin</option>
            <option value='support-admin'>Support Admin</option>
            <option value='viewer-admin'>Viewer Admin</option>
            <option value='editor-admin'>Viewer Admin</option>
            <option value='Editor Admin'>Viewer Admin</option>
          </select>
          <label
            className={classNames(
              'absolute left-4 top-[12px] cursor-text bg-white text-[15px] text-gray-600 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#8c57ff]',
              {
                '!text-red-500': errors.role_id
              }
            )}
          >
            Vai trò
          </label>
        </div>
        <div className='input-container relative'>
          <select
            {...register('status')}
            defaultValue={'active'}
            className={classNames(
              'peer w-full !border-gray-300 !bg-white !py-[12px] transition-colors focus:!border-[#8c57ff] focus:outline-none',
              {
                '!border-red-500 focus:!border-red-500': errors.role_id
              }
            )}
          >
            <option value='Đang hoạt động'>Đang hoạt động</option>
            <option value='Ngừng hoạt động'>Ngừng hoạt động</option>
            <option value='Đóng băng'>Đóng băng</option>
            <option value='Khóa vĩnh viễn'>Khóa vĩnh viễn</option>
          </select>
          <label
            className={classNames(
              'absolute left-4 top-[12px] cursor-text bg-white text-[15px] text-gray-600 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#8c57ff]',
              {
                '!text-red-500': errors.status
              }
            )}
          >
            Trạng thái
          </label>
        </div>
      </div>
      <div className='mb-5 mt-7'>
        <h1 className='text-xl font-medium text-gray-700'>Quyền của vai trò</h1>
        <span>
          Chọn tất cả <input type='checkbox' />
        </span>
      </div>
      {modules.map((module) => (
        <div key={module.module_id} className='flex items-center justify-between py-4 text-[15px]'>
          <label htmlFor='' className=''>
            {module.name}
          </label>
          <div className='flex items-center gap-7'>
            {permissions.map((permission) => (
              <div key={permission.permission_id} className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={isPermissionChecked(module.module_id, permission.permission_id)}
                  onChange={() => handlePermissionChange(module.module_id, permission.permission_id)}
                  className='!border-1 h-[17px] w-[17px] cursor-pointer rounded-sm !border-gray-300'
                />
                <label htmlFor=''>{permission.display_name}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className='mt-5 w-full rounded bg-[#7367f0] py-2.5 text-white'>Lưu thay đổi</button>
    </form>
  )
}

export default AccountEdit
