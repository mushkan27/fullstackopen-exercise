import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'        
import store from './store'                  
import ReactQueryApp from './ReactQueryApp'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>                    
    <QueryClientProvider client={queryClient}>
      <ReactQueryApp />
    </QueryClientProvider>
  </Provider>
)
