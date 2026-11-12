const baseUrl = 'https://83e68f322ce7782d.mokky.dev/todos'

const request = async (path = '', options = {}) => {
    const response = await fetch(`${baseUrl}${path}`, options)
    if (!response.ok) {
        throw new Error(`Ошибка сервера (${response.status})`)
    }
    if (response.status === 204) return null
    return response.json()
}

export const todoService = {
    getTasks: ({ page }, { signal }) => {
        return request(`?page=${page}&limit=4`, { signal })
    },
    createTodo: (text) => {
        return request('', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, done: false }),
        })
    },
    deleteTodo: (id) => {
        return request(`/${id}`, { method: 'DELETE' })
    },
    toggleTodo: ({ id, done }) => {
        return request(`/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ done: !done }),
        })
    },
}
