import React, { useEffect, useMemo, useState } from 'react'
import MyFriendItem from './components/MyFriendItem'
import useQuerySearchFriends from '~/hooks/queries/user/useQuerySearchFriends'
import _ from 'lodash'
import { useQueryClient } from '@tanstack/react-query'
import useQueryListMyFriends from '~/hooks/queries/user/useQueryListMyFriends'
import useUserConfigParams from '~/hooks/user/useUserConfigParams'
import Pagination from '~/components/Pagination'
import { ENDPOINT } from '~/constants/endpoint.constant'

function MyFriends() {
  // Hooks
  const [searchValue, setSearchValue] = useState<string>('')
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const userConfigParams = useUserConfigParams()

  // React Query
  const queryClient = useQueryClient()
  const { data: resListMyFriends } = useQueryListMyFriends(userConfigParams)
  const { data: resSearchFriends } = useQuerySearchFriends(searchValue)

  useEffect(() => {
    if (resSearchFriends) {
      queryClient.setQueryData(['my_friends', userConfigParams], resSearchFriends)
    } else if (searchValue === '' && hasSearched) {
      queryClient.invalidateQueries({ queryKey: ['my_friends', userConfigParams] })
    }
  }, [searchValue, resSearchFriends, queryClient])

  // nếu không có useMemo -> debounce tạo lại mỗi khi re-render
  const debounceFn = useMemo(() => _.debounce(handleDebounceFn, 1000), [])

  function handleDebounceFn(searchValue: string) {
    setSearchValue(searchValue)
    setHasSearched(searchValue === '')
  }

  // Thay đổi giá trị tìm kiếm
  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceFn(e.target.value)
  }

  // Phân trang
  const pages = resListMyFriends?.data.data.pages ?? 1
  const total = resListMyFriends?.data.data.total

  // Danh sách bạn bè
  const friends = resListMyFriends?.data.data.friends ?? []
  const listSearch = resSearchFriends?.data.data.friends

  return (
    <div className='w-full pb-3'>
      <div className='flex items-center justify-between'>
        {listSearch ? (
          <h1>
            Kết quả tìm kiếm:
            <span className='font-semibold'> {listSearch.length}</span>
            <span className='text-gray-800'> bạn bè</span>
          </h1>
        ) : (
          <h1>
            <span className='font-semibold'>{total}</span> <span className='text-gray-800'>bạn bè</span>
          </h1>
        )}

        <div className='relative min-w-80 text-gray-600'>
          <input
            className='h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-5 pr-16 text-sm focus:outline-none'
            type='text'
            placeholder='Tìm kiếm bạn bè ...'
            style={{ border: '1px solid #ddd' }}
            onChange={handleChangeSearchValue}
          />
          <button type='submit' className='absolute -top-2 right-0 mr-4 mt-5'>
            <svg
              className='h-4 w-4 fill-current text-gray-600'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              version='1.1'
              id='Capa_1'
              x='0px'
              y='0px'
              viewBox='0 0 56.966 56.966'
              xmlSpace='preserve'
              width='512px'
              height='512px'
            >
              <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
            </svg>
          </button>
        </div>
      </div>
      <div className='mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4'>
        {friends.map((friend) => (
          <MyFriendItem friend={friend} key={friend.user_id} />
        ))}
      </div>
      {/* Pagination */}
      {resSearchFriends?.data.data.friends.length !== 0 && total !== 0 && (
        <Pagination basePath={ENDPOINT.PROFILE_MYFRIENDS} configParams={userConfigParams} pages={pages} />
      )}
    </div>
  )
}

export default React.memo(MyFriends)
