import { Routes, Route } from 'react-router'
import { ProductsList } from './components/ProductsList'
import { ProductsSearch } from './components/ProductsSearch'
import { NotFoundPage } from './Pages/NotFoundPage'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <main className="container">
          <h1>Товары</h1>
          <ProductsSearch />
          <ProductsList />
        </main>
      } />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
