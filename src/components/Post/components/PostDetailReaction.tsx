import classNames from 'classnames'
import { useState } from 'react'

interface Props {
  reactions: PostReaction[]
  reactionIcons: { [key: string]: string }
}

function PostDetailReaction({ reactions, reactionIcons }: Props) {
  const [selectedReaction, setSelectedReaction] = useState<string>('all')

  // Lọc tương tác theo loại
  const filteredReactions =
    selectedReaction === 'all' ? reactions : reactions.filter((reaction) => reaction.type === selectedReaction)

  const countReactionType = (type: string) => {
    const count = reactions.filter((reaction) => reaction.type === type).length
    return count ? `(${count})` : ''
  }

  return (
    <div className='relative h-[450px] overflow-y-scroll px-5' style={{ scrollbarWidth: 'thin' }}>
      <ul className='sticky left-0 top-0 flex w-full justify-center justify-between gap-8 bg-white py-4'>
        <li>
          <a
            onClick={() => setSelectedReaction('all')}
            className={classNames('flex cursor-pointer items-center gap-2 py-2', {
              'border-b-[3px] border-blue-500': selectedReaction === 'all'
            })}
          >
            Tất cả ({reactions.length})
          </a>
        </li>
        <li>
          <a
            onClick={() => setSelectedReaction('love')}
            className={classNames('flex cursor-pointer items-center gap-2 py-2', {
              'border-b-[3px] border-blue-500': selectedReaction === 'love'
            })}
          >
            <img className='w-5' src={reactionIcons['love']} alt='' /> Yêu thích {countReactionType('love')}
          </a>
        </li>
        <li>
          <a
            onClick={() => setSelectedReaction('haha')}
            className={classNames('flex cursor-pointer items-center gap-2 py-2', {
              'border-b-[3px] border-blue-500': selectedReaction === 'haha'
            })}
          >
            <img className='w-5' src={reactionIcons['haha']} alt='' /> Haha {countReactionType('haha')}
          </a>
        </li>
        <li>
          <a
            onClick={() => setSelectedReaction('sad')}
            className={classNames('flex cursor-pointer items-center gap-2 py-2', {
              'border-b-[3px] border-blue-500': selectedReaction === 'sad'
            })}
          >
            <img className='w-5' src={reactionIcons['sad']} alt='' /> Buồn {countReactionType('sad')}
          </a>
        </li>
        <li>
          <a
            onClick={() => setSelectedReaction('wow')}
            className={classNames('flex cursor-pointer items-center gap-2 py-2', {
              'border-b-[3px] border-blue-500': selectedReaction === 'wow'
            })}
          >
            <img className='w-5' src={reactionIcons['wow']} alt='' /> Wow {countReactionType('wow')}
          </a>
        </li>
        <li>
          <a
            onClick={() => setSelectedReaction('angry')}
            className={classNames('flex cursor-pointer items-center gap-2 py-2', {
              'border-b-[3px] border-blue-500': selectedReaction === 'angry'
            })}
          >
            <img className='w-5' src={reactionIcons['angry']} alt='' /> Phẫn nộ {countReactionType('angry')}
          </a>
        </li>
      </ul>
      <ul>
        {filteredReactions.length > 0 ? (
          filteredReactions.map((reaction) => {
            return (
              <li key={reaction.post_reaction_id} className='flex items-center justify-between py-[10px]'>
                <div className='flex items-center gap-2'>
                  <img
                    className='h-9 w-9 rounded-full object-cover'
                    src={reaction.user_reaction.Profile.profile_picture}
                  />
                  <span className='cursor-pointer'>
                    {reaction.user_reaction.last_name} {reaction.user_reaction.first_name}
                  </span>
                </div>
                <img className='w-6' src={reactionIcons[reaction.type]} alt='' />
              </li>
            )
          })
        ) : (
          <div className='pt-5 text-center font-normal text-gray-500'>Chưa có tương tác với cảm xúc này</div>
        )}
      </ul>
    </div>
  )
}

export default PostDetailReaction
