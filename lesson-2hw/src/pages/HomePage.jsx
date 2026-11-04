import { useLoaderData, useNavigation } from "react-router";
import { Link } from "react-router";

export const HomePage = () => {

    const planets = useLoaderData();
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    if (isNavigating) {
        return <span className="loading" aria-busy="true">Loading...</span>
    }

    return (
        <div className="container">
            <div className="planets">
                {
                    planets.map((planet) => {

                        const id = planet.url.split('/').pop();

                        return (
                            <article key={planet.url} className="planet">
                                <h2>{planet.name}</h2>
                                <div className="planet__title">
                                    <span>Climate: {planet.climate}</span>
                                    <span>Terrain: {planet.terrain}</span>
                                    <span>Population: {planet.population}</span>
                                </div>
                                <Link
                                    to={`/planet/${id}`}
                                    state={{ visited: true }}
                                >
                                    View More
                                </Link>

                            </article>
                        )
                    })
                }
            </div>
        </div>
    )
}
