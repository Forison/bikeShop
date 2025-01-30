import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CartItem from '../../presentational/Item'
import NavBar from '../productDetails/NavBar'

const Index: React.FC = () => {
  const [quantity, setQuantity] = useState(1)

  const handleDelete = () => {
    alert('Item removed from the cart!')
  }

  return (
    <>
      <NavBar />
      <Container className='my-5'>
        <Row className='justify-content-center align-items-center'>
          <Col md={9} className='d-flex flex-column align-items-center'>
            <h2 className='mb-4'>Order</h2>
            <CartItem
              imageUrl='https://ahoybikes.com/wp-content/uploads/2022/12/HYBRID-BIKE-1-500x330.jpg.webp'
              title='Relaxed Fit T-shirt'
              price={12.99}
              quantity={quantity}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Index
