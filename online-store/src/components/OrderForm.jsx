import { useForm } from 'react-hook-form'

export const OrderForm = ({ onSubmit, total, disabled, isPending }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { deliveryAddress: '', comment: '' },
    mode: 'onChange'
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ml-auto grid max-w-md gap-4 px-4 py-5">
      <label className="grid gap-1 text-sm font-medium">
        Delivery address
        <input
          {...register('deliveryAddress', {
            setValueAs: value => value.trim(),
            required: 'Enter your delivery address.'
          })}
          className="rounded-xl border border-slate-300 px-3 py-2"
        />
      </label>
      {errors.deliveryAddress && <p id="address-error" role="alert" className="text-red-700">{errors.deliveryAddress.message}</p>}

      <label className="grid gap-1 text-sm font-medium">
        Comment (optional)
        <textarea {...register('comment')} rows={2} className="rounded-xl border border-slate-300 px-3 py-2" />
      </label>

      <p className="text-right text-xl font-bold">
        Total: {total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </p>
      <button type="submit" disabled={disabled || isPending}
        className="min-h-11 rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800 disabled:opacity-50">
        {isPending ? 'Creating order…' : 'Create order'}
      </button>
    </form>
  )
}
