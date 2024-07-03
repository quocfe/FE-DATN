import React, { memo, useEffect, useState } from 'react'
import { getProfileFromLocalStorage } from '~/utils/auth'
import useMutaionSearchFriend from '../hooks/useMutationSearchFriend'
import { useQueryFriends } from '../hooks/useQueryFriends'
import { useQueryFriendSuggestGm } from '../hooks/useQueryFriendSuggestGm'
import useConversationStore from '~/store/conversation.store'

interface FriendProps {
  listUser: string[]
  querySearch: string
  setListUser: React.Dispatch<React.SetStateAction<string[]>>
  type?: string
}

const Friend: React.FC<FriendProps> = ({ setListUser, querySearch, type }) => {
  const [resultSearch, setResultSearch] = useState<any>([])
  const { selectedConversation } = useConversationStore()
  const searchMutaion = useMutaionSearchFriend()
  const { data: memberSuggest } = useQueryFriends()
  const { data: memberSuggestGMsg } = useQueryFriendSuggestGm(selectedConversation.group_id)
  const profile = getProfileFromLocalStorage() || {}
  const [currentUserSelect, setCurrentUserSelect] = useState<string[]>([profile.Profile.profile_picture])
  const arrMembers = type === 'addMember' ? memberSuggestGMsg?.data?.data : memberSuggest?.data?.data?.friends

  useEffect(() => {
    searchMutaion.mutate(querySearch, {
      onSuccess: (data: any) => {
        setResultSearch(data)
      },
      onError: () => {
        setResultSearch([])
      }
    })
  }, [querySearch])

  useEffect(() => {
    setListUser([])
  }, [])

  const handleCheckboxChange = (user: any) => {
    if (type === 'addMember') {
      setListUser((prevList: string[]) =>
        prevList.includes(user) ? prevList.filter((userPrev) => userPrev !== user) : [...prevList, user]
      )
    } else {
      setListUser((prevList: string[]) =>
        prevList.includes(user.user_id) ? prevList.filter((id) => id !== user.user_id) : [...prevList, user.user_id]
      )
    }

    let checkImg = user.Profile?.profile_picture ? user.Profile.profile_picture : ''
    setCurrentUserSelect((prevList: string[]) =>
      prevList.includes(checkImg) ? prevList.filter((id) => id !== checkImg) : [...prevList, checkImg]
    )
  }

  return (
    <div className={`${type === 'addMember' ? 'mt-0' : 'mt-2'} border-t `}>
      {type != 'addMember' && (
        <div className='flex items-center gap-2 border-b py-2'>
          {currentUserSelect.map((img) => (
            <img
              key={img}
              src={img}
              alt=''
              className='h-6 w-6 shrink-0 cursor-pointer rounded-full shadow sm:h-9 sm:w-9'
            />
          ))}
        </div>
      )}

      <div className='mt-3 flex max-h-[200px] flex-col overflow-y-scroll'>
        {resultSearch?.data?.data?.friends && resultSearch?.data?.data?.friends.length !== 0 ? (
          <>
            <p className='mt-2 text-sm'>Bạn bè</p>
            {resultSearch?.data?.data?.friends?.map((item: any) => (
              <div key={item.user_id} className='mb-4 flex items-center p-2 shadow-sm'>
                <input id={item.user_id} type='checkbox' value={item.user_id} className='h-4 w-4 rounded-full' />
                <label
                  htmlFor={item.user_id}
                  className='ms-2 flex w-full select-none items-center gap-2 p-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  onClick={() => handleCheckboxChange(item)}
                >
                  <img
                    src={item.Profile?.profile_picture}
                    className='h-7 w-7 shrink-0 rounded-full shadow sm:h-9 sm:w-9'
                  />
                  <p className='text-sm'>{item.first_name + ' ' + item.last_name}</p>
                </label>
              </div>
            ))}
          </>
        ) : (
          <>
            <p className='mt-2 text-sm'>Gợi ý</p>
            {arrMembers?.map((item: any) => (
              <div key={item.user_id} className='mb-4 flex items-center p-2 shadow-sm'>
                <input id={item.user_id} type='checkbox' value={item.user_id} className='h-4 w-4 rounded-full' />
                <label
                  htmlFor={item.user_id}
                  className='ms-2 flex w-full select-none items-center gap-2 p-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  onClick={() => handleCheckboxChange(item)}
                >
                  <img
                    src={item.Profile?.profile_picture}
                    className='h-7 w-7 shrink-0 rounded-full shadow sm:h-9 sm:w-9'
                  />
                  <p className='text-sm'>{item.first_name + ' ' + item.last_name}</p>
                </label>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default memo(Friend)
