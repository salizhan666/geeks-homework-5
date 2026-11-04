import { Link, useLocation, useNavigate } from "react-router"

export const ResidentPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const person = state?.person

    if (!person) {
        return (
            <div className="container">
                <p>The resident not found</p>
                <Link to="/">To main</Link>
            </div>
        )
    }

    return (
        <div className="container">
            <button onClick={() => navigate(-1)}>← Back</button>

            <h1>{person.name}</h1>
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
            <p>Hair color: {person.hair_color}</p>
            <p>Skin color: {person.skin_color}</p>
            <p>Eye color: {person.eye_color}</p>
            <p>Birth year: {person.birth_year}</p>
            <p>Gender: {person.gender}</p>
        </div>
    )
}