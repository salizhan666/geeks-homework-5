import { useState } from 'react'
import { Flex } from 'antd'
import { useProductsSearch } from '../model/useProductsSearch'
import { usePagination } from '../model/usePagination'
import { ProductCard } from './ProductCard'
import { Pagination } from './Pagination'

export const ProductsSearch = () => {
    const [search, setSearch] = useState('')
    const { page, setPage, resetPage } = usePagination()
    const { data, isPending, isFetching, isError, isPlaceholderData, refetch } = useProductsSearch(search, page)
    const products = data?.products ?? []
    const total = data?.total ?? 0
    const isSearching = search.trim().length >= 3
    const isTooShort = search.trim().length > 0 && !isSearching

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        resetPage()
    }

    return (
        <section>
            <h2>Поиск товаров</h2>
            <label htmlFor="product-search">Поиск по названию</label>
            <input
                id="product-search"
                type="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Введите минимум 3 символа"
                aria-describedby="search-hint"
            />
            <small id="search-hint">Для поиска введите минимум 3 символа.</small>
            {isTooShort && <p role="status">Введите минимум 3 символа.</p>}
            {isSearching && (
                <>
                    <p role="status" style={{ minHeight: '1.5em' }}>
                        {isFetching ? 'Поиск товаров…' : `Найдено товаров: ${total}`}
                    </p>
                    {isPending && <progress aria-label="Поиск товаров" />}
                    {isError && (
                        <div role="alert">
                            <p>Не удалось выполнить поиск. Попробуйте ещё раз.</p>
                            <button type="button" onClick={() => refetch()} disabled={isFetching}>Повторить</button>
                        </div>
                    )}
                    {((!isPending && !isError) || products.length > 0) && (
                        <>
                            <Pagination
                                page={page}
                                setPage={setPage}
                                total={total}
                                isPlaceholderData={isPlaceholderData}
                                label="Страницы результатов поиска"
                            />
                            {products.length === 0 && <p>Товары не найдены.</p>}
                            <Flex wrap="wrap" justify="center" gap={20}>
                                {products.map((product) => <ProductCard key={product.id} product={product} />)}
                            </Flex>
                        </>
                    )}
                </>
            )}
        </section>
    )
}
