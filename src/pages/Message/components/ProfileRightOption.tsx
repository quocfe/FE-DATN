import { IonIcon } from '@ionic/react'
import { renderTypeFile } from '../utils/renderTypeFile'

type ProfileRightOptionProps = {
  title: string
  listImage: TypeMessage[] | undefined
  listVideo: TypeMessage[] | undefined
  listFile: TypeMessage[] | undefined
  typeConversation: string | number
}

function ProfileRightOption({ title, listImage, listVideo, listFile, typeConversation }: ProfileRightOptionProps) {
  const data = [
    {
      title: 'Ảnh - Video'
    },
    { title: 'File' },
    { title: typeConversation === 2 && 'Thành viên' }
  ]
  return (
    <div className='relative z-20 h-full'>
      <div className='box !shadow-none'>
        <nav className='nav__underline px-3.5'>
          <ul
            className='group'
            uk-switcher='connect: #group-tabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium'
          >
            {data.map((item, index) => (
              <li key={index} className={title === item.title ? 'uk-active' : ''}>
                <a className='' href='#' aria-expanded={title === item.title && 'true'}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div id='group-tabs' className='uk-switcher mt-2 text-sm ' style={{ touchAction: 'pan-y pinch-zoom' }}>
          <div className='uk-child-width-1-3@m' uk-grid='true' uk-lightbox='animation: slide'>
            <div className='grid grid-cols-3 gap-1 p-4'>
              {listImage?.map((image, index) => (
                <a key={index} className='uk-inline' href={image.sub_body}>
                  <img
                    src={image.sub_body}
                    width={1800}
                    height={1200}
                    className='mx-auto h-[100px] w-[100%] rounded-sm object-cover'
                  />
                </a>
              ))}
              {listVideo?.map((video, index) => (
                <a key={index} className='uk-inline' href={video.sub_body}>
                  <video
                    src={video.sub_body}
                    width={1800}
                    height={1200}
                    className='mx-auto h-[100px] w-[100%] rounded-sm object-cover'
                  ></video>
                </a>
              ))}
            </div>
          </div>
          <div className='uk-active'>
            <div className='flex flex-col space-y-2 p-2'>
              {/* map  */}
              {listFile?.map((file, index) => (
                <div key={index} className='flex cursor-pointer gap-3 p-2 shadow-sm'>
                  <div className='flex  items-center rounded-[10px] bg-secondery p-2 '>
                    {file.body && renderTypeFile(file.body)}
                  </div>
                  <div className='flex w-full flex-1 flex-col items-start justify-around truncate text-ellipsis'>
                    <p className='text-sm'>{file.sub_body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileRightOption
