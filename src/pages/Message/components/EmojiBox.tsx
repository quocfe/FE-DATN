import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

function EmojiBox({ onEmojiSelect }: any) {
  return (
    <div
      className='dropbar p-2'
      uk-drop='stretch: x; target: #message__wrap ;animation: uk-animation-scale-up uk-transform-origin-bottom-left ;animate-out: true; pos: top-left ; offset:2; mode: click ; duration: 200 '
    >
      <div className='dark:bg-dark3 rounded-xl border bg-white pr-0 shadow-lg sm:w-60 dark:border-slate-700'>
        <Picker data={data} previewPosition='none' locale='vi' onEmojiSelect={onEmojiSelect} />
      </div>
    </div>
  )
}

export default EmojiBox
