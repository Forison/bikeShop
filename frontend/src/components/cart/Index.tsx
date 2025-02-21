import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CartItem from '../../presentational/Item'
import CheckoutSection from '../../presentational/CheckoutSection'
import NavBar from '../productDetails/NavBar'
import Loading from '../../presentational/Loading'
import AlertBanner from '../../presentational/AlertBanner'
import { useQuery } from '@tanstack/react-query'
import { fetchCartItems } from '../../services/fetCartItems'
import Footer from '../../presentational/Footer'

const Index: React.FC = () => {
  const { data: products, error, isLoading } = useQuery({
    queryKey: ['cartItems'],
    queryFn: () => fetchCartItems()
  })

  if (error instanceof Error) return <AlertBanner variant='danger' message={error.message} />

  return (
    <>
      <NavBar />
      <Container className='my-5'>
        <Row>
          <Col md={8}>
            <h2 className='mb-4'>Cart</h2>
            {isLoading ? (
              <Loading />
            ) : products?.length === 0 ? (
              <AlertBanner variant='info' message='Your cart is currently empty' />
            ) : (
              products?.map((product, index) => (
                <React.Fragment key={index}>
                  <CartItem
                    imageUrl='https://ahoybikes.com/wp-content/uploads/2022/12/HYBRID-BIKE-1-500x330.jpg.webp'
                    title={product.cart_item.name}
                    price={product.cart_item.base_price}
                    quantity={product.cart_item.quantity}
                    description={product.cart_item.description}
                    cart_item_id={product.cart_item_id}
                    showStockStatus={false}
                    price_rule={product.cart_item.price_rule}
                    customization_options={product.cart_item.customization_options}
                  />
                </React.Fragment>
              ))
            )}
          </Col>
          <Col md={4}>
            {products && products.length > 0 && (
              <CheckoutSection total={products[0]?.cart_item_price_summation} />
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default Index
