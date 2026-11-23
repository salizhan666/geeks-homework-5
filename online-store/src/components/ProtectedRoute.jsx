import { Navigate, Outlet } from "react-router-dom"
import { useSession } from "../hooks/useSession"

export const ProtectedRoute = () => {
    
    const isAuth = useSession((state) => state.isAuth)

    if (!isAuth) {
        return <Navigate to='/auth' replace/>
    }

    return <Outlet />
}
