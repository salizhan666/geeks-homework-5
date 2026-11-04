import { Link } from "react-router"

export const NotFoundPage = () => {
    return (
        <div className="notFoundPage">
            <span>404</span>
            <p>Page Not Found</p>
            <Link to='/'>Back to main page</Link>
        </div>
    )
}
