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
          <a href='#' className='uk-scrollspy-inview '>
            <img src='assets/images/logo.png' className='absolute left-10 top-10 w-28 dark:hidden' alt='' />
          </a>
          <a href='#' className='uk-scrollspy-inview '>
            <img
              src='assets/images/logo-light.png'
              className='absolute left-10 top-10 hidden w-28 dark:!block'
              alt=''
            />
          </a>
          {/* logo icon optional */}
          <div className='hidden' style={{ opacity: 0 }}>
            <img className='w-12' src='assets/images/logo-icon.png' alt='Socialite html template' />
          </div>
          {/* title */}
          <div className='uk-scrollspy-inview '>
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
            className='uk-scrollspy-inview space-y-7 text-sm font-medium text-black dark:text-white '
            uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
          >
            <div className='uk-scrollspy-inview grid grid-cols-2 gap-4 gap-y-7 '>
              {/* first name */}
              <div>
                <label htmlFor='first_name' className=''>
                  First name
                </label>
                <div className='mt-2.5'>
                  <input
                    id='first_name'
                    name='first_name'
                    type='text'
                    placeholder='First name'
                    className='!w-full !rounded-lg !border-slate-200 !bg-transparent !shadow-sm dark:!border-slate-800 dark:!bg-white/5'
                  />
                </div>
              </div>
              {/* Last name */}
              <div>
                <label htmlFor='last_name' className=''>
                  Last name
                </label>
                <div className='mt-2.5'>
                  <input
                    id='last_name'
                    name='last_name'
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
                    id='confirm_password'
                    name='confirm_password'
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
            <div className='flex items-center gap-6 text-center ' style={{ opacity: 0 }}>
              <hr className='flex-1 border-slate-200 dark:border-slate-800' />
              Or continue with
              <hr className='flex-1 border-slate-200 dark:border-slate-800' />
            </div>
            {/* social login */}
            <div
              className='flex gap-2 '
              uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 400 ;repeat: true'
              style={{ opacity: 0 }}
            >
              <a
                href='#'
                className='button flex flex-1 items-center gap-2 bg-primary text-sm text-white '
                style={{ opacity: 0 }}
              >
                <IonIcon icon='logo-facebook' className='md hydrated text-lg' role='img' aria-label='logo facebook' />
                facebook
              </a>
              <a
                href='#'
                className='button flex flex-1 items-center gap-2 bg-sky-600 text-sm text-white '
                style={{ opacity: 0 }}
              >
                <IonIcon icon='logo-twitter' className='md hydrated' role='img' aria-label='logo twitter' />
                twitter
              </a>
              <a
                href='#'
                className='button flex flex-1 items-center gap-2 bg-black text-sm text-white '
                style={{ opacity: 0 }}
              >
                <IonIcon icon='logo-github' className='md hydrated' role='img' aria-label='logo github' />
                github
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className='relative flex-1 bg-primary max-md:hidden'>
        <div
          className='uk-slideshow relative h-full w-full'
          tabIndex={-1}
          uk-slideshow='animation: slide; autoplay: true'
        >
          <ul className='uk-slideshow-items h-full w-full' style={{ minHeight: '524.812px' }}>
            <li className='w-full' tabIndex={-1}>
              <img
                src='https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
                className='uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left h-full w-full object-cover'
              />
              <div className='uk-tr ansition-slide-bottom-small absolute bottom-0 z-10 w-full'>
                <div
                  className='relative z-30 mx-auto w-full max-w-xl px-5 pb-32'
                  uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
                >
                  <h4
                    className='mt-7 text-2xl font-semibold !text-white'
                    uk-slideshow-parallax='y: 600,0,0'
                    style={{ transform: 'translateY(0px)', opacity: 0 }}
                  >
                    Connect With Friends
                  </h4>
                  <p
                    className='mt-7 text-lg leading-8 !text-white'
                    uk-slideshow-parallax='y: 800,0,0;'
                    style={{ transform: 'translateY(0px)', opacity: 0 }}
                  >
                    This phrase is more casual and playful. It suggests that you are keeping your friends updated on
                    what’s happening in your life.
                  </p>
                </div>
              </div>
              <div className='absolute bottom-0 left-0 h-96 w-full bg-gradient-to-t from-black' />
            </li>
            <li className='uk-active uk-transition-active w-full' tabIndex={-1}>
              <img
                src='https://images.unsplash.com/photo-1614029951470-ef9eb9952be7?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
                className='uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left h-full w-full object-cover'
              />
              <div className='uk-tr ansition-slide-bottom-small absolute bottom-0 z-10 w-full'>
                <div
                  className='relative z-30 mx-auto w-full max-w-xl px-5 pb-32'
                  uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
                >
                  <h4
                    className='mt-7 text-2xl font-semibold !text-white'
                    uk-slideshow-parallax='y: 800,0,0'
                    style={{ transform: 'translateY(0px)', opacity: 0 }}
                  >
                    Connect With Friends
                  </h4>
                  <p
                    className='mt-7 text-lg leading-8 !text-white'
                    uk-slideshow-parallax='y: 800,0,0;'
                    style={{ transform: 'translateY(0px)', opacity: 0 }}
                  >
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
            <ul className='uk-dotnav uk-slideshow-nav absolute  bottom-8 inline-flex flex-wrap justify-center gap-1.5'>
              <li uk-slideshow-item={0} className=''>
                <a href='' />
              </li>
              <li uk-slideshow-item={1} className='uk-active'>
                <a href='' />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
