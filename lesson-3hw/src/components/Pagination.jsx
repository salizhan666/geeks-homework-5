import { Flex } from 'antd'

export const Pagination = ({ page, setPage, total, isPlaceholderData, label = 'Страницы товаров' }) => {
    const totalPages = Math.max(1, Math.ceil(total / 10))
    const canPrev = page > 1 && !isPlaceholderData
    const canNext = page < totalPages && !isPlaceholderData

    const prevPage = () => {
        if (canPrev) setPage(page - 1)
    }

    const nextPage = () => {
        if (canNext) setPage(page + 1)
    }

    return (
        <Flex component="nav" gap={10} align="center" wrap="wrap" aria-label={label}>
            <button type="button" disabled={!canPrev} onClick={prevPage}>Назад</button>
            <span>Страница {page} из {totalPages}</span>
            <button type="button" disabled={!canNext} onClick={nextPage}>Вперёд</button>
        </Flex>
    )
}
