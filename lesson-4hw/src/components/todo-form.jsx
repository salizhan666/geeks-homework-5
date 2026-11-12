export const TodoForm = ({ text, onChange, onSubmit, isPending, disabled }) => {
    return (
        <form onSubmit={onSubmit}>
            <input
                aria-label='Новая задача'
                placeholder='Новая задача'
                value={text}
                onChange={onChange}
                disabled={isPending}
            />
            <button disabled={disabled}>
                {isPending ? 'Создание...' : 'Добавить'}
            </button>
        </form>
    )
}
