import { Flex } from 'antd'

export const ProductCard = ({ product }) => {
    const { title, description, price, category } = product

    return (
        <article style={{
            width: '100%',
            maxWidth: 500,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowWrap: 'anywhere',
        }}>
            <h2>{title}</h2>
            <p>{description}</p>
            <Flex gap={10} vertical>
                <span>{category}</span>
                <span>{price} $</span>
            </Flex>
        </article>
    )
}
