import { IonIcon } from '@ionic/react'
import React, { useState } from 'react'
import { Video } from '~/components/design-systems'
import { useMutation, useQuery } from '@tanstack/react-query'
import videoApi from '~/apis/video.api'
import { useParams } from 'react-router-dom'
import SvgIcon from '~/helpers/SvgIcon'
import AddCommentVideo from '../add-comment-video'
import CommentVideo from '../comment-video'
import likeVideoApi from '~/apis/like-video.api'
import { cn } from '~/helpers'

const Content = () => {
  const { id } = useParams()

  const [refetchComment, setRefetchComment] = useState<boolean>(false)

  const { data: videoData, refetch: refetchGetOneVideo } = useQuery({
    queryKey: ['getOne', id],
    queryFn: async () => {
      const res = await videoApi.getOneVideo(id)
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

  return (
    <div className='mx-auto grid w-full grid-cols-3 gap-6'>
      <div className='col-span-3 lg:col-span-3'>
        {/*  post image*/}
        <div className='border1 dark:bg-dark2 rounded-xl bg-white text-sm font-medium shadow-sm'>
          {/* video player */}

          <div className='grid grid-cols-8'>
            <div className='col-span-8 lg:col-span-5 border-b border-secondery lg:border-none'>
              <Video link={videoData?.url ?? ''} public_id={videoData?.public_id ?? ''} />
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
                  <div className='flex items-center gap-x-4'>
                    {videoData && (
                      <div className='flex gap-2 px-6'>
                        {videoData.like_count > 0 && (
                          <img
                            src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
                            alt=''
                            className='w-5'
                          />
                        )}
                        <div className='text-sm'>
                          {Boolean(videoData.isLike) && 'Bạn'}
                          {Boolean(videoData.isLike) && videoData.like_count - 1 > 0 && ' và '}
                          {videoData.like_count > 0 && Boolean(videoData.isLike)
                            ? videoData.like_count - 1
                            : videoData.like_count === 0
                              ? ''
                              : videoData.like_count}
                          {Boolean(videoData.like_count) && ' người khác'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-8 lg:col-span-3'>
              {/* post heading */}
              <div className='border-b border-b-secondery pb-2'>
                <div className='flex gap-3 p-2.5 text-sm font-medium sm:p-4'>
                  <a href='timeline.html'>
                    <img src={videoData?.user.Profile.cover_photo} alt='' className='h-9 w-9 rounded-full' />
                  </a>
                  <div className='flex-1'>
                    <a href='timeline.html'>
                      <h4 className='text-black dark:text-white'> {videoData?.user.first_name} </h4>
                    </a>
                    <div className='text-xs text-gray-500 dark:text-white/80'> 2 hours ago</div>
                  </div>
                  <div className='-mr-1'>
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
                  </div>
                </div>
                <p className='px-6 text-sm font-normal leading-6'>{videoData?.content}</p>
              </div>
              <div id='scroll-base' className='px-4 lg:h-[240px]'>
                <CommentVideo refetchCommentVideo={refetchComment} />
              </div>
              {/* add comment */}
              <AddCommentVideo video_id={videoData?.id as string} setRefetchComment={setRefetchComment} />
            </div>
          </div>
          {/* comments */}
          {/* <div className='relative space-y-3 border-t border-gray-100 p-2.5 font-normal sm:p-6 dark:border-slate-700/40'>
            <div className='relative flex items-start gap-3'>
              <a href='timeline.html'>
                <img src='assets/images/avatars/avatar-3.jpg' alt='' className='mt-1 h-6 w-6 rounded-full' />
              </a>
              <div className='flex-1'>
                <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
                  Monroe Parker
                </a>
                <p className='mt-0.5'>What a beautiful photo! I love it. 😍 </p>
              </div>
            </div>
            <div className='relative flex items-start gap-3'>
              <a href='timeline.html'>
                <img src='assets/images/avatars/avatar-2.jpg' alt='' className='mt-1 h-6 w-6 rounded-full' />
              </a>
              <div className='flex-1'>
                <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
                  John Michael
                </a>
                <p className='mt-0.5'> You captured the moment.😎 </p>
              </div>
            </div>
            <div className='relative flex items-start gap-3'>
              <a href='timeline.html'>
                <img src='assets/images/avatars/avatar-5.jpg' alt='' className='mt-1 h-6 w-6 rounded-full' />
              </a>
              <div className='flex-1'>
                <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
                  James Lewis
                </a>
                <p className='mt-0.5'>What a beautiful photo! I love it. 😍 </p>
              </div>
            </div>
            <div className='relative flex items-start gap-3'>
              <a href='timeline.html'>
                <img src='assets/images/avatars/avatar-4.jpg' alt='' className='mt-1 h-6 w-6 rounded-full' />
              </a>
              <div className='flex-1'>
                <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
                  Martin Gray
                </a>
                <p className='mt-0.5'> You captured the moment.😎 </p>
              </div>
            </div>
            <button type='button' className='mt-2 flex items-center   gap-1.5 text-blue-500'>
              <IonIcon name='chevron-down-outline' className='ml-auto duration-200 group-aria-expanded:rotate-180' />
              More Comment
            </button>
          </div> */}
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
