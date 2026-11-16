import { useQuery } from "@tanstack/react-query"
import { productService } from "../service/product-service"
import { ProductCard } from "../components/ProductCard"
import { useFilterStore } from "../store/use-filter-store"
import { ConfigProvider, Spin } from "antd"
import { SearchFilter } from "../components/filter/SearchFilter"
import { CategoryFilter } from "../components/filter/CategoryFilter"
import { PriceFilter } from "../components/filter/PriceFilter"

export const HomePage = () => {

  const filterStore = useFilterStore((state) => state.filter)

  const { data, isLoading, isError } = useQuery({
    ...productService.getProductsQueryOptions(filterStore)
  })

  return (
    <>
      <div className="filters flex flex-col gap-4">
        <SearchFilter isLoading={isLoading} />
        <CategoryFilter />
        <PriceFilter />
      </div>

      {isLoading && (
        <div className="flex min-h-64 w-full items-center justify-center">
          <ConfigProvider theme={{ token: { colorPrimary: 'var(--color-teal-500)' } }}>
            <Spin size="large" />
          </ConfigProvider>
        </div>
      )}

      {
        data?.data?.length === 0 ? (
          <h2 className="py-12 text-center text-xl font-semibold text-gray-500">
            Goods not found
          </h2>
        ) :
          (
            <div className='slideUp mt-4 grid grid-cols-4 gap-4'>
              {
                data?.data?.map((product) =>
                  <ProductCard key={product._id} product={product} />
                )
              }
            </div >
          )
      }

    </>
  )
}
