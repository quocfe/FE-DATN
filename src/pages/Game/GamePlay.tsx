import { useNavigate, useParams } from 'react-router-dom'
import { listGame } from '~/data/listGame'

function GamePlay() {
  const { id } = useParams()
  const navigate = useNavigate()
  const game = listGame.filter((game) => game.id === id)

  if (game.length === 0) {
    navigate('/not_found')
  }

  return (
    <div className='mt-8 flex gap-5'>
      <iframe
        src={game[0].url}
        className='flex-1 overflow-hidden rounded-md shadow-md'
        style={{
          height: 'calc(100vh - 200px)'
        }}
      ></iframe>
      <div className='w-96'>
        <div className='mb-2 text-sm'>
          <h3 className='rounded-md p-2.5 text-sm font-semibold'>Title</h3>
          <p className='px-2.5 text-sm'>{game[0].title}</p>
        </div>
        <div className='mb-2'>
          <h3 className='rounded-md p-2.5 text-sm font-semibold'>Instructions</h3>
          <p className='px-2.5 text-sm'>{game[0].instructions}</p>
        </div>
        <div className='mb-2'>
          <h3 className='rounded-md p-2.5 text-sm font-semibold'>Category</h3>
          <p className='px-2.5 text-sm'>{game[0].category}</p>
        </div>
        <div className='mb-2'>
          <h3 className='rounded-md p-2.5 text-sm font-semibold'>Description</h3>
          <p className='px-2.5 text-sm'>{game[0].description}</p>
        </div>
        <div className='mb-2'>
          <h3 className='rounded-md p-2.5 text-sm font-semibold'>Tags</h3>
          <p className='px-2.5 text-sm'>{game[0].tags}</p>
        </div>
      </div>
    </div>
  )
}

export default GamePlay
