import { TodoItem } from './todo-item.jsx'

export const TodoList = ({ todos, disabled, removeTodo, changeTodo }) => {
    return (
        <ul className='todo'>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    disabled={disabled}
                    removeTodo={removeTodo}
                    changeTodo={changeTodo}
                />
            ))}
        </ul>
    )
}
