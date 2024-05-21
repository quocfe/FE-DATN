import { IonIcon } from '@ionic/react'

function Register() {
  return (
    <div className='sm:flex'>
      <div className='relative z-10 flex min-h-screen w-full items-center bg-white p-10 pt-10 shadow-xl md:w-96 lg:w-[580px] dark:bg-slate-900'>
        <div
          className='mx-auto w-full space-y-10 lg:max-w-sm'
          uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
        >
          {/* logo image*/}
          <a href='#'>
            <img src='assets/images/logo.png' className='absolute left-10 top-10 w-28 dark:hidden' alt='' />
          </a>
          <a href='#'>
            <img
              src='assets/images/logo-light.png'
              className='absolute left-10 top-10 hidden w-28 dark:!block'
              alt=''
            />
          </a>
          {/* logo icon optional */}
          <div className='hidden'>
            <img className='w-12' src='assets/images/logo-icon.png' alt='Socialite html template' />
          </div>
          {/* title */}
          <div>
            <h2 className='mb-1.5 text-2xl font-semibold'> Sign up to get started </h2>
            <p className='text-sm font-normal text-gray-700'>
              If you already have an account,
              <a href='form-login.html' className='text-blue-700'>
                Login here!
              </a>
            </p>
          </div>
          {/* form */}
          <form
            method='#'
            action='#'
            className='space-y-7 text-sm font-medium text-black dark:text-white'
            uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
          >
            <div className='grid grid-cols-2 gap-4 gap-y-7'>
              {/* first name */}
              <div>
                <label htmlFor='email' className=''>
                  First name
                </label>
                <div className='mt-2.5'>
                  <input
                    id='text'
                    name='text'
                    type='text'
                    placeholder='First name'
                    className='!w-full !rounded-lg !border-slate-200 !bg-transparent !shadow-sm dark:!border-slate-800 dark:!bg-white/5'
                  />
                </div>
              </div>
              {/* Last name */}
              <div>
                <label htmlFor='email' className=''>
                  Last name
                </label>
                <div className='mt-2.5'>
                  <input
                    id='text'
                    name='text'
                    type='text'
                    placeholder='Last name'
                    className='!w-full !rounded-lg !border-slate-200 !bg-transparent !shadow-sm dark:!border-slate-800 dark:!bg-white/5'
                  />
                </div>
              </div>
              {/* email */}
              <div className='col-span-2'>
                <label htmlFor='email' className=''>
                  Email address
                </label>
                <div className='mt-2.5'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Email'
                    className='!w-full !rounded-lg !border-slate-200 !bg-transparent !shadow-sm dark:!border-slate-800 dark:!bg-white/5'
                  />
                </div>
              </div>
              {/* password */}
              <div>
                <label htmlFor='email' className=''>
                  Password
                </label>
                <div className='mt-2.5'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    placeholder='***'
                    className='!w-full !rounded-lg !border-slate-200 !bg-transparent !shadow-sm dark:!border-slate-800 dark:!bg-white/5'
                  />
                </div>
              </div>
              {/* Confirm Password */}
              <div>
                <label htmlFor='email' className=''>
                  Confirm Password
                </label>
                <div className='mt-2.5'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    placeholder='***'
                    className='!w-full !rounded-lg !border-slate-200 !bg-transparent !shadow-sm dark:!border-slate-800 dark:!bg-white/5'
                  />
                </div>
              </div>
              <div className='col-span-2'>
                <label className='inline-flex items-center' id='rememberme'>
                  <input type='checkbox' id='accept-terms' className='!rounded-md accent-red-800' />
                  <span className='ml-2'>
                    you agree to our
                    <a href='#' className='text-blue-700 hover:underline'>
                      terms of use
                    </a>
                  </span>
                </label>
              </div>
              {/* submit button */}
              <div className='col-span-2'>
                <button type='submit' className='button w-full bg-primary text-white'>
                  Get Started
                </button>
              </div>
            </div>
            <div className='flex items-center gap-6 text-center'>
              <hr className='flex-1 border-slate-200 dark:border-slate-800' />
              Or continue with
              <hr className='flex-1 border-slate-200 dark:border-slate-800' />
            </div>
            {/* social login */}
            <div
              className='flex gap-2'
              uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 400 ;repeat: true'
            >
              <a href='#' className='button flex flex-1 items-center gap-2 bg-primary text-sm text-white'>
                <IonIcon name='logo-facebook' className='text-lg' /> facebook
              </a>
              <a href='#' className='button flex flex-1 items-center gap-2 bg-sky-600 text-sm text-white'>
                <IonIcon icon='logo-twitter' className='text-lg' /> twitter
              </a>
              <a href='#' className='button flex flex-1 items-center gap-2 bg-black text-sm text-white'>
                <IonIcon icon='logo-github' className='text-lg' /> github
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* image slider */}
      <div className='relative flex-1 bg-primary max-md:hidden'>
        <div className='relative h-full w-full' tabIndex={-1} uk-slideshow='animation: slide; autoplay: true'>
          <ul className='uk-slideshow-items h-full w-full'>
            <li className='w-full'>
              <img
                src='https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
                className='uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left h-full w-full object-cover'
              />
              <div className='uk-tr ansition-slide-bottom-small absolute bottom-0 z-10 w-full'>
                <div
                  className='relative z-30 mx-auto w-full max-w-xl px-5 pb-32'
                  uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
                >
                  <img className='w-12' src='assets/images/logo-icon.png' alt='Socialite html template' />
                  <h4 className='mt-7 text-2xl font-semibold !text-white' uk-slideshow-parallax='y: 600,0,0'>
                    Connect With Friends
                  </h4>
                  <p className='mt-7 text-lg leading-8 !text-white' uk-slideshow-parallax='y: 800,0,0;'>
                    This phrase is more casual and playful. It suggests that you are keeping your friends updated on
                    what’s happening in your life.
                  </p>
                </div>
              </div>
              <div className='absolute bottom-0 left-0 h-96 w-full bg-gradient-to-t from-black' />
            </li>
            <li className='w-full'>
              <img
                src='https://images.unsplash.com/photo-1606812667169-0e1991ed3742?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
                className='uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left h-full w-full object-cover'
              />
              <div className='uk-tr ansition-slide-bottom-small absolute bottom-0 z-10 w-full'>
                <div
                  className='relative z-30 mx-auto w-full max-w-xl px-5 pb-32'
                  uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
                >
                  <img className='w-12' src='assets/images/logo-icon.png' alt='Socialite html template' />
                  <h4 className='mt-7 text-2xl font-semibold !text-white' uk-slideshow-parallax='y: 800,0,0'>
                    Connect With Friends
                  </h4>
                  <p className='mt-7 text-lg leading-8 !text-white' uk-slideshow-parallax='y: 800,0,0;'>
                    This phrase is more casual and playful. It suggests that you are keeping your friends updated on
                    what’s happening in your life.
                  </p>
                </div>
              </div>
              <div className='absolute bottom-0 left-0 h-96 w-full bg-gradient-to-t from-black' />
            </li>
          </ul>
          {/* slide nav */}
          <div className='flex justify-center'>
            <ul className='uk-dotnav uk-slideshow-nav absolute  bottom-8 inline-flex flex-wrap justify-center gap-1.5'></ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
