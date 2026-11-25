import { useQuery } from '@tanstack/react-query'
import { orderService } from '../service/order-service'
import { Loading } from '../components/Loading'
import { SolutionOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useCancelOrder } from '../store/order/cancel-order'

export const OrdersPage = () => {

  const cancelOrder = useCancelOrder()
  const { data: orders, isLoading, isError } = useQuery({
    ...orderService.getQueryOptions()
  })
  
  console.log(orders);
  
  if (isLoading) return <Loading isLoading />
  if (isError) return <p role="alert" className="py-12 text-center">Could not load your orders.</p>

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">My orders</h1>

      {orders.length === 0 && (
        <div className="slideUp mx-auto my-12 flex w-full max-w-lg flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-teal-50 text-4xl text-teal-700">
            <SolutionOutlined aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">No orders yet</h2>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
            Once you place an order, you’ll find it here.
          </p>
          <Link
            to="/"
            className="mt-8 flex min-h-11 w-full items-center justify-center rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 sm:w-auto"
          >
            Browse products
          </Link>
        </div>
      )}

      <div className="grid gap-4">
        {orders.map(order => (
          <article key={order._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="break-all font-semibold">Order #{order._id}</h2>
                <time dateTime={order.createdAt} className="text-sm text-slate-500">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </time>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm capitalize">
                {order.status}
              </span>
            </header>

            <ul className="my-4 divide-y divide-slate-100 border-y border-slate-200">
              {order.items.map((item, index) => (
                <li key={item._id ?? item.product?._id ?? index} className="flex items-center justify-between gap-4 py-3">
                  <span>{item.product?.name ?? 'Unavailable product'}</span>
                  <span className="shrink-0 text-sm tabular-nums text-slate-600">
                    {item.quantity} × {item.price}$
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-end gap-4">
              {order.status === 'pending' && (
                <button
                  type="button"
                  disabled={cancelOrder.isPending}
                  onClick={() => cancelOrder.mutate(order._id)}
                  className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                >
                  {cancelOrder.isPending
                    ? 'Cancelling…'
                    : 'Cancel order'}
                </button>
              )}
              <p className="font-bold">Total: {order.totalPrice}$</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
