
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Loading from './presentational/Loading'

const Home = lazy(() => import('./components/Home'))
const ProductDetail = lazy(() => import('./components/productDetails/Index'))
const Cart = lazy(() => import('./components/cart/Index'))
const Order = lazy(() => import('./components/order/Index'))
const Product = lazy(() => import('./components/addProduct/Index'))
const Login = lazy(() => import('./components/authentication/Login'))
const Register = lazy(() => import('./components/authentication/Register'))

const App: React.FC = () => {

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path='/login'
            // element={isLogin ? <Navigate to='/' replace /> : <Login />}
            element={<Login />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route path='/detail/:id' element={<ProductDetail />} />
          <Route path='/carts' element={<Cart />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/Product' element={<Product />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App