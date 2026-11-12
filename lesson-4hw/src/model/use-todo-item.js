export const useTodoItem = (todo, removeTodo, changeTodo) => {
    const onDelete = () => removeTodo(todo.id)
    const onToggle = () => changeTodo(todo)

    return { onDelete, onToggle }
}
