import powerpoint from '../../../../public/powerpoint-2.svg'
import pdf from '../../../../public/adobe-pdf-3.svg'
import excel from '../../../../public/excel-4.svg'
import word from '../../../../public/word-1.svg'
import { IonIcon } from '@ionic/react'

export const renderTypeFile = (fileName: string) => {
  const typeFile = fileName.split('.').pop()?.toLowerCase()
  switch (typeFile) {
    case 'docx':
      return <img src={word} alt='Word' className='h-[30px] w-[30px] object-cover' />
    case 'xlsx':
      return <img src={excel} alt='Excel' className='h-[30px] w-[30px] object-cover' />
    case 'pptx':
      return <img src={powerpoint} alt='PowerPoint' className='h-[30px] w-[30px] object-cover' />
    case 'pdf':
      return <img src={pdf} alt='PDF' className='h-[30px] w-[30px] object-cover' />
    default:
      return <IonIcon icon='document' className='h-[30px] w-[30px] object-cover' />
  }
}
