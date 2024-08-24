import React, { useState, useEffect } from 'react'
import { IonIcon } from '@ionic/react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '~/components/Header'
import useMutationRemove from './hook/useMutationRemove'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import useQueryStory from '../Home/Component/hook/useGetStory'
import { Story } from './../../@types/story.d'
import useMutationView from './hook/useMutationView'
import useMutationArchive from './hook/userMutationArchive'
import { getProfileFromLocalStorage } from '~/utils/auth'
import Dialog from '~/components/Dialog'

function DStory() {
  const [currentStory, setCurrentStory] = useState<Story | null>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const idSearch: any = searchParams.get('id')
  const storyId = searchParams.get('id')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const mutation = useMutationRemove()
  const viewMutation = useMutationView()
  const queryClient = useQueryClient()
  const { data } = useQueryStory()
  const archiveMutation = useMutationArchive()
  const { user_id } = getProfileFromLocalStorage()
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!data) return

      const currentTime = new Date().getTime()
      // const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

      data.data.data.story.forEach((story: Story) => {
        const postedTime = new Date(story.story_time).getTime()

        if (currentTime - postedTime > twentyFourHours && story.user_id === user_id) {
          console.log(`Archiving story ${story.story_id}`)
          archiveMutation.mutate(story.story_id, {
            onSuccess: () => {
              console.log(`Tin ${story.story_id} đã được lưu trữ thành công.`)
              toast.success('Tin của bạn đã được lưu trữ')
              queryClient.invalidateQueries()
            },
            onError: (error) => {
              console.log('Error moving story to archive:', error)
              toast.error('Di chuyển tin vào mục lưu trữ thất bại.')
            }
          })
        }
      })
    }, 60000)

    return () => clearInterval(intervalId)
  }, [data, user_id, archiveMutation, queryClient])

  useEffect(() => {
    if (storyId) {
      setSelectedStoryId(storyId)
      const story = data?.data.data.story.find((story: Story) => story.story_id === storyId)
      setCurrentStory(story || null)
    }
  }, [storyId, data])
  // Đếm View
  const handleCountView = (story_id: string) => {
    const data = {
      story_id
    }
    viewMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries()
      },
      onError: (error) => {
        console.log('Error delete story:', error)
      }
    })
  }
  const handleStoryClick = (story: Story) => {
    setCurrentStory(story)
    handleCountView(story.story_id)
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
  const handelDelete = (storyId: string) => {
    // Hộp thoại xác nhận

    mutation.mutate(storyId, {
      onSuccess: () => {
        toast.success('Gỡ tin thành công')
        setShowConfirmDelete(false)
        queryClient.invalidateQueries()
        // Sau khi xóa tin, tìm tin kế tiếp và cập nhật trạng thái
        const remainingStories = data?.data.data.story.filter((story: Story) => story.story_id !== storyId)
        if (remainingStories && remainingStories.length > 0) {
          const nextStory = remainingStories[0]
          setCurrentStory(nextStory)
          setSelectedStoryId(nextStory.story_id)
          navigate({
            search: `?id=${nextStory.story_id}`
          })
        } else {
          // Nếu không còn tin nào, đặt currentStory về null
          setCurrentStory(null)
          setSelectedStoryId(null)
          navigate({
            search: ''
          })
        }
      },
      onError: (error) => {
        console.log('Error delete story:', error)
      }
    })
  }
  // Sao chép đường link liên kết

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('Sao chép đường link thành công!')
      })
      .catch((_err) => {
        toast.error('Sao chép đường link thất bại.')
      })
  }

  const handleMenuItemClick = (itemName: string) => {
    setSelectedItem(itemName)
    switch (itemName) {
      case 'Xóa tin':
        // Handle error action
        break
      case 'Lưu trữ Tin':
        // Handle close action
        break
      case 'Sao chép liên kết':
        // Handle copy link action
        break
      default:
        break
    }
  }
  // Chuyển vào mục lưu trữ
  const handleMoveToArchive = (id: string) => {
    archiveMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries()
        // Nếu story hiện tại đang được lưu trữ thì chuyển sang story tiếp theo hoặc đặt về null
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
        console.log('Error moving story to archive:', error)
        toast.error('Di chuyển tin vào mục lưu trữ thất bại.')
      }
    })
  }

  return (
    <>
      <Header />
      <div className='mt-[--m-top] h-[calc(100vh-var(--m-top))]  overflow-hidden p-2.5 '>
        <div className='relative -m-2.5 overflow-hidden border dark:border-slate-700'>
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
                    <h2 className='ml-1 text-3xl font-bold text-black dark:text-white'> Tin </h2>
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
                          <a href='/story/archive'>
                            <IonIcon className='-ml-1 shrink-0 text-4xl' name='archive-outline' /> Mục lưu trữ
                          </a>
                          <a href='#'>
                            <IonIcon className='-ml-1 shrink-0 text-4xl' name='notifications-outline' /> notifications
                            setting
                          </a>
                          <a href='#'>
                            <IonIcon className='-ml-1 shrink-0 text-xl' name='volume-mute-outline' /> Mute notifications
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
                      onClick={() => handleStoryClick(story)}
                      className={`relative flex items-center gap-4 rounded-xl p-2 duration-200 hover:bg-secondery ${
                        selectedStoryId === story.story_id ? 'bg-gray-200 dark:bg-gray-700' : ''
                      }`}
                    >
                      <div className='relative h-14 w-14 shrink-0'>
                        <img
                          src={story.user.Profile.profile_picture}
                          alt=''
                          className='h-full w-full rounded-full object-cover'
                        />
                        <div className='absolute bottom-0 right-0 h-4 w-4 rounded-full border border-white dark:border-slate-800' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <div className='mb-1.5 flex items-center gap-2'>
                          <div className='mr-auto text-sm font-medium text-black dark:text-white'>
                            {story.user.last_name} {story.user.first_name}
                          </div>
                          {/* <div className='mr-auto text-sm font-medium text-black dark:text-white'>{story.text}</div> */}
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
            <div className='h-screen flex-1'>
              <div className='relative top-7 mx-auto flex h-[80%] w-[450px] items-center justify-center overflow-hidden rounded-2xl bg-gray-300'>
                <button className='absolute right-4 top-4 z-20' onClick={toggleDropdown}>
                  <IonIcon name='ellipsis-horizontal' className='text-2xl' />
                </button>
                {showDropdown && (
                  <div className='dark:bg-dark2 absolute right-4 top-10 z-30 rounded-md bg-white p-2 shadow-md'>
                    <button
                      className={`block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        selectedItem === 'Báo cáo tin' ? 'bg-gray-200 dark:bg-gray-700' : ''
                      }`}
                      onClick={() => handleMenuItemClick('Báo cáo tin')}
                    >
                      Báo cáo tin
                    </button>
                    {currentStory && currentStory.user_id === user_id && (
                      <>
                        <button
                          className={`block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700 ${
                            selectedItem === 'Gỡ tin' ? 'bg-gray-200 dark:bg-gray-700' : ''
                          }`}
                          onClick={() => setShowConfirmDelete(true)}
                          style={{ zIndex: '9999999999999999999999999999999999999999999' }}
                        >
                          Gỡ tin
                        </button>
                        <Dialog
                          isVisible={showConfirmDelete}
                          onClose={() => setShowConfirmDelete(false)}
                          type='warning'
                          title={'Gỡ tin'}
                          description={'Bạn có chắc chắn muốn gỡ tin này không?'}
                          textBtn={'Gỡ'}
                          callback={() => handelDelete(idSearch)}
                        />
                      </>
                    )}
                    <button
                      className={`block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        selectedItem === 'Sao chép liên kết' ? 'bg-gray-200 dark:bg-gray-700' : ''
                      }`}
                      onClick={() => handleCopyLink()}
                    >
                      Sao chép liên kết
                    </button>
                    {currentStory && currentStory.user_id === user_id && (
                      <button
                        className={`block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700 ${
                          selectedItem === 'Di chuyển vào mục lưu trữ' ? 'bg-gray-200 dark:bg-gray-700' : ''
                        }`}
                        onClick={() => handleMoveToArchive(idSearch)}
                      >
                        Lưu trữ Tin
                      </button>
                    )}
                  </div>
                )}

                {currentStory && (
                  <Carousel
                    key={currentStory.story_id}
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                    infiniteLoop={true}
                    className='flex-1 '
                  >
                    {currentStory.content.split(',').map((slide, index) => {
                      const isVideo = slide.match(/\.(mp4|webm|ogg)$/i)
                      return (
                        <div key={index} className='relative h-full w-full'>
                          {isVideo ? (
                            <video className='max-h-full max-w-full object-contain' controls src={slide} />
                          ) : (
                            <img className='h-full w-full object-contain' src={slide} alt={`Slide ${index + 1}`} />
                          )}
                        </div>
                      )
                    })}
                  </Carousel>
                )}
                {currentStory && currentStory.text && (
                  <div className='absolute bottom-10 left-0 right-0 p-6' justify-center='true'>
                    <div className='dark:bg-dark3 rounded-lg bg-white p-2 shadow-lg'>
                      <p className='text-center text-black dark:text-white'>{currentStory.text}</p>
                    </div>
                  </div>
                )}
                <div className='absolute bottom-0 right-0 flex flex-row items-center space-x-3 p-4 '>
                  <input
                    type='text'
                    className='dark:bg-dark3 w-200 rounded-full border border-gray-800 p-2 dark:border-gray-800'
                    placeholder='Trả lời tin...'
                  />
                  <div className='flex flex-row justify-center space-x-2'>
                    <button className='text-blue-500'>
                      <img src='/src/assets/images/post/like.svg' alt='like' className='h-7 w-7' />
                    </button>
                    <button className='text-red-500'>
                      <img src='/src/assets/images/post/love.svg' alt='love' className='h-7 w-7' />
                    </button>
                    <button className='text-yellow-500'>
                      <img src='/src/assets/images/post/haha.svg' alt='haha' className='h-7 w-7' />
                    </button>
                    <button className='text-green-500'>
                      <img src='/src/assets/images/post/wow.svg' alt='wow' className='h-7 w-7' />
                    </button>
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
      </div>
    </>
  )
}

export default DStory
