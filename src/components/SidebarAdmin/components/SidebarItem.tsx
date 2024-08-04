import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

interface LinkItem {
  to: string
  label: string
}

interface SidebarItemProps {
  icon: string
  title: string
  links: LinkItem[]
}

const SidebarItem = ({ icon, title, links }: SidebarItemProps) => {
  const { pathname } = useLocation()

  const isActive = (path: string) => {
    return pathname === path
  }

  const isGroupActive = () => {
    return links.some((link) => isActive(link.to))
  }

  return (
    <li className='uk-parent mx-[14px] mt-1'>
      <a
        href='#!'
        className={classNames('group flex items-center gap-3 rounded-md py-2.5 pl-3 pr-2', {
          'bg-[#7367f0] text-white hover:bg-[#7367f0]': isGroupActive(),
          'hover:bg-slate-100': !isGroupActive()
        })}
      >
        <i className={`fa-solid ${icon} text-base`}></i>
        {title}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='ml-auto h-5 w-5 duration-200 group-aria-expanded:rotate-180'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
        </svg>
      </a>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={classNames(
                'mt-1 flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700',
                {
                  'font-medium text-[#7367f0]': isActive(link.to)
                }
              )}
            >
              <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default SidebarItem
