import { ConfigProvider, Spin } from "antd"

export const Loading = ({ isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex min-h-64 w-full items-center justify-center">
                <ConfigProvider theme={{ token: { colorPrimary: 'var(--color-teal-500)' } }}>
                    <Spin size="large" />
                </ConfigProvider>
            </div>
        )
    }
}
