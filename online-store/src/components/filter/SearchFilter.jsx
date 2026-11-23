import { useFilterStore } from "../../hooks/useFilter"
import { ConfigProvider, Input } from "antd"

const { Search } = Input

export const SearchFilter = ({ isLoading }) => {

    const searchQuery = useFilterStore((state) => state.searchQuery)
    const setSearchQuery = useFilterStore((state) => state.setSearchQuery)

    return (
        <div className="mx-auto w-full max-w-xl py-4">
            <ConfigProvider theme={{
                token: {
                    colorPrimary: '#0f766e',
                    colorPrimaryHover: '#115e59',
                    colorPrimaryActive: '#134e4a',
                    borderRadius: 12,
                    controlHeightLG: 48,
                    colorBorder: '#cbd5e1',
                },
            }}>
                <Search
                    className="search"
                    placeholder="Goods search"
                    size="large"
                    enterButton="Search"
                    style={{ width: '100%' }}
                    value={searchQuery}
                    onSearch={(value) => setSearchQuery(value)}
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                    loading={isLoading ? true : false}
                />
            </ConfigProvider>
        </div>
    )
}
