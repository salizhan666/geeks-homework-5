import { Link, useLoaderData, useLocation } from "react-router"

export const DetailPage = () => {
    const planet = useLoaderData()
    const { state } = useLocation()

    const visited = state?.visited ?? false
    
    return (
        <div className="container">
            <Link to="/">← Back to list</Link>

            <article>
                <h1>{planet.name}</h1>
                <p className="badge">{visited ? 'Visited' : 'None visited'}</p>
                <p>Climate: {planet.climate}</p>
                <p>Terrain: {planet.terrain}</p>
                <p>Population: {planet.population}</p>
                <p>Diameter: {planet.diameter}</p>
                <p>Gravity: {planet.gravity}</p>
            </article>

            <h2>Residents</h2>
            {planet.residents.length === 0 ? (
                <p>Residents not found</p>
            ) : (
                <ul className="residents">
                    {planet.residents.map((person) => {
                        const id = person.url.split('/').pop()
                        return (
                            <li key={person.url}>
                                <Link to={`/people/${id}`} state={{ person }}>
                                    {person.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}