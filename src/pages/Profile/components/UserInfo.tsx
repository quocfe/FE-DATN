import { IonIcon } from '@ionic/react'
import { useRef } from 'react'
import useUpdateImage from '~/hooks/queries/user/useUpdateImage'

interface Props {
  profile: UserProfile | null
  setShowModal: (value: React.SetStateAction<boolean>) => void
}

function UserInfo({ profile, setShowModal }: Props) {
  const { updateImage } = useUpdateImage()
  const inputFileProfilePictureRef = useRef<HTMLInputElement | null>(null)
  const inputFileCoverPhotoRef = useRef<HTMLInputElement | null>(null)

  const handleUpdateImage = (type: 'profile_picture' | 'cover_photo') => {
    let file: File | null = null
    if (type === 'profile_picture' && inputFileProfilePictureRef.current && inputFileProfilePictureRef.current.files) {
      file = inputFileProfilePictureRef.current.files[0]
    } else if (type === 'cover_photo' && inputFileCoverPhotoRef.current && inputFileCoverPhotoRef.current.files) {
      file = inputFileCoverPhotoRef.current.files[0]
    }

    if (file) {
      updateImage(type, file)
    }
  }

  return (
    <>
      <div className='relative h-48 w-full overflow-hidden lg:h-72'>
        <img src={profile?.Profile.cover_photo} alt='' className='inset-0 h-full w-full object-cover' />
        {/* overly */}
        <div className='absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t from-black/60 pt-20' />
        <div className='absolute bottom-0 right-0 z-20 m-4'>
          <div className='flex items-center gap-3'>
            <button className='button backdrop-blur-small flex items-center gap-2 bg-white/20 text-white'>Xóa</button>
            <button
              className='button backdrop-blur-small flex items-center gap-2 bg-black/10 text-white'
              onClick={() => inputFileCoverPhotoRef.current?.click()}
            >
              Chỉnh sửa
            </button>
            <input type='file' hidden ref={inputFileCoverPhotoRef} onChange={() => handleUpdateImage('cover_photo')} />
          </div>
        </div>
      </div>
      <div className='p-3'>
        <div className='-mt-28 flex flex-col justify-center md:items-center lg:-mt-48'>
          <div className='relative z-10 mb-4 h-28 w-28 lg:h-48 lg:w-48'>
            <div className='relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-gray-100 shadow md:border-[6px] lg:h-48 lg:w-48 dark:border-slate-900'>
              <img src={profile?.Profile.profile_picture} alt='' className='inset-0 h-full w-full object-cover' />
            </div>
            <button
              onClick={() => inputFileProfilePictureRef.current?.click()}
              type='button'
              className='absolute -bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full bg-white p-1.5 shadow sm:flex'
            >
              <IonIcon icon='camera' className='md hydrated text-2xl' role='img' aria-label='camera' />
              <input
                type='file'
                hidden
                ref={inputFileProfilePictureRef}
                onChange={() => handleUpdateImage('profile_picture')}
              />
            </button>
          </div>
          <h3 className='text-base font-bold text-black md:text-3xl dark:text-white'>
            {profile?.last_name} {profile?.first_name} {profile?.Profile.alias ? `(${profile?.Profile.alias})` : ''}
          </h3>
          <p className='mt-2 text-center text-gray-500 dark:text-white/80'>
            {profile?.Profile.biography}
            <a
              className='ml-4 block cursor-pointer text-center text-base text-blue-500'
              onClick={() => setShowModal(true)}
            >
              {profile?.Profile.biography ? 'Chỉnh sửa' : 'Thêm tiểu sử'}
            </a>
          </p>
          <p className='mt-2 hidden max-w-xl text-center text-sm font-light md:font-normal'>
            I love beauty and emotion. 🥰 I’m passionate about photography and learning. 📚 I explore genres and styles.
            🌈 I think photography is storytelling. 😊
          </p>
        </div>
      </div>
    </>
  )
}

export default UserInfo
