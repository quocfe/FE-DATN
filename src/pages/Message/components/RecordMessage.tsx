import { IonIcon } from '@ionic/react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { ReactMic } from 'react-mic'
import useConversationStore from '~/store/conversation.store'
import { useQueryInfinifyConversation } from '../hooks/useQueryInfinifyConversation'
import { useQueryInfinifyMessage } from '../hooks/useQueryInfinifyMessage'
import { useQueryMessage } from '../hooks/useQueryMessage'
import { useQueryStatusMessage } from '../hooks/useQueryStatusMessage'
import { useMutationSendMessageAttach } from '../hooks/useMutaion/useMutationSendMessage'
import useFileUpload from '../utils/uploadApi'
import AudioTimer from './AudioTimer'

type PropsRecord = {
  openRecordMessage: boolean
  setOpenRecordMessage: Dispatch<SetStateAction<boolean>>
  messageFix?: boolean
}

const RecordMessage = ({ setOpenRecordMessage, openRecordMessage, messageFix }: PropsRecord) => {
  const [isRecording, setIsRecording] = useState(false)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const cancelRecordRef = useRef(true) // Sử dụng useRef để lưu trữ cancelRecord
  const { uploadRecordMessage } = useFileUpload()
  const { data } = useQueryMessage()
  const sendMedia = useMutationSendMessageAttach()
  const { selectedConversation, setPreviewImg } = useConversationStore()
  const { refetch: refetchStatusMessage } = useQueryStatusMessage()
  const { refetch: refetchConversation } = useQueryInfinifyConversation()
  const { refetch: refetchMessage } = useQueryInfinifyMessage()
  const receiverID = data?.data?.data?.info?.group_id
  let groupID = selectedConversation?.group_id

  const onStop = async (recordedBlob: any) => {
    setOpenRecordMessage(!openRecordMessage)
    if (!cancelRecordRef.current) {
      const data = await uploadRecordMessage(recordedBlob.blob)
      const mediaData = {
        body: `Tin nhắn thoại`,
        sub_body: data.url,
        receiver: receiverID,
        group_message_id: groupID,
        type: 5
      }

      sendMedia.mutate(mediaData)
      refetchConversation()
      refetchStatusMessage()
      refetchMessage()
    } else {
      console.log('hủy')
    }
  }

  useEffect(() => {
    setElapsedTime(0)
    setIsRecording(true)
  }, [])

  const stopRecording = () => {
    setIsRecording(false)
    cancelRecordRef.current = false // Cập nhật ref
  }

  const handleCloseRecord = () => {
    setIsRecording(false)
    cancelRecordRef.current = true // Cập nhật ref
  }

  return (
    <div className={`flex h-full flex-1 flex-row items-center justify-evenly ${messageFix ? ' gap-1' : ' gap-3'}`}>
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
        noiseSuppression={true}
      />
      <AudioTimer isRunning={isRecording} elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} />
      <button onClick={stopRecording} className='text-dark p-2'>
        <IonIcon className='flex text-xl font-bold text-primary' icon='send' />
      </button>
    </div>
  )
}

export default RecordMessage
