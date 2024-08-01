import useQueryListRoles from '~/hooks/queries/role/useQueryListRoles'
import RoleItem from './components/RoleItem'
import Modal from '~/components/Modal'
import AddRole from '../AddRole'
import { useState } from 'react'

function ListRole() {
  const [showModalAddRole, setShowModalAddRole] = useState<boolean>(false)
  const { data } = useQueryListRoles()
  const roles = data?.data.data.roles ?? []

  return (
    <>
      <Modal isVisible={showModalAddRole} onClose={() => setShowModalAddRole(false)} width='625px'>
        <AddRole setShowModalAddRole={setShowModalAddRole} />
      </Modal>
      <div className='mb-6 flex gap-2 text-sm text-gray-500'>
        <span>Admin</span>
        <span>/</span>
        <span>Vai trò và quyền</span>
        <span>/</span>
        <span className='text-gray-800'>Danh sách vai trò</span>
      </div>
      <button
        onClick={() => setShowModalAddRole(true)}
        className='mb-5 rounded-md bg-[#7367f0] px-4 py-2 text-sm text-white'
      >
        Thêm vai trò
      </button>
      <div className='grid grid-cols-3 gap-5 text-[15px]'>
        {roles.map((role) => (
          <RoleItem role={role} key={role.role_id} />
        ))}
      </div>
    </>
  )
}

export default ListRole
