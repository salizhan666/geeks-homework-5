import { useTodoItem } from '../model/use-todo-item.js'

export const TodoItem = ({ todo, disabled, removeTodo, changeTodo }) => {
    const { onDelete, onToggle } = useTodoItem(todo, removeTodo, changeTodo)

    return (
        <li className='todo__item'>
            <button
                type='button'
                className='todo__checkbox'
                onClick={onToggle}
            >
                {todo.done && '❌'}
            </button>
            <span className={todo.done ? 'todo__done' : ''}>{todo.text}</span>
            <button type='button' disabled={disabled} onClick={onDelete}>
                Удалить
            </button>
        </li>
    )
}
