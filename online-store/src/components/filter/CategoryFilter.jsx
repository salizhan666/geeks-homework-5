import { useFilterStore } from "../../hooks/useFilter"
import { useQuery } from "@tanstack/react-query"
import { categoryService } from "../../service/category-service"

export const CategoryFilter = () => {

    const { data } = useQuery({
        ...categoryService.getCategoryQueryOptions()
    })

    const setCategory = useFilterStore((state) => state.setCategory)
    const selectedCategory = useFilterStore((state) => state.filter.category)

    return (
        <div className="сategory flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Category</h2>
            <select
                className="border border-gray-300 rounded p-2 w-50"
                value={selectedCategory ?? ''}
                onChange={(e) => setCategory(e.target.value || null)}
            >
                <option value="">Все категории</option>
                {
                    data?.map((category) => {
                        return (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}
