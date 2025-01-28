import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CartItem from '../../presentational/Item'
import CheckoutSection from './CheckoutSection'
import NavBar from '../productDetails/NavBar'

const Index: React.FC = () => {
  const [quantity, setQuantity] = useState(1)

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1)
    }
  }

  const handleDelete = () => {
    alert('Item removed from the cart!')
  }

  return (
    <>
      <NavBar />
      <Container className='my-5'>
        <Row>
          <Col md={8}>
            <h2 className='mb-4'>Cart</h2>
            <CartItem
              imageUrl='https://ahoybikes.com/wp-content/uploads/2022/12/HYBRID-BIKE-1-500x330.jpg.webp'
              title='Relaxed Fit T-shirt'
              price={12.99}
              stockStatus='In Stock'
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onDelete={handleDelete}
            />
          </Col>
          <Col md={4}>
            <h2 className='mb-4'>Checkout</h2>
            <CheckoutSection />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Index
