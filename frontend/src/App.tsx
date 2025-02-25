import React, { lazy, Suspense, useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Loading from './presentational/Loading'
import { AuthContext } from './components/authentication/AuthContext'
import NavBar from './components/productDetails/NavBar'

const Home = lazy(() => import('./components/Home'))
const ProductDetail = lazy(() => import('./components/productDetails/Index'))
const Cart = lazy(() => import('./components/cart/Index'))
const CreateCategory = lazy(() => import('./components/category/Index'))
const Product = lazy(() => import('./components/addProduct/Index'))
const Products = lazy(() => import('./components/products/Index'))
const Login = lazy(() => import('./components/authentication/Login'))
const Register = lazy(() => import('./components/authentication/Register'))

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  )
}

const App: React.FC = () => {
  const authContext = useContext(AuthContext)
  const user = authContext?.user

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />

          {/* Routes with Navbar (Wrapped in Layout) */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Layout>
                <ProductDetail />
              </Layout>
            }
          />
          <Route
            path="/carts"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />
          <Route
            path="/product"
            element={
              <Layout>
                <Product />
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>
                <Products />
              </Layout>
            }
          />
          <Route
            path="/category"
            element={
              <Layout>
                <CreateCategory />
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
