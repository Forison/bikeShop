import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import NavBar from './productDetails/NavBar'
import MainScreen from '../presentational/MainScreen'
import ProductCard from '../presentational/ProductCard'
import { Product } from '../utils/interface/shop'
import Loading from '../presentational/Loading'
import AlertBanner from '../presentational/AlertBanner'
import { fetchProducts } from '../services/fetchProducts'

const Home: React.FC = () => {
  const { data: products, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
  })

  if (isLoading) return <Loading />
  if (products?.length === 0) return <AlertBanner variant='info' message='There are no products available' />
  if (isError) return <AlertBanner variant='danger' message={error?.message} />

  return (
    <>
      <NavBar />
      <Container fluid className='shop-container d-flex '>
        <Row>
          {products && <MainScreen product={products[0]} />}
        </Row>
      </Container>
      <Container className='shop-container d-flex justify-content-center align-items-center'>
        <Row className='w-100'>
          {products?.slice(1).map((product, index) => (
            <Col lg={3} key={index} className='mt-2'>
              <ProductCard
                id={product.id ?? 0}
                name={product.name}
                category={product.category}
                description={product.description}
                price={product.base_price ?? 0}
                quantity={product.quantity}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default Home
