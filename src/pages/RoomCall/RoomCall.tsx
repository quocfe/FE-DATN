import { IonIcon } from '@ionic/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
import ZegoLocalStream from 'zego-express-engine-webrtc/sdk/code/zh/ZegoLocalStream.web'
import messageApi from '~/apis/message.api'
import { useSocketContext } from '~/context/socket'
import { getProfileFromLocalStorage } from '~/utils/auth'
import { useMutationSendCallMessage } from '../Message/hooks/useMutationSendMessage'

function RoomCall() {
  const { user_id } = getProfileFromLocalStorage()
  const [token, setToken] = useState<string>('')
  const [zg, setZg] = useState<ZegoExpressEngine>()
  const [localStream, setLocalStream] = useState<ZegoLocalStream>()
  const [streamId, setStreamId] = useState<string>('')
  const [endCall, setEndCall] = useState<boolean>(false)
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true)
  const [isAudioOn, setIsAudioOn] = useState<boolean>(true)
  const [timeCall, setTimeCall] = useState<string>('')
  const url = useParams()
  const { roomId: room_id_query, userId: user_id_query, groupId: group_id_query, senderId: sender_id } = url
  const { socket } = useSocketContext()
  const sendCallMessageMutation = useMutationSendCallMessage()
  const dataCall = JSON.parse(localStorage.getItem('dataCall') ?? '') || null
  let timerId: ReturnType<typeof setInterval> | null = null
  let callStartTime: Date | null = null
  console.log('dataCall local', dataCall)
  useEffect(() => {
    const token = async () => {
      try {
        const { data: token } = await messageApi.generateTokenZego(user_id)
        setToken(token)
      } catch (error) {
        console.log(error)
      }
    }
    token()
  }, [])

  useEffect(() => {
    const startCall = async () => {
      const zg = new ZegoExpressEngine(2061219188, '3ee15498db96049a3d34100bb51a1a48')
      setZg(zg)

      zg.on('roomStreamUpdate', async (roomID, updateType, streamList) => {
        if (updateType === 'ADD') {
          const rmVideo = document.getElementById('remote-video')
          const vd = document.createElement('video')
          vd.id = 'video-ui-lager'
          setStreamId(streamList[0].streamID)
          vd.autoplay = true
          vd.className = 'w-full h-[550px] '
          vd.playsInline = true
          vd.muted = false
          if (rmVideo) {
            rmVideo.appendChild(vd)
          }
          zg.startPlayingStream(streamList[0].streamID, {
            audio: true,
            video: true
          }).then((stream) => (vd.srcObject = stream))
          callStartTime = new Date()
          timerId = setInterval(() => {
            if (callStartTime) {
              const elapsed = Date.now() - callStartTime.getTime()
              const hours = Math.floor(elapsed / 3600000)
              const minutes = Math.floor((elapsed % 3600000) / 60000)
              const seconds = Math.floor((elapsed % 60000) / 1000)

              // = `${String(hours).padStart(2, '0')} giờ ${String(minutes).padStart(2, '0')} phút ${String(seconds).padStart(2, '0')} giây`
              let formattedTime
              if (seconds < 60) {
                formattedTime = `${String(seconds).padStart(2, '0')} giây`
              } else if (seconds > 60 && minutes < 60) {
                formattedTime = `${String(minutes).padStart(2, '0')} phút`
              } else {
                formattedTime = `${String(hours).padStart(2, '0')} giờ`
              }
              setTimeCall(formattedTime)
            }
          }, 1000)
        } else if (updateType === 'DELETE' && localStream && zg && streamList[0].streamID) {
          const streamID = streamList[0].streamID
          zg.stopPublishingStream(streamID)
          zg.destroyStream(localStream)
        }
      })

      await zg.loginRoom(
        room_id_query ? room_id_query : '',
        token,
        {
          userID: user_id_query ? user_id_query : ''
        },
        {
          userUpdate: true
        }
      )

      const localStream = await zg.createZegoStream({
        camera: {
          audio: true,
          video: true
        }
      })
      const localVideo = document.getElementById('local-audio')
      const videoElement = document.createElement('video')
      videoElement.id = 'video-local-zego'
      videoElement.className = 'w-full h-32'
      videoElement.autoplay = true
      videoElement.playsInline = true

      localVideo?.appendChild(videoElement)
      const td = document.getElementById('video-local-zego')
      if (td) {
        const mediaElement = td as HTMLMediaElement
        const tracks = localStream.getTracks()
        const mediaStream = new MediaStream(tracks)
        mediaElement.srcObject = mediaStream
      }
      const streamID = 'kjaglkfdglkfd' + Date.now()
      setLocalStream(localStream)
      zg.startPublishingStream(streamID, localStream)
    }

    if (token) {
      startCall()
    }
  }, [token])

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsCameraOn(!isCameraOn)
    }
  }

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsAudioOn(!isAudioOn)
    }
  }

  const clearUiAfterEndCall = () => {
    const localAudioDiv = document.getElementById('local-audio')
    const remoteVideo = document.getElementById('video-local-zego')
    const streamListHtml = document.getElementById('video-ui-lager')

    if (localAudioDiv && remoteVideo) {
      localAudioDiv.removeChild(remoteVideo)
    }
    if (streamListHtml) {
      streamListHtml.parentNode?.removeChild(streamListHtml)
    }
  }

  const handleClickEndCall = async () => {
    if (zg && localStream) {
      zg.destroyStream(localStream)
      zg.stopPublishingStream(streamId)
      zg.logoutRoom(room_id_query)
      setEndCall(true)
      socket?.emit('endCall', group_id_query)
      zg.off('roomStreamUpdate')
      zg.off('roomStateUpdate')
      zg.destroyEngine()
    }
    if (timerId) clearInterval(timerId)
    clearUiAfterEndCall()

    const baseData = {
      body: 'Cuộc gọi video',
      sub_body: timeCall,
      group_message_id: group_id_query,
      type: 6,
      sender: sender_id
    }
    await sendCallMessageMutation.mutateAsync(baseData)
    closeTab()
  }

  useEffect(() => {
    socket?.on('endCall', async () => {
      setEndCall(true)
      clearUiAfterEndCall()
    })

    return () => {
      socket?.off('endCall')
    }
  }, [socket])

  const closeTab = () => {
    window?.close()
  }

  if (endCall) {
    return (
      <div
        className='fixed inset-0 z-[1010] flex items-center bg-black bg-opacity-10 backdrop-blur-sm'
        id='wrapper-modal'
      >
        <div
          className='dark:bg-dark2 relative mx-auto h-[400px] w-[60%] overflow-hidden overflow-y-scroll rounded-lg bg-white text-sm text-black shadow-xl md:w-[400px]'
          style={{ scrollbarWidth: 'none' }}
        >
          <div className='flex h-full flex-col items-center gap-5 p-9'>
            <h1 className='text-[28px] font-semibold'>{dataCall.group_name}</h1>
            <p className='text-[12px]'>Cuộc gọi đã kết thúc</p>
            <div className='flex flex-1 items-center justify-center'>
              <img className='h-32 w-32 rounded-full object-cover' src={dataCall.avatar} alt='' />
            </div>
            <div className='flex gap-11'>
              <div className='flex flex-col items-center gap-3'>
                <button className='flex h-14 w-14 items-center justify-center rounded-full bg-[#22bb33] p-4'>
                  <IonIcon name='videocam' className='text-[30px] text-white' />
                </button>
                <p className=''>Gọi lại</p>
              </div>

              <div className='flex flex-col items-center gap-3'>
                <button
                  onClick={closeTab}
                  className='flex h-14 w-14  items-center justify-center rounded-full bg-[#ff0505] p-4'
                >
                  <IonIcon name='close-outline' className='text-[30px] text-white' />
                </button>
                <p>Đóng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='relative my-5' id='remote-video'>
      <div className='absolute bottom-5 right-36' id='local-audio'></div>
      <div className='absolute -bottom-2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform'>
        <div className='flex items-center justify-around gap-4'>
          <button
            onClick={toggleCamera}
            className=' m-auto flex h-14 w-14 transform items-center justify-center rounded-full bg-[#ffff] p-4'
          >
            <IonIcon name={isCameraOn ? 'videocam' : 'videocam-off'} className='text-black' />
          </button>
          <button
            onClick={handleClickEndCall}
            className=' m-auto flex h-14 w-14  rotate-[135deg]  items-center justify-center rounded-full bg-[#ff0505] p-4'
          >
            <IonIcon name='call' className='text-white' />
          </button>

          <button
            onClick={toggleAudio}
            className=' m-auto flex h-14 w-14 transform items-center justify-center rounded-full bg-[#ffffff] p-4'
          >
            <IonIcon name={isAudioOn ? 'mic' : 'mic-off'} className='text-black' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomCall
