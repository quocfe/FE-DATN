import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'

interface BaseConfigParams {
  _page: string
  _limit: string
}

interface Props<TypeConfigParams> {
  pages: number | string
  basePath: string
  configParams: TypeConfigParams
}

const RANGE = 2

function Pagination<TypeConfigParams>({ pages, basePath, configParams }: Props<TypeConfigParams>) {
  const currentPage = +(configParams as BaseConfigParams)._page

  let dotAfter = false
  let dotBefore = false

  const isRenderDotAfter = (pageNumber: number) => {
    return (
      (currentPage <= RANGE * 2 + 1 && pageNumber > currentPage + RANGE && pageNumber < +pages - RANGE + 1) ||
      (currentPage > RANGE * 2 + 1 &&
        currentPage < +pages - RANGE * 2 &&
        pageNumber > currentPage + RANGE &&
        pageNumber < +pages - RANGE + 1)
    )
  }

  const isRenderDotBefore = (pageNumber: number) => {
    return (
      (currentPage > RANGE * 2 + 1 &&
        currentPage < +pages - RANGE * 2 &&
        pageNumber < currentPage - RANGE &&
        pageNumber > RANGE) ||
      (currentPage >= +pages - RANGE * 2 && pageNumber > RANGE && pageNumber < currentPage - RANGE)
    )
  }

  const renderDot = (type: 'before' | 'after', index: number) => {
    if (type === 'before' && !dotBefore) {
      dotBefore = true
    } else if (type === 'after' && !dotAfter) {
      dotAfter = true
    } else {
      return null
    }
    return (
      <div key={index} className='rounded-md bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
        ...
      </div>
    )
  }

  const renderPagination = () => {
    return Array.from({ length: +pages }, (_, index) => {
      const pageNumber = ++index
      const linkProps = {
        to: {
          pathname: basePath,
          search: createSearchParams({
            ...configParams,
            _page: pageNumber.toString()
          }).toString()
        },
        key: pageNumber,
        className: classNames('rounded-md px-3 py-1 text-sm dark:bg-gray-800', {
          'bg-blue-100/60 text-blue-500': pageNumber === +currentPage,
          'bg-gray-100': pageNumber !== +currentPage
        })
      }

      if (isRenderDotAfter(pageNumber)) {
        return renderDot('after', index)
      } else if (isRenderDotBefore(pageNumber)) {
        return renderDot('before', index)
      }

      return <Link {...linkProps}>{pageNumber}</Link>
    })
  }

  return (
    <div className='mt-6 flex items-center justify-between'>
      <Link
        to={{
          pathname: '/friend/suggests',
          search: createSearchParams({
            ...configParams,
            _page: '1'
          }).toString()
        }}
        className='flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-5 w-5 rtl:-scale-x-100'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
        </svg>
        <span>Trang đầu</span>
      </Link>
      <div className='hidden items-center gap-x-3 md:flex'>{renderPagination()}</div>
      <Link
        to={{
          pathname: '/friend/suggests',
          search: createSearchParams({
            ...configParams,
            _page: pages.toString()
          }).toString()
        }}
        className='flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
      >
        <span>Trang cuối</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-5 w-5 rtl:-scale-x-100'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3' />
        </svg>
      </Link>
    </div>
  )
}

export default Pagination
