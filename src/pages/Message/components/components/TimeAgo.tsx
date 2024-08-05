import React, { useCallback, useEffect, useState } from 'react'
import { calculateTimeAgo } from '~/utils/helpers'

function TimeAgo({ time }: { time: any }) {
  return (
    <div className={`absolute right-2 top-[15px] block text-xs font-light text-gray-500 dark:text-white/70`}>
      {calculateTimeAgo(time)}
    </div>
  )
}

export default React.memo(TimeAgo)
