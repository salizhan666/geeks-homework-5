import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import { useTodoList } from './model/use-todo-list.js'
import { TodoForm } from './components/todo-form.jsx'
import { TodoList } from './components/todo-list.jsx'
import { TodoPagination } from './components/todo-pagination.jsx'

export const Main = () => {
    const todo = useTodoList()

    return (
        <>
            <h1>TodoList</h1>
            <TodoForm
                text={todo.text}
                onChange={todo.changeText}
                onSubmit={todo.addTodo}
                isPending={todo.isCreating}
                disabled={todo.disabled}
            />
            {todo.error && <p role='alert'>{todo.error}</p>}
            {todo.isLoading && <p>Загрузка...</p>}
            {!todo.isLoading && !todo.error && todo.todos.length === 0 && <p>Задач пока нет</p>}
            {todo.isDeleting && <p role='status'>Удаление...</p>}
            {todo.isToggling && <p role='status'>Сохранение...</p>}
            <TodoList
                todos={todo.todos}
                disabled={todo.disabled}
                removeTodo={todo.removeTodo}
                changeTodo={todo.changeTodo}
            />
            <TodoPagination
                page={todo.page}
                totalPages={todo.totalPages}
                disabled={todo.disabled}
                onPrev={todo.prevPage}
                onNext={todo.nextPage}
            />
        </>
    )
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <Main />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)
