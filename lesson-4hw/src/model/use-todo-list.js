import { useState } from 'react'
import { useTodos } from './use-todos.js'
import { useCreateTodo } from './use-create-todo.js'
import { useDeleteTodo } from './use-delete-todo.js'
import { useToggleTodo } from './use-toggle-todo.js'

export const useTodoList = () => {
    const [page, setPage] = useState(1)
    const [text, setText] = useState('')
    const query = useTodos(page)
    const createTodo = useCreateTodo()
    const deleteTodo = useDeleteTodo()
    const toggleTodo = useToggleTodo()

    const todos = query.data?.items || []
    const totalPages = query.data?.meta?.total_pages || 1
    const isBusy = createTodo.isPending || deleteTodo.isPending || toggleTodo.isPending
    const disabled = isBusy || query.isPending || query.isPlaceholderData
    const error = createTodo.error || deleteTodo.error || toggleTodo.error || query.error

    const changeText = (event) => setText(event.target.value)

    const addTodo = (event) => {
        event.preventDefault()
        if (!text.trim() || disabled) return
        createTodo.mutate(text.trim(), {
            onSuccess: () => setText(''),
        })
    }

    const removeTodo = (id) => {
        if (disabled) return
        deleteTodo.mutate(id, {
            onSuccess: () => {
                if (todos.length === 1 && page > 1) setPage(page - 1)
            },
        })
    }

    const changeTodo = (todo) => {
        if (!disabled) toggleTodo.mutate(todo)
    }

    const prevPage = () => setPage(page - 1)
    const nextPage = () => setPage(page + 1)

    return {
        todos, text, page, totalPages, disabled,
        error: error?.message,
        isLoading: query.isPending,
        isCreating: createTodo.isPending,
        isDeleting: deleteTodo.isPending,
        isToggling: toggleTodo.isPending,
        changeText, addTodo, removeTodo, changeTodo, prevPage, nextPage,
    }
}
