export const TodoPagination = ({ page, totalPages, disabled, onPrev, onNext }) => {
    return (
        <div className='todo__pagination'>
            <button disabled={disabled || page === 1} onClick={onPrev}>prev</button>
            <button disabled={disabled || page >= totalPages} onClick={onNext}>next</button>
        </div>
    )
}
