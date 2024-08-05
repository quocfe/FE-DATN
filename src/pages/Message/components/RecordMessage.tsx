import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import Modal from '~/components/Modal'
import WaveSurfer from 'wavesurfer.js'
import { ReactMic } from 'react-mic'
import useFileUpload from '../utils/uploadApi'
import { IonIcon } from '@ionic/react'
import { useWavesurfer } from '@wavesurfer/react'
import { useQueryMessage } from '../hooks/useQueryMessage'
import useConversationStore from '~/store/conversation.store'
import { useMutationSendMessageAttach } from '../hooks/useMutationSendMessage'
import AudioTimer from './AudioTimer'

type PropsRecord = {
  openRecordMessage: boolean
  setOpenRecordMessage: Dispatch<SetStateAction<boolean>>
}

const RecordMessage = ({ setOpenRecordMessage, openRecordMessage }: PropsRecord) => {
  const [isRecording, setIsRecording] = useState(false)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null)
  const [recordFile, setRecordFile] = useState<File | null>(null)
  const [changeRecordScreen, setChangeRecordScreen] = useState<boolean>(false)
  const containerRef = useRef(null)
  const { uploadRecordMessage } = useFileUpload()
  const { data } = useQueryMessage()
  const sendMedia = useMutationSendMessageAttach()
  const { selectedConversation, setPreviewImg } = useConversationStore()

  const receiverID = data?.data?.data?.info?.group_id
  let groupID = selectedConversation?.group_id

  const onStop = async (recordedBlob: any) => {
    setIsRecording(false)
    setPreviewImg(recordedBlob.blobURL)
    setOpenRecordMessage(!openRecordMessage)
    const data = await uploadRecordMessage(recordedBlob.blob)

    const mediaData = {
      body: `Tin nhắn thoại`,
      sub_body: data.url,
      receiver: receiverID,
      group_message_id: groupID,
      type: 5
    }

    sendMedia.mutate(mediaData)
  }

  useEffect(() => {
    setElapsedTime(0)
    setIsRecording(true)
  }, [])

  const startRecording = () => {
    setElapsedTime(0)
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
  }

  const clearRecording = () => {
    setIsRecording(false)
    setRecordedBlobUrl(null)
    setElapsedTime(0)
  }

  const handleCloseRecord = () => {
    clearRecording()
    setOpenRecordMessage(!openRecordMessage)
  }

  return (
    <div className='flex h-full flex-1 flex-row items-center justify-evenly gap-3 '>
      <div
        onClick={handleCloseRecord}
        className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-primary-soft p-1'
      >
        <IonIcon name='close-outline' className='text-[12px] ' />
      </div>
      <ReactMic
        record={isRecording}
        className='sound-wave h-[30px] flex-1  rounded-full'
        onStop={onStop}
        strokeColor='#fff'
        visualSetting='sinewave'
        backgroundColor='#0284C7'
      />
      <AudioTimer isRunning={isRecording} elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} />
      <button onClick={stopRecording} className='text-dark p-2'>
        <IonIcon className='flex text-xl font-bold text-primary' icon='send' />
      </button>
    </div>
  )
}

export default RecordMessage

/*
    <div className=' flex h-[58px] flex-1 items-center justify-evenly '>
   isRecording && (
          <div
            className='left-0 flex items-center justify-center p-2 rounded-full cursor-pointer'
            onClick={handleCacelRecord}
          >
            <IonIcon name='close-circle-outline' className='text-[22px]' />
          </div>
        )} 
     <ReactMic
          record={isRecording}
          className='sound-wave h-[30px] w-[100%] rounded-full '
          onStop={onStop}
          strokeColor='#fff'
          visualSetting='sinewave'
          backgroundColor='#5084F6'
        /> 
    <button className='p-2 text-dark shrink-0'>
          <IonIcon className='flex text-xl font-bold text-primary' icon='send' />
        </button>

         <div className='mt-2'>
          {recordedBlobUrl ? (
            <button onClick={clearRecording} className='text-[16px] font-medium text-[#fff]'>
              Clear
            </button>
          ) : null}
        </div>

         
      <button>upload</button> *
      </div>
*/
