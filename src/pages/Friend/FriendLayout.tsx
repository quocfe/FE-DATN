import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

function FriendLayout({ children }: Props) {
  const { pathname } = useLocation()

  return (
    <>
      <ul className='mt-3 flex gap-5 text-[15px] font-medium text-gray-600'>
        <li
          className={classNames('w-auto pr-2.5', {
            'border-b-2 border-gray-800 text-gray-800': pathname === '/friend/requests'
          })}
        >
          <Link to={'/friend/requests'}> Lời mời kết bạn </Link>
        </li>
        <li
          className={classNames('w-auto pr-2.5', {
            'border-b-2 border-gray-800 text-gray-800': pathname === '/friend/suggests'
          })}
        >
          <Link to={'/friend/suggests'}> Bạn bè gợi ý </Link>
        </li>
        <li
          className={classNames('w-auto pr-2.5', {
            'border-b-2 border-gray-800 text-gray-800': pathname === '/friend/sent_requests'
          })}
        >
          <Link to={'/friend/sent_requests'}> Xem lời mời kết bạn đã gửi</Link>
        </li>
      </ul>
      <div className='mt-8'>{children}</div>
    </>
  )
}

export default FriendLayout
