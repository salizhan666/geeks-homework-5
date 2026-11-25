import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom'
import { AppHeader } from './AppHeader'

export const AppLayout = () => {    
    return (
        <>
            <AppHeader />
            <Toaster />
            <main className='container'>
                <Outlet />
            </main>
        </>
    )
}
