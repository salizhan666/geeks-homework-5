import { useSearchParams } from "react-router-dom"

export const useAppSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const get = (key) => searchParams.get(key)

    const set = (key, value) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set(key, value)
            return newParams
        })
    }

    const remove = (key, value) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.delete(key, value)
            return newParams
        })
    }

    return {
        get,
        set,
        remove
    }
}