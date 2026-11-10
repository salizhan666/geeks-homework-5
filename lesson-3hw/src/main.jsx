import { createRoot } from 'react-dom/client'
import './index.css'
import './style/pico-main/css/pico.min.css'
import { App } from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 120000,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
      <ReactQueryDevtools initialIsOpen={false}/>
    </BrowserRouter>
  </QueryClientProvider>

)
