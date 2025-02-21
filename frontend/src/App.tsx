
import React, { lazy, Suspense, useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Loading from './presentational/Loading'
import { AuthContext } from './components/authentication/AuthContext'

const Home = lazy(() => import('./components/Home'))
const ProductDetail = lazy(() => import('./components/productDetails/Index'))
const Cart = lazy(() => import('./components/cart/Index'))
const CreateCategory = lazy(() => import('./components/category/Index'))
const Product = lazy(() => import('./components/addProduct/Index'))
const Products = lazy(() => import('./components/products/Index'))
const Login = lazy(() => import('./components/authentication/Login'))
const Register = lazy(() => import('./components/authentication/Register'))

const App: React.FC = () => {
  const authContext = useContext(AuthContext)
  const user = authContext?.user

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path='/login'
            element={!!user ? <Navigate to='/' replace /> : <Login />}
          />
          <Route
            path='/register'
            element={!!user ? <Navigate to='/' replace /> : <Register />}
          />
          <Route
            path='/detail/:id'
            element={<ProductDetail />}
          />
          <Route
            path='/carts'
            element={<Cart />}
          />
          <Route
            path='/Product'
            element={<Product />}
          />
          <Route
            path='/Products'
            element={<Products />}
          />
          <Route
            path='/category'
            element={<CreateCategory />}
          />
          <Route
            path='/'
            element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App