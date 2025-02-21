import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import NavBar from '../productDetails/NavBar'
import ProductCard from '../../presentational/ProductCard'
import { Product } from '../../utils/interface/shop'
import Loading from '../../presentational/Loading'
import AlertBanner from '../../presentational/AlertBanner'
import { fetchProducts } from '../../services/fetchProducts'
import Footer from '../../presentational/Footer'

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
      <Container className='shop-container main-content'>
        <Row className='w-100'>
          {products?.slice(1).map((product, index) => (
            <Col lg={2} md={4} sm={6} xs={12} key={index} className='mt-2'>
              <ProductCard
                id={product.id}
                name={product.name}
                category_id={product.category_id}
                // description={product.description}
                price={product.base_price ?? 0}
                quantity={product.quantity}
                className='shadow-on-hover'
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default Home
