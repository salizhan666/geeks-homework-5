import { NavLink } from "react-router-dom"

export const AppHeader = () => {
    return (
        <>
            <header className="flex gap-4 bg-teal-500">
                <ul className="flex gap-4 py-4 container font-bold text-white">
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
                    <li>
                        <NavLink to='auth'>Auth</NavLink>
                    </li>
                </ul>
            </header>
        </>
    )
}
