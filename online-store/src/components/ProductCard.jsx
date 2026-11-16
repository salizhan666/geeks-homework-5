import { ShoppingCartOutlined } from "@ant-design/icons"

export const ProductCard = ({ product }) => {
  return (
    <article className="group flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-slate-50 p-6">
        <img src={product?.image} alt={product?.name} className="h-full w-full object-contain transition-transform duration-300 motion-safe:group-hover:scale-105 motion-reduce:transition-none" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-6">
          <h2 className="mb-2 min-h-14 line-clamp-2 break-words text-xl font-semibold leading-7 tracking-tight text-slate-900">{product?.name}</h2>
          <p className="min-h-18 line-clamp-3 break-words text-sm leading-6 text-slate-500">{product?.description}</p>
        </div>
        <p className="mt-auto mb-4 text-xl font-bold leading-7 tabular-nums text-slate-900">{product?.price}$</p>
        <button type="button" className="flex items-center justify-center gap-2 min-h-11 w-full cursor-pointer rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 active:bg-teal-900">
          <ShoppingCartOutlined aria-hidden="true" />
          В корзину
        </button>
      </div>
    </article>
  )
}
