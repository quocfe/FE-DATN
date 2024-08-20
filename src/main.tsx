import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import ConfirmProvider from './components/design-systems/comfirm/confirm-provider.tsx'
import { SocketContextProvider } from './context/socket.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-right' /> */}

      {/* <ReactQueryDevtools initialIsOpen={false} position='right' buttonPosition='bottom-left' /> */}
      <ConfirmProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </ConfirmProvider>
    </QueryClientProvider>
  </Router>
)
