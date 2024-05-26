import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import authApi from '~/apis/auth.api'
import { getProfileFromLocalStorage } from '~/utils/auth'

interface FriendProps {
  listUser: string[]
  setListUser: React.Dispatch<React.SetStateAction<string[]>>
}

const ImgaeTemplate = 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg'

const Friend: React.FC<FriendProps> = ({ setListUser }) => {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: () => authApi.getUsers()
  })

  const profile = getProfileFromLocalStorage() || {}
  const [currentUserSelect, setCurrentUserSelect] = useState<string[]>([profile.profile_picture || ImgaeTemplate])

  const handleCheckboxChange = (user: any) => {
    console.log('click')
    setListUser((prevList: string[]) =>
      prevList.includes(user.user_id) ? prevList.filter((id) => id !== user.user_id) : [...prevList, user.user_id]
    )

    let checkImg = user.Profile?.profile_picture ? user.Profile.profile_picture : ImgaeTemplate
    setCurrentUserSelect((prevList: string[]) =>
      prevList.includes(checkImg) ? prevList.filter((id) => id !== checkImg) : [...prevList, checkImg]
    )
  }

  const handleTest = () => {
    console.log('test')
  }

  return (
    <div className='mt-2 border-t-2 border-gray-500'>
      <p onClick={handleTest}>click</p>
      <div className='my-2 flex gap-2'>
        {currentUserSelect.map((img) => (
          <img
            key={img}
            src={img}
            alt=''
            className='h-6 w-6 shrink-0 cursor-pointer rounded-full shadow sm:h-9 sm:w-9'
          />
        ))}
      </div>
      <p className='mt-2 text-sm'>Bạn bè</p>
      <div className='mt-3 flex min-h-[300px] flex-col overflow-y-auto'>
        {data?.data?.data?.map((item: any) => (
          <div key={item.user_id} className='mb-4 flex items-center p-2 shadow-sm'>
            <input id={item.user_id} type='checkbox' value={item.user_id} className='h-4 w-4 rounded-full' />
            <label
              htmlFor={item.user_id}
              className='ms-2 flex w-full select-none items-center gap-2 p-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              onClick={() => handleCheckboxChange(item)}
            >
              <img
                src={item.Profile?.profile_picture || ImgaeTemplate}
                className='h-7 w-7 shrink-0 rounded-full shadow sm:h-9 sm:w-9'
              />
              <p className='text-sm'>{item.first_name + ' ' + item.last_name}</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Friend
