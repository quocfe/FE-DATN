/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Video } from '~/components/design-systems'
import { useMutation, useQuery } from '@tanstack/react-query'
import videoApi from '~/apis/video.api'
import { useParams } from 'react-router-dom'
import SvgIcon from '~/helpers/SvgIcon'
import AddCommentVideo from '../add-comment-video'
import CommentVideo from '../comment-video'
import likeVideoApi from '~/apis/like-video.api'
import { cn } from '~/helpers'
import ShowLikeOfComment from '~/components/design-systems/show-like-of-comment'
import VideoAction from '~/components/design-systems/video-action'
import SlateEditor from '~/components/design-systems/slate-editor'

const Content = () => {
  const { id } = useParams()

  const [userLike, setUserLike] = useState<boolean>(false)

  const [refetchComment, setRefetchComment] = useState<boolean>(false)

  const { data: videoData, refetch: refetchGetOneVideo } = useQuery({
    queryKey: ['getOne', id],
    queryFn: async () => {
      const res = await videoApi.getOneVideo(id)
      if (res) {
        setUserLike(res?.data?.isLike as unknown as boolean)
      }
      return res?.data
    }
  })

  const { mutate: handlePatchLikeVideo } = useMutation({
    mutationFn: async () => {
      const res = await likeVideoApi.pathLikeVideo(id as string)
      return res.data
    },
    onSuccess: () => {
      refetchGetOneVideo()
    }
  })
  console.log(videoData)
  return (
    <div className='container mx-auto grid w-full grid-cols-3 gap-6 pt-4'>
      <div className='col-span-3 lg:col-span-3'>
        {/*  post image*/}
        <div className='border1 dark:bg-dark2 rounded-xl bg-white text-sm font-medium shadow-sm'>
          {/* video player */}

          <div className='grid grid-cols-8'>
            <div className='col-span-8 border-b border-secondery lg:col-span-5 lg:border-none'>
              <Video dataVideo={videoData as never} />
              {/* post icons */}

              <div className='flex items-center gap-4  text-xs font-semibold sm:p-2'>
                {/* border-y border-[#CED0D4] */}
                <div className='card-list-body relative flex items-center justify-between px-1'>
                  <div className='flex items-center gap-x-4'>
                    <button
                      className={cn(
                        'relative flex items-center gap-x-2 rounded-md px-3 py-[6px] hover:bg-secondery dark:text-white',
                        {
                          'text-blue-500': videoData && videoData?.isLike
                        }
                      )}
                      onClick={() => {
                        console.log('Click like')
                        handlePatchLikeVideo()
                      }}
                    >
                      {/* <SvgIcon name='like' className='h-5 w-5' /> */}
                      {videoData?.isLike ? (
                        <i
                          data-visualcompletion='css-img'
                          className=''
                          style={{
                            backgroundImage:
                              'url("https://static.xx.fbcdn.net/rsrc.php/v3/yw/r/0uJRGjrhtZ5.png?_nc_eui2=AeHF16rb7SQL7LXaN2QOxoPLuKGrgKwm-de4oauArCb51yEJmhEPngB58zz87jnnnLZvQh1GPcSfqKiCpy4DBlmm")',
                            backgroundPosition: '0px -634px',
                            backgroundSize: 'auto',
                            width: '20px',
                            height: '20px',
                            backgroundRepeat: 'no-repeat',
                            display: 'inline-block'
                          }}
                        ></i>
                      ) : (
                        <i
                          data-visualcompletion='css-img'
                          className=''
                          style={{
                            backgroundImage:
                              'url("https://static.xx.fbcdn.net/rsrc.php/v3/yw/r/0uJRGjrhtZ5.png?_nc_eui2=AeHF16rb7SQL7LXaN2QOxoPLuKGrgKwm-de4oauArCb51yEJmhEPngB58zz87jnnnLZvQh1GPcSfqKiCpy4DBlmm")',
                            backgroundPosition: '0px -718px',
                            backgroundSize: 'auto',
                            width: '20px',
                            height: '20px',
                            backgroundRepeat: 'no-repeat',
                            display: 'inline-block'
                          }}
                        ></i>
                      )}

                      <p className='text-xs font-medium'>Thích</p>
                    </button>
                    <button
                      // to={ROUTE_PATH.WATCH + '/' + video.id}
                      className='relative flex items-center gap-x-2 rounded-md px-3 py-[6px] hover:bg-secondery dark:text-white'
                    >
                      <SvgIcon name='comment' className='h-5 w-5' />
                      <p className='text-xs font-medium'>Bình luận</p>
                    </button>
                    <button className='relative flex items-center gap-x-2 rounded-md px-3 py-[6px] hover:bg-secondery dark:text-white'>
                      <SvgIcon name='share' className='h-5 w-5' />
                      <p className='text-xs font-medium'>Chia sẻ</p>
                    </button>
                  </div>
                  <div className='flex items-center gap-x-5'>
                    <ShowLikeOfComment dataVideo={videoData as never} setUserLike={setUserLike} userLike={userLike} />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-8 lg:col-span-3'>
              {/* post heading */}
              <div className='border-b border-b-secondery pb-2'>
                <div className='flex gap-3 p-2.5 text-sm font-medium sm:p-4'>
                  <a href='#'>
                    <img src={videoData?.user.Profile.profile_picture} alt='' className='h-9 w-9 rounded-full' />
                  </a>
                  <div className='flex-1'>
                    <a href='#'>
                      <h4 className='text-black dark:text-white'> {videoData?.user.first_name} </h4>
                    </a>
                    <div className='text-xs text-gray-500 dark:text-white/80'> 2 hours ago</div>
                  </div>
                  {/* <div className='-mr-1'>
                    <button type='button' className='button-icon h-8 w-8'>
                      <IonIcon className='text-xl' name='ellipsis-horizontal' />
                    </button>
                    <div
                      className='w-[245px]'
                      uk-dropdown='pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click'
                    >
                      <nav>
                        <a href='#'>
                          <IonIcon className='shrink-0 text-xl' name='bookmark-outline' /> Add to favorites
                        </a>
                        <a href='#'>
                          <IonIcon className='shrink-0 text-xl' name='notifications-off-outline' /> Mute Notification
                        </a>
                        <a href='#'>
                          <IonIcon className='shrink-0 text-xl' name='flag-outline' /> Report this post
                        </a>
                        <a href='#'>
                          <IonIcon className='shrink-0 text-xl' name='share-outline' /> Share your profile
                        </a>
                        <hr />
                        <a href='#' className='text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'>
                          <IonIcon className='shrink-0 text-xl' name='stop-circle-outline' /> Unfollow
                        </a>
                      </nav>
                    </div>
                  </div> */}
                  {videoData && <VideoAction dataVideo={videoData as never} />}
                </div>
                {/* <p className='px-6 text-sm font-normal leading-6'>{videoData?.content}</p> */}
                {/* <SlateEditor
                  className='!my-5 overflow-y-auto overflow-x-hidden px-6'
                  valueSaleRender={videoData?.content && JSON.parse(videoData.content)}
                  readOnly
                /> */}
                {videoData && (
                  <SlateEditor
                    className='max-h-10 overflow-hidden overflow-y-auto overflow-x-hidden px-2'
                    valueSaleRender={JSON.parse(videoData?.content as any)}
                    readOnly
                  />
                )}
              </div>

              <div id='scroll-base' className='px-4 lg:h-[240px]'>
                <CommentVideo refetchCommentVideo={refetchComment} />
              </div>
              {/* add comment */}
              <AddCommentVideo video_id={videoData?.id as string} setRefetchComment={setRefetchComment} />
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
      {/* <div className="col-span-1">hello</div> */}
      {/* sidebar */}
      {/* <div className='bottom-0 right-0 top-[75px] col-span-1 w-full pr-2 sm:block lg:fixed lg:col-span-1 lg:!h-[calc(100vh-5.5rem)] lg:w-auto'> */}
      {/* <Sidebar /> */}
      {/* </div> */}
    </div>
  )
}

export default Content
