import useQueryListAccounts from '~/hooks/queries/account/useQueryListAccounts'
import AccountItem from '../User/AccountList/components/AccountItem'

function AccountList() {
  const { data } = useQueryListAccounts()

  const accounts = data?.data.data.accounts ?? []

  return (
    <>
      <div className='mb-6 flex gap-2 text-sm text-gray-500'>
        <span>Admin</span>
        <span>/</span>
        <span>Quản lý tài khoản</span>
        <span>/</span>
        <span className='text-gray-800'>Danh sách tài khoản</span>
      </div>
      <button className='mb-5 rounded-md bg-[#7367f0] px-4 py-2 text-sm text-white'>Thêm tài khoản & Cấp quyền</button>
      {/* Content */}
      <div className=''>
        {/* Table Users */}
        <section className='container mx-auto'>
          <div className='flex flex-col'>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden border border-gray-200 md:rounded-lg dark:border-gray-700'>
                  <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                    <thead className='bg-gray-50 dark:bg-gray-800'>
                      <tr>
                        <th
                          scope='col'
                          className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                        >
                          <div className='flex items-center gap-x-3'>
                            <input
                              type='checkbox'
                              className='rounded border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900'
                            />
                            <button className='flex items-center gap-x-2'>
                              <span>ID</span>
                              <svg className='h-3' viewBox='0 0 10 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                  d='M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z'
                                  fill='currentColor'
                                  stroke='currentColor'
                                  strokeWidth='0.1'
                                />
                                <path
                                  d='M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z'
                                  fill='currentColor'
                                  stroke='currentColor'
                                  strokeWidth='0.1'
                                />
                                <path
                                  d='M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z'
                                  fill='currentColor'
                                  stroke='currentColor'
                                  strokeWidth='0.3'
                                />
                              </svg>
                            </button>
                          </div>
                        </th>
                        <th
                          scope='col'
                          className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                        >
                          Người dùng
                        </th>
                        <th
                          scope='col'
                          className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                        >
                          Vai trò
                        </th>
                        <th
                          scope='col'
                          className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                        >
                          Quyền
                        </th>
                        <th
                          scope='col'
                          className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                        >
                          Trạng thái
                        </th>
                        <th
                          scope='col'
                          className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                        >
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900'>
                      {accounts.map((account, index) => (
                        <AccountItem account={account} index={index} key={account.account_id} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center justify-between'>
            <a
              href='#'
              className='flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-5 w-5 rtl:-scale-x-100'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
              </svg>
              <span>Trang đầu</span>
            </a>
            <div className='hidden items-center gap-x-3 md:flex'>
              <a href='#' className='rounded-md bg-blue-100/60 px-2 py-1 text-sm text-blue-500 dark:bg-gray-800'>
                1
              </a>
              <a
                href='#'
                className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              >
                2
              </a>
              <a
                href='#'
                className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              >
                3
              </a>
              <a
                href='#'
                className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              >
                ...
              </a>
              <a
                href='#'
                className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              >
                12
              </a>
              <a
                href='#'
                className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              >
                13
              </a>
              <a
                href='#'
                className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              >
                14
              </a>
            </div>
            <a
              href='#'
              className='flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
            >
              <span>Trang cuối</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-5 w-5 rtl:-scale-x-100'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3' />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export default AccountList
