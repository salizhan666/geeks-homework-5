import { DeleteOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons"
import { useRemoveProductFromCart } from "../store/cart/remove-product-from-cart"
import { useUpdateProductQuantity } from "../store/cart/update-product-quantity"
import { useToggleFavotire } from "../store/favorites/toggle-favorite"

export const CartProductCard = ({ product, quantity }) => {

  const favorite = useToggleFavotire(product._id)
  const removeProduct = useRemoveProductFromCart()
  const updateQuantity = useUpdateProductQuantity(product._id)
  const isCartPending = updateQuantity.isPending || removeProduct.isPending

  return (
    <article className="grid w-full grid-cols-[5rem_1fr] items-start gap-x-4 gap-y-3 border-b border-slate-200 bg-white px-4 py-6 text-slate-900 md:grid-cols-[7rem_minmax(0,1fr)_auto_auto] md:gap-x-8">
      <img src={product?.image} alt={product?.name} className="row-span-3 aspect-square w-full rounded-2xl bg-slate-50 object-contain md:row-span-1" />

      <div className="min-w-0">
        <h2 className="break-words text-lg font-medium">{product?.name}</h2>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            disabled={isCartPending}
            onClick={() => removeProduct.mutate(product._id)}
            className="flex size-11 items-center justify-center rounded-2xl bg-slate-100 text-xl hover:bg-slate-200 disabled:opacity-50"
          >
            <DeleteOutlined />
          </button>
          <button
            type="button"
            aria-label="Favorite"
            aria-pressed={favorite.isFavorite}
            disabled={favorite.isPending}
            onClick={favorite.toggle}
            className="flex size-11 items-center justify-center rounded-2xl bg-slate-100 text-xl hover:bg-slate-200 disabled:opacity-50"
          >
            {favorite.isFavorite ? <HeartFilled className="scaleUp text-red-500" /> : <HeartOutlined />}
          </button>
        </div>
      </div>

      <p className="col-start-2 text-xl font-semibold tabular-nums md:col-start-3 md:text-2xl">
        {product?.price} $
      </p>

      <div className="col-start-2 flex items-center gap-4 md:col-start-4">
        <button
          type="button"
          disabled={isCartPending || quantity <= 1}
          onClick={() => updateQuantity.mutate(Number(quantity) - 1)}
          className="size-11 rounded-2xl bg-slate-100 text-2xl text-teal-700 disabled:opacity-50"
        >−</button>
        <span className="font-semibold tabular-nums">{quantity}</span>
        <button
          type="button"
          disabled={isCartPending}
          onClick={() => updateQuantity.mutate(Number(quantity) + 1)}
          className="size-11 rounded-2xl bg-slate-100 text-2xl text-teal-700 disabled:opacity-50"
        >+</button>
      </div>
    </article>
  )
}
