import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useNotifyMessageSocket from './hooks/socket/useNotifyMessageSocket'
import useVideoCallMessageSocket from './hooks/socket/useVideoCallMessageSocket'
import useRouteElements from './hooks/useRouteElements'
import InComingCallVideo from './pages/Message/components/InComingCallVideo'
import useMessageStore from './store/message.store'
import { useEffect, useState } from 'react'
import CheckConnection from './components/CheckConnection/CheckConnection'

function App() {
  useVideoCallMessageSocket()
  useNotifyMessageSocket()
  const routeElements = useRouteElements()
  const { inCommingVideoCall } = useMessageStore()

  if (inCommingVideoCall && Object.keys(inCommingVideoCall).length > 0) {
    return <InComingCallVideo />
  }

  return (
    <CheckConnection>
      <div id='wrapper'>
        {routeElements}
        <ToastContainer position='bottom-right' />
      </div>
    </CheckConnection>
  )
}

export default App
