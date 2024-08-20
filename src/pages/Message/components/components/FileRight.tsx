import { IonIcon } from '@ionic/react'
import React from 'react'

function FileRight() {
  return (
    <div className='flex cursor-pointer gap-3 p-2 shadow-sm'>
      <div className='flex  items-center rounded-[10px] bg-secondery p-2 '>
        <IonIcon icon='document' className='h-6 w-6' />
      </div>
      <div className='flex w-full flex-1 flex-col items-start justify-around truncate text-ellipsis'>
        <p className='text-sm'>
          Biên bản const namefile = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, laboriosam qui
          atque natus suscipit a necessitatibus deserunt neque, impedit officia id quos dolorum, aliquam modi! Earum
          iure commodi labore sit.docx'.docx
        </p>
        <p className='text-xs text-gray-500 dark:text-gray-400'>12.0kb</p>
      </div>
    </div>
  )
}

export default FileRight
