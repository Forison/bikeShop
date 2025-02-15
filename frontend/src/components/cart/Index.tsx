import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CartItem from '../../presentational/Item'
import CheckoutSection from '../../presentational/CheckoutSection'
import NavBar from '../productDetails/NavBar'
import { getCookie } from '../../utils/helper/tokenHandler'
import { Product } from '../../utils/interface/shop'
import Loading from '../../presentational/Loading'
import AlertBanner from '../../presentational/AlertBanner'
import TooltipButton from '../../presentational/TooltipButton'

interface CartItemProp {
  cart_item: Product
  cart_item_id: number
  cart_item_price_summation: number
}

const Index: React.FC = () => {
  const [products, setProducts] = useState<CartItemProp[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/carts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie()}`,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <NavBar />
      <Container className='my-5'>
        <Row>
          <Col md={8}>
            <h2 className='mb-4'>Cart</h2>
            {loading ? (
              <Loading />
            ) : products.length === 0 ? (
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
            {products.length > 0 && (
              <CheckoutSection total={products[0]?.cart_item_price_summation} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Index
