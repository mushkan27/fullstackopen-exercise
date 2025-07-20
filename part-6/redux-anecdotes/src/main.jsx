import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ReactQueryApp from './ReactQueryApp'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
 <QueryClientProvider client={queryClient}>
  <ReactQueryApp />
  </QueryClientProvider>
)