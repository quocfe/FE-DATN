import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'

interface VolumePropType {
  setVolume: React.Dispatch<React.SetStateAction<number>>
  volume: number
}

const Volume = ({ setVolume, volume }: VolumePropType) => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isVolume, setIsVolume] = useState(false)

  const volumeRef = useRef<HTMLDivElement>(null)
  const volumeValueRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => setIsVolume(false))

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setIsMouseDown(true)
  }, [])

  // Hàm xử lý sự kiện khi tăng giảm âm lượng
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isMouseDown && volumeValueRef.current && volumeRef.current) {
        const heightClick = volumeRef.current.getBoundingClientRect().bottom - event.clientY
        const height = heightClick > volumeRef.current.offsetHeight ? 100 : heightClick < 0 ? 0 : heightClick

        // volumeValueRef.current.style.height = Math.round(height) + '%'
        setVolume((1 * height) / 100)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMouseDown]
  )

  // Hủy tăng giảm âm lượng
  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false)
  }, [])

  const handleClickIsVolume = () => {
    setIsVolume((prev) => !prev)
  }

  useEffect(() => {
    if (isMouseDown) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mousedown', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isMouseDown, handleMouseMove, handleMouseUp])

  return (
    <div className='relative flex items-center'>
      <button type='button' onClick={handleClickIsVolume}>
        {volume > 0 ? (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
            <path d='M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z' />
            <path d='M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z' />
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
            <path d='M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z' />
          </svg>
        )}
      </button>
      {isVolume && (
        <div
          ref={ref}
          className='absolute -top-[100px] bottom-full left-0 flex h-[100px] items-end bg-transparent p-2 py-3'
          onMouseDown={handleMouseDown}
        >
          <div ref={volumeRef} className='flex h-20 cursor-pointer items-end' onMouseDown={handleMouseDown}>
            <div
              ref={volumeValueRef}
              className='relative w-[7px] rounded-full bg-[#4080ff]'
              style={{
                height: `${volume * 100}%`
              }}
            >
              <div className='absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white'></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Volume
