import React, { useCallback, useEffect, useState } from 'react'
import { calculateTimeAgo } from '~/utils/helpers'

function TimeAgo({ time, trigger }: { time: any; trigger: any }) {
  return (
    <div
      className={`absolute right-2 top-[15px] text-xs font-light text-gray-500 group-hover:hidden ${trigger ? 'hidden' : 'block'} dark:text-white/70`}
    >
      {calculateTimeAgo(time)}
    </div>
  )
}

export default React.memo(TimeAgo)
