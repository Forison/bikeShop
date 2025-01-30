import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CartItem from '../../presentational/Item'
import CheckoutSection from './CheckoutSection'
import NavBar from '../productDetails/NavBar'
import { getCookie } from '../../utils/helper/tokenHandler'
import { Product } from '../../utils/interface/shop'

interface CartItem {
  cart_item: Product
  cart_item_price_summation: number
}

const Index: React.FC = () => {
  const [countQuantity, setCountQuantity] = useState(1)
  const [products, setProducts] = useState<CartItem[]>([])

  const handleDelete = () => {
  }


  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/carts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie()}`,
      }
    })
      .then((response) => response.json())
      .then((data) => { setProducts(data) })
      .catch((error) => { console.error('Error:', error) })
  }, [])

  return (
    <>
      <NavBar />
      <Container className='my-5'>
        <Row>
          <Col md={8}>
            <h2 className='mb-4'>Cart</h2>
            {products?.map((product, index) => (
              <React.Fragment key={index}>
                <CartItem
                  imageUrl='https://ahoybikes.com/wp-content/uploads/2022/12/HYBRID-BIKE-1-500x330.jpg.webp'
                  title={product.cart_item.name}
                  price={product.cart_item.base_price}
                  quantity={product.cart_item.quantity}
                  description={product.cart_item.description}
                  onDelete={handleDelete}
                />
              </React.Fragment>
            ))}
          </Col>
          <Col md={4}>
            <CheckoutSection total={products[0]?.cart_item_price_summation} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Index
