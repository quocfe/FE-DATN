import { IonIcon } from '@ionic/react'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Dialog from '~/components/Dialog'
import useMutationDeleteRole from '~/hooks/mutations/role/useMutationDeleteRole'
import useAuthStore from '~/store/auth.store'
import { isAxiosError } from '~/utils/utils'

interface Props {
  role: Role
}

function RoleItem({ role }: Props) {
  const [showDeleteRole, setShowDeleteRole] = useState<boolean>(false)
  const { profile } = useAuthStore()
  const { accounts } = role
  const isCurrentRole = role?.role_id && profile?.role?.role_id && role.role_id === profile.role.role_id

  const queryClient = useQueryClient()
  const deleteRoleMutation = useMutationDeleteRole()

  const handleDeleteRole = () => {
    deleteRoleMutation.mutate(role.role_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['roles'] })
        toast.success(`Xóa vai trò "${role.name}" thành công`)
        setShowDeleteRole(false)
      },
      onError: (error) => {
        if (isAxiosError<ErrorResponse>(error)) {
          if (error.response) {
            const message = error.response.data.message
            toast.error(message)
            setShowDeleteRole(false)
          }
        }
      }
    })
  }

  return (
    <>
      <Dialog
        isVisible={showDeleteRole}
        onClose={() => setShowDeleteRole(false)}
        type='warning'
        description={`Bạn sắp xóa vai trò "${role.name}". Hành động này có thể ảnh hưởng đến các tài khoản người dùng đang được gán vai trò này.`}
        title={`Xác nhận xóa vai trò "${role.name}"`}
        textBtn='Xóa vai trò'
        callback={handleDeleteRole}
      />
      <div className='rounded-md bg-white p-5 shadow-md'>
        <div className=''>
          <div className='flex items-center justify-between'>
            <div>{accounts.length > 0 ? `Tổng ${accounts.length} người dùng` : 'Chưa có người dùng'}</div>
            <div className='flex h-[40px]'>
              {accounts.slice(0, 3).map((account, index) => {
                // Kiểm tra nếu `role` và `profile.role` tồn tại và có `role_id`

                return (
                  <div key={index} className='-ml-2 h-10 w-10 overflow-hidden rounded-full border'>
                    <img className='h-full w-full object-cover' src={account.profile_picture} alt='' />
                  </div>
                )
              })}
              {accounts.length > 3 && (
                <div className='-ml-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200'>
                  <span className='font-medium'>+ {accounts.length - 3}</span>
                </div>
              )}
            </div>
          </div>
          <h2
            className={classNames('pb-3 pt-2 text-lg font-medium', {
              '!text-[#7367f0]': isCurrentRole
            })}
          >
            {role.name} {isCurrentRole && <span className='text-sm font-normal text-gray-600'>(vai trò của bạn)</span>}
          </h2>
          <p className='mb-3 line-clamp-2 h-[45px]'>{role.description}</p>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <button className='text-[#7367f0]'>Chỉnh sửa</button>
              <button className='text-[#f0676c]' onClick={() => setShowDeleteRole(true)}>
                Xóa
              </button>
            </div>
            <IonIcon icon='copy-outline' className='cursor-auto text-xl'></IonIcon>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoleItem
