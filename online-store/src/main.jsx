import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { HomePage } from './pages/HomePage'
import { FavoritesPage } from './pages/FavoritesPage'
import { CartPage } from './pages/CartPage'
import { OrdersPage } from './pages/OrdersPage'
import { AuthPage } from './pages/AuthPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProtectedRoute } from './components/ProtectedRoute'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 2,
        }
    }
})

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path='favorites' element={<FavoritesPage />} />
                        <Route path='cart' element={<CartPage />} />
                        <Route path='orders' element={<OrdersPage />} />
                    </Route>
                    <Route path='auth' element={<AuthPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>

)
