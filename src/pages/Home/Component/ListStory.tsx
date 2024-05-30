import React, { useState } from 'react'
import { IonIcon } from '@ionic/react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import useMutationRemove from './hook/useMutationRemove'
import { toast } from 'react-toastify'
import CreateStory from './CreateStory'
import useQueryStory from './hook/useGetStory'

function ListStory({ handelCheckToggle }: any) {
  const toggleStory = () => {
    handelCheckToggle(true)
  }
  const [searchParams] = useSearchParams()
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const idSearch: any = searchParams.get('id')
  const navigate = useNavigate()
  const [dataStory, setDataStory] = useState([])
  const auth = localStorage.getItem('access_token')

  const button: any = document.querySelector('.uk-lightbox-toolbar-icon.uk-close-large.uk-icon.uk-close')
  button?.addEventListener('click', () => {
    setShow(false)
    setShowEdit(false)
    navigate({
      search: createSearchParams({
        id: ''
      }).toString()
    })
  })
  
  const mutation = useMutationRemove()
  const { data }: any = useQueryStory()
  console.log(data?.data?.data?.story, 'data')

  const handelCreate = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success('Story removed successfully')
        setTimeout(() => {
          window.location.reload()
        }, 450)
      },
      onError: (error) => {
        console.log('Error creating story:', error)
      }
    })
  }

  return (
    <>
      {show && (
        <>
          <button
            onClick={() => handelCreate(idSearch)}
            style={{ zIndex: '9999999999999999999999999999999999999999999' }}
            className='absolute right-0 top-0 bg-red-500 text-white'
          >
            xoá
          </button>
          <button
            onClick={() => {
              setShowEdit(true)
              setShow(false)
              navigate({
                search: createSearchParams({
                  id: idSearch,
                  isEdit: '1'
                }).toString()
              })
            }}
            style={{ zIndex: '9999999999999999999999999999999999999999999' }}
            className='absolute right-0 top-10 bg-red-500 text-white'
          >
            sửa
          </button>
        </>
      )}
      {showEdit ? (
        <div
          style={{ zIndex: '99999999999999999999999999999999999999999999999999' }}
          className='absolute bottom-0 left-0 right-0 top-0'
        >
          <CreateStory />
        </div>
      ) : (
        <div className='flex  gap-2'>
          <p onClick={toggleStory} className='md:pr-3' uk-scrollspy-class='uk-animation-fade'>
            <div className='dark:bg-dark2 relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-dashed border-slate-300 bg-slate-200 md:h-16 md:w-16 dark:border-slate-700'>
              <IonIcon icon='camera' className='text-2xl' />
            </div>
          </p>
          <div className=' flex items-center gap-3'>
            {data?.data?.data?.story?.length > 1 ? (
              data?.data?.data?.story?.map((items: any) => {
                return (
                  <ul
                    onClick={() => {
                      setShow(true)
                      navigate({
                        search: createSearchParams({
                          id: items.story_id
                        }).toString()
                      })
                    }}
                    key={items.story_id}
                    className='uk-slider-items w-[calc(100%+14px)]'
                    uk-scrollspy='target: > li; cls: uk-animation-scale-up; delay: 20; repeat: true'
                  >
                    <li key='' className='pr-2 duration-300 hover:-rotate-2 hover:scale-[1.15] md:pr-3 relative'>
                      <a href={'http://localhost:3000/' + items.content} data-caption={items.text}>
                        <div className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow md:h-16 md:w-16 md:border-4 dark:border-slate-700'>
                          <img
                            src={'http://localhost:3000/' + items.content}
                            alt=''
                            className='absolute object-cover'
                          />
                        </div>
                      </a>
                      {show && idSearch === items.story_id && (
                        <div className='absolute right-0 top-0 flex flex-col'>
                          <button
                            onClick={() => handelCreate(idSearch)}
                            style={{ zIndex: '9999999999999999999999999999999999999999999' }}
                            className='bg-red-500 text-white'
                          >
                            xoá
                          </button>
                          <button
                            onClick={() => {
                              setShowEdit(true)
                              setShow(false)
                              navigate({
                                search: createSearchParams({
                                  id: idSearch,
                                  isEdit: '1'
                                }).toString()
                              })
                            }}
                            style={{ zIndex: '9999999999999999999999999999999999999999999' }}
                            className='mt-2 bg-red-500 text-white'
                          >
                            sửa
                          </button>
                        </div>
                      )}
                    </li>
                  </ul>
                )
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ListStory
