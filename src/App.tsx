import { ToastContainer } from 'react-toastify'
import useRouteElements from './hooks/useRouteElements'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElements()

  return (
    <div id='wrapper'>
      {routeElements}
      <ToastContainer position='bottom-right' />
    </div>
  )
}

export default App
