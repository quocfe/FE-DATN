import { IonIcon } from '@ionic/react'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import useQuerySearchAll from '~/hooks/queries/common/useQuerySearchAll'
import SearchItem from './SearchItem'

interface Props {
  profile: UserProfile | null
}

function Search({ profile }: Props) {
  const [searchValue, setSearchValue] = useState<string>('')
  const { data } = useQuerySearchAll(searchValue)

  // debounce với useMemo -> tạo 1 lần
  // nếu không có useMemo -> debounce tạo lại mỗi khi re-render
  const debounceFn = useMemo(() => _.debounce(handleDebounceFn, 1000), [])

  function handleDebounceFn(searchValue: string) {
    setSearchValue(searchValue)
  }

  // Thay đổi giá trị tìm kiếm
  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceFn(e.target.value)
  }

  // Danh sách tìm kiếm (user | fanpage)
  const listSearch = data?.data.data.list ?? []

  return (
    <>
      <div
        id='search--box'
        className='left-0 z-20 w-screen overflow-hidden rounded-xl bg-secondery max-md:hidden max-sm:fixed max-sm:top-2 sm:relative sm:w-96 xl:w-[680px] dark:!bg-white/5'
        tabIndex={0}
        aria-haspopup='true'
        aria-expanded='false'
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
                <button type='button' className='text-blue-500'>
                  Xóa tất cả
                </button>
              </div>
              <nav className='text-sm font-medium text-black dark:text-white'>
                <a
                  href='#!'
                  className=' relative flex items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <img src={profile?.Profile.profile_picture} className='h-9 w-9 rounded-full object-cover' alt='' />
                  <div>
                    <div> Jesse Steeve </div>
                    <div className='mt-0.5 text-xs font-medium text-blue-500'> Friend </div>
                  </div>
                  <IonIcon
                    icon='close'
                    className='md hydrated absolute right-3 top-1/2 -translate-y-1/2 text-base'
                    role='img'
                    aria-label='close'
                  />
                </a>
                <a
                  href='#!'
                  className=' relative flex items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <img src={profile?.Profile.profile_picture} className='h-9 w-9 rounded-full object-cover' alt='' />
                  <div>
                    <div> Martin Gray </div>
                    <div className='mt-0.5 text-xs font-medium text-blue-500'> Friend </div>
                  </div>
                  <IonIcon
                    icon='close'
                    className='md hydrated absolute right-3 top-1/2 -translate-y-1/2 text-base'
                    role='img'
                    aria-label='close'
                  />
                </a>
                <a
                  href='#!'
                  className=' relative flex items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <img
                    src='/src/assets/images/group/group-2.jpg'
                    className='h-9 w-9 rounded-full object-cover'
                    alt=''
                  />
                  <div>
                    <div> Delicious Foods</div>
                    <div className='mt-0.5 text-xs font-medium text-rose-500'> Group </div>
                  </div>
                  <IonIcon
                    icon='close'
                    className='md hydrated absolute right-3 top-1/2 -translate-y-1/2 text-base'
                    role='img'
                    aria-label='close'
                  />
                </a>
                <a
                  href='#!'
                  className=' relative flex items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <img
                    src='/src/assets/images/group/group-1.jpg'
                    className='h-9 w-9 rounded-full object-cover'
                    alt=''
                  />
                  <div>
                    <div> Delicious Foods</div>
                    <div className='mt-0.5 text-xs font-medium text-yellow-500'> Page </div>
                  </div>
                  <IonIcon
                    icon='close'
                    className='md hydrated absolute right-3 top-1/2 -translate-y-1/2 text-base'
                    role='img'
                    aria-label='close'
                  />
                </a>
                <a
                  href='#!'
                  className=' relative flex items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <img
                    src='/src/assets/images/avatars/avatar-6.jpg'
                    className='h-9 w-9 rounded-full object-cover'
                    alt=''
                  />
                  <div>
                    <div> John Welim </div>
                    <div className='mt-0.5 text-xs font-medium text-blue-500'> Friend </div>
                  </div>
                  <IonIcon
                    icon='close'
                    className='md hydrated absolute right-3 top-1/2 -translate-y-1/2 text-base'
                    role='img'
                    aria-label='close'
                  />
                </a>
                <a
                  href='#!'
                  className='relative flex  hidden items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <IonIcon
                    icon='search-outline'
                    className='md hydrated text-2xl'
                    role='img'
                    aria-label='search outline'
                  />
                  Creative ideas about Business
                </a>
                <a
                  href='#!'
                  className='relative flex hidden   items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <IonIcon
                    icon='search-outline'
                    className='md hydrated text-2xl'
                    role='img'
                    aria-label='search outline'
                  />
                  8 Facts About Writting
                </a>
              </nav>
            </>
          ) : listSearch.length === 0 ? (
            <div className='mt-5 text-center text-sm'>
              Không tìm thấy kết quả nào với từ khóa: <span className='font-medium text-primary'>{searchValue}</span>
            </div>
          ) : (
            <nav className='text-sm font-medium text-black dark:text-white'>
              {listSearch.map((user) => (
                <SearchItem key={user.user_id} user={user} />
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
