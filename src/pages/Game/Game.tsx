import { listGame } from '~/data/listGame'
import GameItem from './components/GameItem'

function Game() {
  return (
    <div className='pb-5 pt-2'>
      <h1 className='mb-5 text-xl font-medium'>Danh sách trò chơi</h1>
      <div className='grid grid-cols-5 gap-5'>
        {/* Game Item */}
        {listGame.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default Game
