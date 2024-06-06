import React from 'react'

function ResultSearchMessageSkelaton() {
  return (
    <div className='h-[calc(100vh-195px)] w-full overflow-y-auto p-5 py-2 md:h-[calc(100vh-204px)]'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={`mt-6 flex  flex-row  gap-3`}>
          <div className='h-9 w-9 flex-shrink-0 rounded-full bg-slate-300' />
          <div className='w-full rounded-[10px] bg-slate-300 px-4 py-2'>
            <div className='h-3 w-[100px] bg-slate-300' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResultSearchMessageSkelaton
