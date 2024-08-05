import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
const UserProfile = () => {
  const [file, setFile] = useState<any>(null)
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('avatar', file)
    formData.append('userId', '1' as string)
    try {
      await axios.post(`http://localhost:3000/upload-avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setTimeout(() => {
        window.location.reload()
      }, 350)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <main className='profile-page'>
        <section className='relative block '>
          <div className='h-full'>
            <div className='border-b-2 block md:flex'>
              <div className='w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md'>
                <div className='2xl:flex justify-between items-center'>
                  <div className='flex items-center gap-5'>
                  </div>
                </div>
                <span className='text-gray-600'>This information is secret so be careful</span>
                <div className='w-full p-8 mx-2 flex justify-center'>
                </div>
                <div>
                  <form onSubmit={handleSubmit} className='flex justify-center'>
                    <label
                      htmlFor='fileInput'
                      className='flex items-center w-1/2 justify-center mx-2 py-2 bg-[#D7B978] group rounded-md shadow-lg cursor-pointer hover:text-white text-white hover:font-bold transition-all'
                    >
                      <input
                        type='file'
                        id='fileInput'
                        onChange={(e: any) => setFile(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                      Select Image
                    </label>
                    <button type='submit' className='bg-success px-2 rounded-md text-white font-medium'>
                      Upload
                    </button>
                  </form>
                </div>
              </div>
              <div className='w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md'>
                <div className='rounded  shadow p-6'>
                  <div className='pb-4'>
                    <label htmlFor='about' className='font-semibold text-gray-700 block pb-1'>
                      code
                    </label>
                    <input
                      disabled
                      id='email'
                      className='border-1 border-[#ccc]  rounded-r px-4 py-2 w-full cursor-not-allowed'
                      type='email'
                    />
                  </div>
                  <div className='pb-6'>
                    <label htmlFor='name' className='font-semibold text-gray-700 block pb-1'>
                      họ tên
                    </label>
                    <div className='flex'>
                      <input
                        disabled
                        id='username'
                        className='border-1 border-[#ccc] rounded-r px-4 py-2 w-full cursor-not-allowed'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='pb-4'>
                    <label htmlFor='about' className='font-semibold text-gray-700 block pb-1'>
                      Email
                    </label>
                    <input
                      disabled
                      id='email'
                      className='border-1 border-[#ccc]  rounded-r px-4 py-2 w-full cursor-not-allowed'
                      type='email'
                    />
                  </div>
                  <div className='pb-4'>
                    <label htmlFor='about' className='font-semibold text-gray-700 block pb-1'>
                      vai trò
                    </label>
                    <input
                      disabled
                      id='email'
                      className='border-1 border-[#ccc]  rounded-r px-4 py-2 w-full cursor-not-allowed'
                      type='email'
                    />
                  </div>
                  <div className='pb-4'>
                    <label htmlFor='about' className='font-semibold text-gray-700 block pb-1'>
                      Phòng ban
                    </label>
                    <input
                      disabled
                      id='email'
                      className='border-1 border-[#ccc]  rounded-r px-4 py-2 w-full cursor-not-allowed'
                      type='email'
                    />
                    <span className='text-gray-600 pt-4 block opacity-70'>
                      Personal login information of your account
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </main>
  )
}

export default UserProfile
