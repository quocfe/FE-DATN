import Modal from '~/components/Modal'
import AccountEdit from '../../AccountEdit'
import { useState } from 'react'

interface Props {
  account: Account
  index: number
}

function AccountItem({ account, index }: Props) {
  const [showEditAccount, setShowEditAccount] = useState<boolean>(false)
  return (
    <>
      <Modal isVisible={showEditAccount} onClose={() => setShowEditAccount(false)}>
        <AccountEdit account={account} setShowEditAccount={setShowEditAccount} />
      </Modal>
      <tr>
        <td className='whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200'>
          <div className='inline-flex items-center gap-x-3'>
            <input
              type='checkbox'
              className='rounded border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900'
            />
            <span># {++index}</span>
          </div>
        </td>
        <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
          <div className='flex items-center gap-x-2'>
            <img className='h-8 w-8 rounded-full object-cover' src={account.profile_picture} alt='' />
            <div>
              <h2 className='text-sm font-medium text-gray-800 dark:text-white '>{account.username}</h2>
              <p className='text-[12.5px] font-normal text-gray-600 dark:text-gray-400'>{account.email}</p>
            </div>
          </div>
        </td>
        <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>{account.role.name}</td>
        <td className='max-w-[430px] whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
          <div className='flex flex-wrap gap-2'>
            {account.role.name !== 'Super Admin' && (
              <>
                {account.modules.map((module) => {
                  return (
                    <div
                      key={module.module_id}
                      className='rounded-xl bg-[#7367f0] px-1.5 py-1 text-center text-xs text-white'
                    >
                      {module.name}
                    </div>
                  )
                })}
              </>
            )}
            {account.modules.length === 0 && account.role.name !== 'Super Admin' && <p>Chưa cấp quyền nào </p>}
            {account.role.name === 'Super Admin' && (
              <div className='rounded-xl bg-[#7367f0] px-1.5 py-1 text-center text-xs text-white'>Full Permissions</div>
            )}
          </div>
        </td>
        <td className='whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700'>
          <div className='inline-flex items-center gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-emerald-500 dark:bg-gray-800'>
            <svg width={12} height={12} viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10 3L4.5 8.5L2 6'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <h2 className='text-[13px] font-normal'>Hoạt động</h2>
          </div>
        </td>
        <td className='whitespace-nowrap px-4 py-4 text-sm'>
          <div className='flex items-center gap-x-4'>
            <i className='fa-solid fa-ban text-base text-red-400'></i>
            <i
              onClick={() => setShowEditAccount(true)}
              className='fa-solid fa-user-pen cursor-pointer text-base text-[#7367f0]'
            ></i>
          </div>
        </td>
      </tr>
    </>
  )
}

export default AccountItem
