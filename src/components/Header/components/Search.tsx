import { IonIcon } from '@ionic/react'
import _ from 'lodash'
import { useMemo, useRef, useState } from 'react'
import useQuerySearchAll from '~/hooks/queries/common/useQuerySearchAll'
import SearchItem from './SearchItem'
import useQuerySearchHistories from '../hooks/useQuerySearchHistories'
import Dialog from '~/components/Dialog'
import useMutationClearSearchHistories from '../hooks/useMutationClearSearchHistories'

interface Props {
  profile: UserProfile | null
}

function Search({ profile }: Props) {
  // Hooks
  // const [showDialog, setShowdialog] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(() => {
    return localStorage.getItem('isSearchFocused') === 'true'
  })

  // React Query
  const { data: resSearchAll } = useQuerySearchAll(searchValue)
  const { data: resSearchHistories } = useQuerySearchHistories(isSearchFocused)
  const clearSearchHistoriesMutation = useMutationClearSearchHistories()

  const debounceFn = useMemo(() => _.debounce(handleDebounceFn, 1000), [])

  function handleDebounceFn(searchValue: string) {
    setSearchValue(searchValue)
  }

  // Thay đổi giá trị tìm kiếm
  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceFn(e.target.value)
  }

  const handleFocus = () => {
    if (!isSearchFocused) {
      setIsSearchFocused(true)
      localStorage.setItem('isSearchFocused', 'true')
    }
  }

  const handleClearSearchHistories = () => {
    clearSearchHistoriesMutation.mutate()
  }

  // Danh sách tìm kiếm (user | fanpage)
  const listSearch = resSearchAll?.data.data.list ?? []
  const listSearchHistories = resSearchHistories?.data.data.list ?? []

  return (
    <>
      {/* <Dialog
        isVisible={showDialog}
        onClose={() => setShowdialog(false)}
        title='Xóa tất cả lượt tìm kiếm và lượt truy cập?'
        description='Hành động này sẽ xóa gỡ toàn bộ lịch sử tìm kiếm trên mọi thiết bị và không thể hoàn tác được!'
        type='warning'
        textBtn='Xóa tất cả'
      /> */}
      <div
        id='search--box'
        className='left-0 z-20 w-screen overflow-hidden rounded-xl bg-secondery max-md:hidden max-sm:fixed max-sm:top-2 sm:relative sm:w-96 xl:w-[680px] dark:!bg-white/5'
        tabIndex={0}
        aria-haspopup='true'
        aria-expanded='false'
        onFocus={handleFocus}
      >
        <IonIcon
          icon='search'
          className='md hydrated absolute left-4 top-1/2 -translate-y-1/2'
          role='img'
          aria-label='search'
        />

        <input
          type='text'
          placeholder='Bạn bè, Fanpage, Video ..'
          className='h-12 w-full !bg-transparent !pl-10 !text-sm !font-normal'
          onChange={handleChangeSearchValue}
        />
      </div>

      <div
        className='uk- open uk-drop z-10 hidden'
uk-drop='pos: bottom-center ; animation: uk-animation-slide-bottom-small;mode:click '
      >
        <div className='dark:bg-dark3 -mt-14 w-screen rounded-lg bg-white p-2 pt-14 shadow-lg sm:w-96 xl:w-[694px]'>
          {searchValue === '' ? (
            <>
              <div className='flex justify-between px-2 py-2.5 text-sm font-medium'>
                <div className=' text-black dark:text-white'>Gần đây</div>
                {listSearchHistories.length !== 0 && (
                  <button onClick={handleClearSearchHistories} type='button' className='text-blue-500'>
                    Xóa tất cả
                  </button>
                )}
              </div>
              {listSearchHistories.length !== 0 ? (
                <>
                  <nav className='text-sm font-medium text-black dark:text-white'>
                    {listSearchHistories.map((user) => (
                      <SearchItem key={user.user_id} user={user} isHistory={true} />
                    ))}
                  </nav>
                </>
              ) : (
                <p className='pb-2 text-center text-sm'>Lịch sử tìm kiếm hiện đang trống!</p>
              )}
            </>
          ) : listSearch.length === 0 ? (
            <div className='mt-5 text-center text-sm'>
              Không tìm thấy kết quả nào với từ khóa: <span className='font-medium text-primary'>{searchValue}</span>
            </div>
          ) : (
            <nav className='text-sm font-medium text-black dark:text-white'>
              {listSearch.map((user) => (
                <SearchItem key={user.user_id} user={user} isHistory={false} />
              ))}
            </nav>
          )}

          <hr className='-mx-2 mt-2 hidden' />
          <div className='flex hidden justify-end pr-2 text-sm font-medium text-red-500'>
            <a href='#!' className='flex rounded p-1.5 hover:bg-red-50 dark:hover:bg-slate-700'>
              <IonIcon icon='trash' className='md hydrated mr-2 text-lg' role='img' aria-label='trash' />
              Clear your history
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
