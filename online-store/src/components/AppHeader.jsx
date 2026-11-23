import { NavLink } from "react-router-dom"
import { useSession } from "../hooks/useSession"
import { useLogout } from "../store/auth/logout-store";

export const AppHeader = () => {

    const isAuth = useSession((state) => state.isAuth);
    const { logout, isPending } = useLogout()

    return (
        <header className="bg-teal-500">
            <nav className="container flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 font-bold text-white" aria-label="Main navigation">
                <ul className="flex flex-wrap items-center gap-4">
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='favorites'>Favorites</NavLink>
                    </li>
                    <li>
                        <NavLink to='orders'>Orders</NavLink>
                    </li>
                    <li>
                        <NavLink to='cart'>Cart</NavLink>
                    </li>
                </ul>
                {
                    isAuth ?
                        (
                            <button
                                disabled={isPending}
                                onClick={logout}
                                className="shrink-0 whitespace-nowrap cursor-pointer"
                            >
                                Logout
                            </button>
                        ) :
                        (
                            <NavLink
                                to='auth'
                                className="shrink-0 whitespace-nowrap cursor-pointer"
                            >
                                Sign in
                            </NavLink>
                        )
                }
            </nav>
        </header>
    )
}
