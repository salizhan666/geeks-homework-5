import { useFilterStore } from '../../store/use-filter-store'

export const PriceFilter = () => {

    const setMinPrice = useFilterStore((state) => state.setMinPrice)
    const setMaxPrice = useFilterStore((state) => state.setMaxPrice)
    const minPrice = useFilterStore((state) => state.filter.minPrice)
    const maxPrice = useFilterStore((state) => state.filter.maxPrice)

    return (
        <div className="price сategory flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Sort By price</h2>
            <form className="flex gap-3">
                <label className="flex items-center gap-2 bg-gray-100 p-3">
                    <span>From</span>
                    <input
                        className="w-28 min-w-0 bg-transparent outline-none"
                        type="number"
                        name="minPrice"
                        value={minPrice || ''}
                        placeholder="1"
                        onChange={(e) => {
                            setMinPrice(e.target.value || 0)
                        }}
                    />
                </label>
                <label className="flex items-center gap-2 bg-gray-100 p-3">
                    <span>To</span>
                    <input
                        className="w-28 min-w-0 bg-transparent outline-none"
                        type="number"
                        value={maxPrice}
                        name="maxPrice"
                        placeholder="1 000 000"
                        onChange={(e) => {
                            setMaxPrice(e.target.value)
                        }}
                    />
                </label>
            </form>
        </div>
    )
}
