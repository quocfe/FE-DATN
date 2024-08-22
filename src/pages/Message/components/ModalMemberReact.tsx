import Modal from '~/components/Modal'
import { useQueryMembers } from '../hooks/useQuery/useQueryMembers'
import { useState } from 'react'

type ModalTypes = {
  isOpen: boolean
  onClose: () => void
  reactArr: any
  group_id: string
}

const ModalMemberReact = ({ isOpen, onClose, reactArr, group_id }: ModalTypes) => {
  console.log('ModalMemberReact', ModalMemberReact)
  const { data } = useQueryMembers(group_id, 2)
  const [arrReactType, setArrReactType] = useState<[]>([])
  const members = data?.data.data
  const allReact = reactArr.map((react: any) => {
    const member = members?.find((m: any) => m.user_id === react.user_id)
    return {
      user_id: react.user_id,
      fullname: member?.fullname,
      avatar: member?.avatar,
      emoji: react.emoji
    }
  })

  const reactUnique: { emoji: string; count: number }[] = []
  allReact.forEach((react: any) => {
    const emoji = react.emoji
    const findIndex = reactUnique.findIndex((item) => item.emoji === emoji)
    if (findIndex === -1) {
      reactUnique.push({ emoji, count: 1 })
    } else {
      reactUnique[findIndex].count++
    }
  })

  const typeReact = (react: string) => {
    const newArr = allReact.filter((item: any) => item.emoji === react)
    setArrReactType(newArr)
  }

  return (
    <Modal isVisible={isOpen} onClose={onClose} width='400px'>
      <div className='flex h-full flex-col justify-evenly '>
        <div className='flex-1'>
          <div className='p-6'>
            <h2 className='text-xl font-semibold'>Cảm xúc về tin nhắn</h2>
          </div>
          <div className='p-6 py-0'>
            <div className='relative z-20 h-full'>
              <div className='box !shadow-none'>
                <nav className='nav__underline px-3.5'>
                  <ul
                    className='group'
                    uk-switcher='connect: #group-tabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium'
                  >
                    <li className='uk-active'>
                      <a className='' href='#' aria-expanded='true'>
                        All
                      </a>
                    </li>
                    {reactUnique.length > 0 &&
                      reactUnique.map((react: any, index: number) => (
                        <li key={index} className='uk-active flex flex-row items-center gap-2'>
                          <a onClick={() => typeReact(react.emoji)} href='#' aria-expanded='true'>
                            {react.emoji}
                          </a>
                          <p className='text-[10px]'>{react.count}</p>
                        </li>
                      ))}
                  </ul>
                </nav>
                <div id='group-tabs' className='uk-switcher mt-2 text-sm ' style={{ touchAction: 'pan-y pinch-zoom' }}>
                  <div className='uk-child-width-1-3@m' uk-grid='true' uk-lightbox='animation: slide'>
                    <div className='flex flex-col items-center gap-2'>
                      {allReact.length > 0 &&
                        allReact.map((react: any, index: number) => (
                          <div key={index} className='flex w-full items-center justify-between p-2'>
                            <div className='flex flex-row gap-2'>
                              <img src={react.avatar} className='h-9 w-9 rounded-full object-cover' alt='' />
                              <p>{react.fullname}</p>
                            </div>
                            <p>{react.emoji}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                  {reactUnique.map((_, index: number) => (
                    <div key={index} className='uk-active'>
                      {arrReactType.map((react: any, index: number) => (
                        <div key={index} className='flex w-full items-center justify-between p-2'>
                          <div className='flex flex-row gap-2'>
                            <img src={react.avatar} className='h-9 w-9 rounded-full object-cover' alt='' />
                            <p>{react.fullname}</p>
                          </div>
                          <p>{react.emoji}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalMemberReact
