import { useQuery } from '@tanstack/react-query'
import { favoritesService } from '../service/favorites-service'
import { Loading } from '../components/Loading';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { HeartOutlined } from '@ant-design/icons';

export const FavoritesPage = () => {

  const { data, isLoading } = useQuery({
    ...favoritesService.getFavoritesQueryOptions(),
  })

  console.log('component log', data);


  return (
    <>
      <Loading isLoading={isLoading} />

      {
        data?.length === 0 ?
          (
            <div className="slideUp mx-auto my-12 flex w-full max-w-lg flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <HeartOutlined aria-hidden="true" style={{ fontSize: 36 }} />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Add goods to favorite</h2>
              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">Save the products you love and find them here anytime.</p>
              <Link className='mt-8 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 active:bg-teal-900 sm:w-auto' to={'/'}>Let's go to buy</Link>
            </div>
          )
          :
          (
            <div className='slideUp mt-4 grid grid-cols-4 gap-4'>
              {
                data?.map((product) =>
                  <ProductCard key={product._id} product={{ ...product, isFavorite: true }} />
                )
              }
            </div >
          )
      }
    </>
  )
}
