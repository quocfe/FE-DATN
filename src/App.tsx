import { ToastContainer } from 'react-toastify'
import useRouteElements from './hooks/useRouteElements'
import 'react-toastify/dist/ReactToastify.css'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import Loading from './components/Loading'
import MessageFixed from './components/MessageFixed/MessageFixed'
import { io } from 'socket.io-client'
import { useContext, useEffect, useState } from 'react'
import { getProfileFromLocalStorage } from './utils/auth'
import { useSocketContext } from './context/socket'
import useVideoCallMessageSocket from './hooks/socket/useVideoCallMessageSocket'
import useMessageStore from './store/message.store'
import InComingCallVideo from './pages/Message/components/InComingCallVideo'
import messageApi from './apis/message.api'
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
import ZegoLocalStream from 'zego-express-engine-webrtc/sdk/code/zh/ZegoLocalStream.web'
import useMessageFixStore from './store/messageFix.store'
import { useParams } from 'react-router-dom'
import HiddenMessageFix from './components/MessageFixed/HiddenMessageFix'

function App() {
  useVideoCallMessageSocket()
  const { socket } = useSocketContext()
  const routeElements = useRouteElements()
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const { inCommingVideoCall } = useMessageStore()
  const url = window.location.href
  const checkUrlMesage = url.split('/').includes('message')
  const { messagesFix, hiddenMessageFix, setMessageFix } = useMessageFixStore()

  useEffect(() => {
    socket?.on('newMessage', (data) => {
      if (!checkUrlMesage) {
        // setMessageFix(data)
      }
    })

    return () => {
      socket?.off('newMessage')
    }
  }, [socket, checkUrlMesage])

  if (inCommingVideoCall && Object.keys(inCommingVideoCall).length > 0) {
    return <InComingCallVideo />
  }

  return (
    <div id='wrapper'>
      {/* {isFetching + isMutating !== 0 && <Loading />} */}
      {routeElements}

      <ToastContainer position='bottom-right' />

      {messagesFix.length > 0 && !checkUrlMesage && (
        <div className='fixed bottom-0 right-20 flex h-[450px] w-fit flex-row gap-4'>
          {messagesFix.slice(0, 3).map((message_fix, index) => (
            <MessageFixed key={index} message_fix={message_fix} />
          ))}
        </div>
      )}
      {hiddenMessageFix.length > 0 && !checkUrlMesage && (
        <div className='fixed flex flex-col gap-2 bottom-10 right-1 h-fit'>
          {hiddenMessageFix.map((message_fix, index) => (
            <HiddenMessageFix key={index} message_fix={message_fix} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
