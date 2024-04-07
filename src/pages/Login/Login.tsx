import { IonIcon } from '@ionic/react'

function Login() {
  return (
    <div className='sm:flex'>
      <div className='relative z-10 flex min-h-screen w-full items-center bg-white p-10 pt-10 shadow-xl md:w-96 lg:w-[580px] dark:bg-slate-900'>
        <div
          className='mx-auto w-full space-y-10 lg:max-w-sm'
          uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
        >
          {/* logo image*/}
          <a href='#' className='uk-scrollspy-inview ' style={{}}>
            <img src='assets/images/logo.png' className='absolute left-10 top-10 w-28 dark:hidden' alt='' />
          </a>
          <a href='#' className='uk-scrollspy-inview ' style={{}}>
            <img
              src='assets/images/logo-light.png'
              className='absolute left-10 top-10 hidden w-28 dark:!block'
              alt=''
            />
          </a>
          {/* logo icon optional */}
          <div className='hidden' style={{ opacity: 0 }}>
            <img
              className='w-12'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt='Socialite html template'
            />
          </div>
          {/* title */}
          <div className='uk-scrollspy-inview ' style={{}}>
            <h2 className='mb-1.5 text-2xl font-semibold'> Sign in to your account </h2>
            <p className='text-sm font-normal text-gray-700'>
              If you haven’t signed up yet.
              <a href='form-register.html' className='text-blue-700'>
                Register here!
              </a>
            </p>
          </div>
          {/* form */}
          <form
            method='#'
            action='#'
            className='uk-scrollspy-inview space-y-7 text-sm font-medium text-black dark:text-white '
            uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
            style={{}}
          >
            {/* email */}
            <div className='uk-scrollspy-inview ' style={{}}>
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
            <div className='uk-scrollspy-inview ' style={{}}>
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
            <div className='uk-scrollspy-inview flex items-center justify-between ' style={{}}>
              <div className='flex items-center gap-2.5'>
                <input id='rememberme' name='rememberme' type='checkbox' />
                <label htmlFor='rememberme' className='font-normal'>
                  Remember me
                </label>
              </div>
              <a href='#' className='text-blue-700'>
                Forgot password
              </a>
            </div>
            {/* submit button */}
            <div className='uk-scrollspy-inview ' style={{}}>
              <button type='submit' className='button w-full bg-primary text-white'>
                Sign in
              </button>
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
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* image slider */}
      <div className='relative flex-1 bg-primary max-md:hidden'>
        <div
          className='uk-slideshow relative h-full w-full'
          tabIndex={-1}
          uk-slideshow='animation: slide; autoplay: true'
        >
          <ul className='uk-slideshow-items h-full w-full' style={{ minHeight: '524.812px' }}>
            <li
              className='uk-active uk-transition-active w-full'
              tabIndex={-1}
              style={{ transform: 'translate3d(0px, 0px, 0px)' }}
            >
              <img
                src='assets/images/post/img-3.jpg'
                alt=''
                className='uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left h-full w-full object-cover'
              />
              <div className='uk-tr ansition-slide-bottom-small absolute bottom-0 z-10 w-full'>
                <div
                  className='relative z-30 mx-auto w-full max-w-xl px-5 pb-32'
                  uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
                >
                  <img
                    className='uk-scrollspy-inview w-12 '
                    src='assets/images/logo-icon.png'
                    alt='Socialite html template'
                    style={{}}
                  />
                  <h4
                    className='uk-scrollspy-inview mt-7 text-2xl font-semibold !text-white '
                    uk-slideshow-parallax='y: 600,0,0'
                    style={{ transform: 'translateY(0px)' }}
                  >
                    Connect With Friends
                  </h4>
                  <p
                    className='uk-scrollspy-inview mt-7 text-lg leading-8 !text-white '
                    uk-slideshow-parallax='y: 800,0,0;'
                    style={{ transform: 'translateY(0px)' }}
                  >
                    This phrase is more casual and playful. It suggests that you are keeping your friends updated on
                    what’s happening in your life.
                  </p>
                </div>
              </div>
              <div className='absolute bottom-0 left-0 h-96 w-full bg-gradient-to-t from-black' />
            </li>
            <li className='w-full' tabIndex={-1}>
              <img
                src='assets/images/post/img-2.jpg'
                alt=''
                className='uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left h-full w-full object-cover'
              />
              <div className='uk-tr ansition-slide-bottom-small absolute bottom-0 z-10 w-full'>
                <div
                  className='relative z-30 mx-auto w-full max-w-xl px-5 pb-32'
                  uk-scrollspy='target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
                >
                  <img
                    className='w-12'
                    src='assets/images/logo-icon.png'
                    alt='Socialite html template'
                    style={{ opacity: 0 }}
                  />
                  <h4
                    className='mt-7 text-2xl font-semibold !text-white'
                    uk-slideshow-parallax='y: 800,0,0'
                    style={{ opacity: 0 }}
                  >
                    Connect With Friends
                  </h4>
                  <p
                    className='mt-7 text-lg leading-8 !text-white'
                    uk-slideshow-parallax='y: 800,0,0;'
                    style={{ opacity: 0 }}
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
              <li uk-slideshow-item={0} className='uk-active'>
                <a href='' />
              </li>
              <li uk-slideshow-item={1}>
                <a href='' />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
