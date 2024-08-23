import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSocketContext } from './context/socket'
import useNotifyMessageSocket from './hooks/socket/useNotifyMessageSocket'
import useVideoCallMessageSocket from './hooks/socket/useVideoCallMessageSocket'
import useRouteElements from './hooks/useRouteElements'
import InComingCallVideo from './pages/Message/components/InComingCallVideo'
import useMessageStore from './store/message.store'
import Loading from './components/Loading'

function App() {
  useVideoCallMessageSocket()
  useNotifyMessageSocket()
  const { socket } = useSocketContext()
  const routeElements = useRouteElements()
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const { inCommingVideoCall } = useMessageStore()

  if (inCommingVideoCall && Object.keys(inCommingVideoCall).length > 0) {
    return <InComingCallVideo />
  }

  return (
    <div id='wrapper'>
      {/* {isFetching + isMutating !== 0 && <Loading />} */}
      {routeElements}
      <ToastContainer position='bottom-right' />
    </div>
  )
}

export default App
