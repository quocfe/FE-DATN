import React, { memo, useEffect, useState } from 'react'
import useConversationStore from '~/store/conversation.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import useMutaionSearchFriend from '../hooks/useMutaion/useMutationSearchFriend'
import { useQueryFriends } from '../hooks/useQuery/useQueryFriends'
import { useQueryFriendSuggestGm } from '../hooks/useQuery/useQueryFriendSuggestGm'
import { useQueryMembers } from '../hooks/useQuery/useQueryMembers'

interface FriendProps {
  listUser: string[]
  querySearch: string
  setListUser: React.Dispatch<React.SetStateAction<string[]>>
  type?: string
}

const Friend: React.FC<FriendProps> = ({ listUser, setListUser, querySearch, type }) => {
  const [resultSearch, setResultSearch] = useState<any>([])
  const { selectedConversation } = useConversationStore()
  const searchMutaion = useMutaionSearchFriend()
  const { data: memberSuggest } = useQueryFriends()
  const { data: memberGroup } = useQueryMembers(selectedConversation.group_id, type as string)
  const { data: memberSuggestGMsg } = useQueryFriendSuggestGm(selectedConversation.group_id)
  const profile = getProfileFromLocalStorage() || {}
  const [currentUserSelect, setCurrentUserSelect] = useState<string[]>([profile.user_id])

  let arrMembers
  switch (type) {
    case 'addMember':
      arrMembers = memberSuggestGMsg?.data?.data
      break
    case 'createGroup':
      arrMembers = memberSuggest?.data?.data?.friends
      break
    case 'changeRole':
      arrMembers = memberGroup?.data?.data.filter((member) => member.role === false)
      break
    default:
      break
  }

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
    } else if (type === 'createGroup') {
      setListUser((prevList: string[]) =>
        prevList.includes(user.user_id) ? prevList.filter((id) => id !== user.user_id) : [...prevList, user.user_id]
      )
    } else {
      setListUser(user.user_id)
    }

    setCurrentUserSelect((prevList: string[]) =>
      prevList.includes(user.user_id) ? prevList.filter((id) => id !== user.user_id) : [...prevList, user.user_id]
    )
  }

  return (
    <div className={`${type === 'addMember' ? 'mt-0' : 'mt-2'} border-t `}>
      {type === 'createGroup' && (
        <div className='flex items-center gap-2 border-b py-2'>
          <img
            src={profile.Profile.profile_picture}
            alt=''
            className='h-6 w-6 shrink-0 cursor-pointer rounded-full object-cover shadow sm:h-9 sm:w-9'
          />
          {currentUserSelect.map((currentUser) =>
            memberSuggest?.data?.data.friends
              .filter((member) => member.user_id === currentUser)
              .map((member) => (
                <img
                  key={member.user_id}
                  src={member.Profile?.profile_picture}
                  alt=''
                  className='h-6 w-6 shrink-0 cursor-pointer rounded-full object-cover shadow sm:h-9 sm:w-9'
                />
              ))
          )}
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
                  onClick={() => handleCheckboxChange(item)}
                  htmlFor={item.user_id}
                  className='ms-2 flex w-full select-none items-center gap-2 p-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  <img
                    src={item.Profile?.profile_picture}
                    className='h-7 w-7 shrink-0 rounded-full object-cover shadow sm:h-9 sm:w-9'
                  />
                  <p className='text-sm'>{item.first_name + ' ' + item.last_name}</p>
                </label>
              </div>
            ))}
          </>
        ) : (
          <>
            <p className='mt-2 text-sm'>Gợi ý</p>
            {arrMembers?.map((item: any, index: number) => (
              <div key={index} className='mb-4 flex items-center p-2 shadow-sm'>
                <input
                  id={type === 'changeRole' ? `radio_${item.user_id}` : item.user_id}
                  type={type === 'changeRole' ? 'radio' : 'checkbox'}
                  value={item.user_id}
                  className='h-4 w-4 rounded-full'
                  name={type === 'changeRole' ? 'default-radio' : ''}
                />
                <label
                  onClick={() => handleCheckboxChange(item)}
                  htmlFor={type === 'changeRole' ? `radio_${item.user_id}` : item.user_id}
                  className='ms-2 flex w-full select-none items-center gap-2 p-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  <img
                    src={item.Profile?.profile_picture || item?.avatar}
                    className='h-7 w-7 shrink-0 rounded-full object-cover shadow sm:h-9 sm:w-9'
                  />
                  <p className='text-sm'>
                    {type != 'changeRole' ? item.first_name + ' ' + item.last_name : item.fullname}
                  </p>
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
