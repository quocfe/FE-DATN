import { Link } from 'react-router-dom'

interface Props {
  game: Game
}

function GameItem({ game }: Props) {
  return (
    <div>
      <div>
        <img src={game.thumb} alt='' className='h-full w-full rounded-md object-cover' />
      </div>
      <Link to={`/game/play/${game.id}`} className='my-2 line-clamp-1 cursor-pointer text-[15px] font-medium'>
        {game.title}
      </Link>
      <div className='rounded-md bg-gray-200 p-2'>
        <p className='line-clamp-3 text-xs'>{game.description}</p>
      </div>
    </div>
  )
}

export default GameItem
