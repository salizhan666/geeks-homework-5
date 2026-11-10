import { Flex } from 'antd'
import { useProducts } from '../model/useProducts'
import { usePagination } from '../model/usePagination'
import { ProductCard } from './ProductCard'
import { Pagination } from './Pagination'

export const ProductsList = () => {
    const { page, setPage } = usePagination()
    const { data, isPending, isFetching, isError, isPlaceholderData, refetch } = useProducts(page)
    const products = data?.products ?? []
    const total = data?.total ?? 0

    return (
        <section>
            <h2>Все товары</h2>
            <p role="status">
                {isFetching ? 'Загрузка товаров…' : `Всего товаров: ${total}`}
            </p>
            {isPending && <progress aria-label="Загрузка товаров" />}
            {isError && (
                <div role="alert">
                    <p>Не удалось загрузить товары. Попробуйте ещё раз.</p>
                    <button type="button" onClick={() => refetch()} disabled={isFetching}>Повторить</button>
                </div>
            )}
            {products.length > 0 && (
                <>
                    <Pagination page={page} setPage={setPage} total={total} isPlaceholderData={isPlaceholderData} />
                    <Flex wrap="wrap" justify="center" gap={20}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </Flex>
                </>
            )}
            {!isPending && !isError && products.length === 0 && <p>Товары не найдены.</p>}
        </section>
    )
}
