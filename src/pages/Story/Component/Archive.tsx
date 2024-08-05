import React, { useState, useEffect } from 'react'
import { IonIcon } from '@ionic/react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '~/components/Header'
import useMutationRemove from '../hook/useMutationRemove'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert' // Import thư viện
import 'react-confirm-alert/src/react-confirm-alert.css' // Import CSS của thư viện
import { Story } from '~/@types/story'
import useMutationRestore from './hook/userMutationArchive'
import useQueryArchive from './hook/useMutationGetArchived'

function ArchiveStory() {
  const [currentStory, setCurrentStory] = useState<Story | null>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const idSearch: any = searchParams.get('id')
  const storyId = searchParams.get('id')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const mutation = useMutationRemove()
  const queryClient = useQueryClient()
  const { data } = useQueryArchive()
  const restoreMutation = useMutationRestore()
  useEffect(() => {
    if (storyId) {
      setSelectedStoryId(storyId)

      const story = data?.data.data.story.find((story: Story) => story.story_id === storyId)

      setCurrentStory(story || null)
    }
  }, [storyId])

  const handleStoryClick = (story: Story) => {
    setCurrentStory(story)
    setShowDropdown(false)
    setSelectedStoryId(story.story_id)
    navigate({
      search: `?id=${story.story_id}`
    })
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  // Xóa tin
  const handelDelete = (data: any) => {
    // Hộp thoại xác nhận
    confirmAlert({
      title: 'Xác nhận Xóa',
      message: 'Bạn có chắc chắn muốn Xóa tin này không?',
      buttons: [
        {
          label: 'Có',
          onClick: () => {
            mutation.mutate(data, {
              onSuccess: () => {
                toast.success('Xóa tin thành công')
                queryClient.invalidateQueries()
                if (currentStory?.story_id === storyId) {
                  setCurrentStory(null) // Xóa currentStory nếu câu chuyện bị xóa
                }
              },
              onError: (error) => {
                console.log('Error delete story:', error)
              }
            })
          }
        },
        {
          label: 'Không',
          onClick: () => {}
        }
      ]
    })
  }
  // Sao chép đường link liên kết

  const handleMenuItemClick = (itemName: string) => {
    setSelectedItem(itemName)
    switch (itemName) {
      case 'Khôi phục':
        // Handle error action
        break
      case 'Xóa tin':
        // Handle close action
        break
      default:
        break
    }
  }

  const handleRestoreStory = (id: string | null) => {
    if (!id) return

    confirmAlert({
      title: 'Xác nhận khôi phục',
      message: 'Bạn có chắc chắn muốn khôi phục tin này không?',
      buttons: [
        {
          label: 'Có',
          onClick: () => {
            restoreMutation.mutate(id, {
              onSuccess: () => {
                toast.success('Khôi phục tin thành công!')
                queryClient.invalidateQueries()

                // Nếu story hiện tại đã được khôi phục thì chuyển sang tin tiếp theo hoặc đặt về null
                const remainingStories = data?.data.data.story.filter((story: Story) => story.story_id !== storyId)
                if (remainingStories && remainingStories.length > 0) {
                  const nextStory = remainingStories[0]
                  setCurrentStory(nextStory)
                  setSelectedStoryId(nextStory.story_id)
                  navigate({
                    search: `?id=${nextStory.story_id}`
                  })
                } else {
                  setCurrentStory(null)
                  setSelectedStoryId(null)
                  navigate({
                    search: ''
                  })
                }
              },
              onError: (error) => {
                console.log('Error restoring story:', error)
                toast.error('Khôi phục tin thất bại.')
              }
            })
          }
        },
        {
          label: 'Không',
          onClick: () => {
            // Không làm gì nếu người dùng chọn "Không"
          }
        }
      ]
    })
  }
  return (
    <>
      <Header />
      <div className='-m-2.4 relative top-12 overflow-hidden border dark:border-slate-700'>
        <div className='dark:bg-dark2 flex bg-white'>
          {/* sidebar */}
          <div className='relative border-r md:w-[360px] dark:border-slate-700'>
            <div
              id='side-chat'
              className='dark:bg-dark2 left-0 top-0 z-50 bg-white max-md:fixed max-md:h-screen max-md:w-5/6 max-md:-translate-x-full max-md:shadow'
            >
              {/* heading title */}
              <div className='border-b p-4 dark:border-slate-700'>
                <div className='mt-2 flex items-center justify-between'>
                  <h2 className='ml-1 text-3xl font-bold text-black dark:text-white'> Tin Lưu Trữ </h2>
                  {/* right action buttons */}
                  <div className='flex items-center gap-2.5'>
                    <button className='group'>
                      <IonIcon name='settings-outline' className='flex text-4xl group-aria-expanded:rotate-180' />
                    </button>
                    <div
                      className='w-full md:w-[270px]'
                      uk-dropdown='pos: bottom-left; offset:10; animation: uk-animation-slide-bottom-small'
                    >
                      <nav>
                        <a href='/story'>
                          <IonIcon className='-ml-1 shrink-0 text-4xl' name='checkmark-outline' /> Tin
                        </a>
                      </nav>
                    </div>

                    {/* mobile toggle menu */}
                    <button
                      type='button'
                      className='md:hidden'
                      uk-toggle='target: #side-chat ; cls: max-md:-translate-x-full'
                    >
                      <IonIcon name='chevron-down-outline' />
                    </button>
                  </div>
                </div>
                {/* search */}
              </div>
              {/* story list */}
              <div className='h-[calc(94vh-81px)] space-y-2 overflow-y-auto p-2 '>
                {data?.data.data.story.map((story) => (
                  <a
                    key={story.story_id}
                    href='#'
                    onClick={() => handleStoryClick(story)}
                    className={`relative flex items-center gap-4 rounded-xl p-2 duration-200 hover:bg-secondery ${
                      selectedStoryId === story.story_id ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                  >
                    <div className='relative h-14 w-14 shrink-0'>
                      <img src={story.content} alt='' className='h-full w-full rounded-full object-cover' />
                      <div className='absolute bottom-0 right-0 h-4 w-4 rounded-full border border-white dark:border-slate-800' />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <div className='mb-1.5 flex items-center gap-2'>
                        <div className='mr-auto text-sm font-medium text-black dark:text-white'>
                          {story.user.last_name} {story.user.first_name}
                        </div>
                        <div className='text-xs font-light text-gray-500 dark:text-white/70'>
                          {new Date(story.story_time).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            {/* overlay */}
            <div
              id='side-chat-overlay'
              className='fixed inset-0 z-40 h-full w-full bg-slate-100/40 backdrop-blur max-md:-translate-x-full md:hidden dark:bg-slate-800/40'
              uk-toggle='target: #side-chat ; cls: max-md:-translate-x-full'
            />
          </div>
          {/* Story center */}
          <div className='flex-1'>
            <div className='aspect-w-9 aspect-h-16 relative top-7 mx-auto flex h-[700px] w-[450px] items-center justify-center rounded-2xl bg-gray-300'>
              <button className='absolute right-4 top-4 z-20' onClick={toggleDropdown}>
                <IonIcon name='ellipsis-horizontal' className='text-2xl' />
              </button>
              {showDropdown && (
                <div className='dark:bg-dark2 absolute right-4 top-10 z-30 rounded-md bg-white p-2 shadow-md'>
                  <button
                    className={`block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700 ${
                      selectedItem === 'Gỡ tin' ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    onClick={() => handelDelete(idSearch)}
                    style={{ zIndex: '9999999999999999999999999999999999999999999' }}
                  >
                    Xóa tin
                  </button>

                  <button
                    className={`block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700 ${
                      selectedItem === 'Khôi phục tin ' ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    onClick={() => handleRestoreStory(idSearch)}
                  >
                    Khôi phục tin
                  </button>
                </div>
              )}

              {currentStory && (
                <Carousel
                  key={currentStory.story_id}
                  showThumbs={false}
                  showStatus={false}
                  showIndicators={false}
                  infiniteLoop={true}
                  className='flex-1'
                >
                  {currentStory.content.split(',').map((slide, index) => {
                    const isVideo = slide.match(/\.(mp4|webm|ogg)$/i)
                    return (
                      <div key={index} className='relative h-full w-full'>
                        {isVideo ? (
                          <video className='max-h-full max-w-full object-contain' controls src={slide} />
                        ) : (
                          <img
                            className='max-h-full max-w-full object-contain'
                            src={slide}
                            alt={`Slide ${index + 1}`}
                          />
                        )}
                      </div>
                    )
                  })}
                </Carousel>
              )}
              {currentStory && currentStory.text && (
                <div className='absolute bottom-10 left-0 right-0 p-6' justify-center>
                  <div className='dark:bg-dark3 rounded-lg bg-white p-2 shadow-lg'>
                    <p className='text-center text-black  dark:text-white'>{currentStory.text}</p>
                  </div>
                </div>
              )}
              <div className=' absolute bottom-0 right-0 flex flex-row items-center  space-x-3 p-4'>
                
                <div className='flex flex-row justify-center space-x-2'>
                 
                  <div className='group relative flex items-center space-x-1'>
                    <IonIcon name='eye-outline' className='text-3xl text-gray-600' />
                    <span className='absolute bottom-full mb-2 hidden rounded bg-black px-2 py-1 text-sm text-white group-hover:block'>
                      {currentStory?.story_view} lượt xem
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ArchiveStory
