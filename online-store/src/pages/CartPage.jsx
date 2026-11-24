import { useQuery } from '@tanstack/react-query'
import { cartService } from '../service/cart-service'
import { CartProductCard } from '../components/CartProductCard'
import { Loading } from '../components/Loading'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useClearCart } from '../store/cart/clear-cart'

export const CartPage = () => {

  const clearCart = useClearCart()
  const { data, isLoading } = useQuery({
    ...cartService.getCartQueryParams()
  })

  if (isLoading) return <Loading isLoading />

  if (data.length === 0) {
    return (
      <section className="slideUp mx-auto my-12 flex w-full max-w-lg flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-teal-50 text-4xl text-teal-700">
          <ShoppingCartOutlined aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Your cart is empty</h1>
        <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">Browse the catalog to find something you like.</p>
        <Link to="/" className="mt-8 flex min-h-11 w-full items-center justify-center rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800 sm:w-auto">
          Browse products
        </Link>
      </section>
    )
  }

  const total = data.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)

  return (
    <>
      <section>
        <div className="flex justify-end px-4 py-3">
          <button type="button" disabled={clearCart.isPending} onClick={() => clearCart.mutate()}
            className="rounded-xl bg-slate-100 px-4 py-2 hover:bg-slate-200 disabled:opacity-50">
            Delete All Cart
          </button>
        </div>
        {clearCart.isError && <p role="alert">Не удалось очистить корзину. Попробуйте ещё раз.</p>}
        {data.map(({ product, quantity }) => (
          <CartProductCard key={product._id} product={product} quantity={quantity} />
        ))}
        <p className="px-4 py-5 text-right text-xl font-bold">Итого: {total.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} $</p>
      </section>
    </>
  )
}
