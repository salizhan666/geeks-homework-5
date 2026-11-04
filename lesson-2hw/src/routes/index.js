import { createBrowserRouter } from "react-router"
import axios from "axios"
import { HomePage } from "../pages/HomePage"
import { DetailPage } from "../pages/DetailPage"
import { ResidentPage } from "../pages/ResidentPage"
import { NotFoundPage } from "../pages/NotFoundPage"

export const routes = createBrowserRouter([
    {
        path: '/',
        Component: HomePage,
        loader: async () => {
            const { data } = await axios.get('https://swapi.info/api/planets')
            return data
        }
    },
    {
        path: '/planet/:id',
        Component: DetailPage,
        loader: async ({ params }) => {
            const { data: planet } = await axios.get(`https://swapi.info/api/planets/${params.id}`)

            const residents = []
            for (const url of planet.residents) {
                const { data: person } = await axios.get(url)
                residents.push(person)
            }

            return { ...planet, residents }
        }
    },
    {
        path: '/people/:id',
        Component: ResidentPage
    },
    {
        path: '*',
        Component: NotFoundPage
    }
])