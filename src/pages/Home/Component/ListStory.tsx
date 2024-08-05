import React, { useState } from 'react'
import { IonIcon } from '@ionic/react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import useMutationRemove from './hook/useMutationRemove'
import { toast } from 'react-toastify'
import CreateStory from './CreateStory'
import useQueryStory from './hook/useGetStory'

function ListStory({ handelCheckToggle }: any) {
  const [showCreateStory, setShowCreateStory] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const mutation = useMutationRemove()
  const { data, refetch } = useQueryStory()

  const toggleStory = () => {
    setShowCreateStory(true)
    handelCheckToggle(true)
  }

  const closeStory = () => {
    setShowCreateStory(false)
    handelCheckToggle(false)
    setRefresh(!refresh) // trigger refresh state
  }

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const handleCreate = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success('Story removed successfully')
        setTimeout(() => {
          window.location.reload()
        }, 450)
      },
      onError: (error) => {
        console.log('Error removing story:', error)
      }
    })
  }

  return (
    <>
      {showCreateStory && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50'>
          <CreateStory handelCheckToggle={handelCheckToggle} closeStory={closeStory} />
        </div>
      )}
      <ul
        id='default-carousel'
        data-carousel='slide'
        className='uk-slider-items relative w-[calc(100%+14px)]'
        uk-scrollspy='target: > li; cls: uk-animation-scale-up; delay: 20; repeat: true'
      >
        <li className='md:pr-3' uk-scrollspy-class='uk-animation-fade'>
          <div
            className='dark:bg-dark2 relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-dashed border-slate-300 bg-slate-200 md:h-16 md:w-16 dark:border-slate-700'
            onClick={toggleStory}
          >
            <IonIcon name='camera' className='text-2xl' />
          </div>
        </li>
        {data?.data?.data?.story?.map((items: any) => (
          <li
            onClick={() => navigate('/story?id=' + items.story_id)}
            key={items.story_id}
            className='pr-2 duration-300 hover:-rotate-2 hover:scale-[1.15] md:pr-3'
          >
            <div
              className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow duration-700 ease-in-out md:h-16 md:w-16 md:border-4 dark:border-slate-700'
              data-carousel-item
            >
              {items.content.endsWith('.mp4') || items.content.endsWith('.mov') || items.content.endsWith('.avi') ? (
                <img
                  src={`https://img.youtube.com/vi/${getVideoId(items.content)}/hqdefault.jpg`} // Thay thế URL thumbnail nếu cần
                  alt='Thumbnail video'
                  className='absolute h-full w-full object-cover'
                />
              ) : (
                <img src={items.content} alt='' className='absolute h-full w-full object-cover' />
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

// Hàm để lấy ID video từ URL nếu bạn muốn lấy thumbnail từ YouTube hoặc các nguồn khác
function getVideoId(url: string) {
  const urlParts = url.split('/')
  return urlParts[urlParts.length - 1].split('?')[0]
}

export default ListStory
