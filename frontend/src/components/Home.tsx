import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavBar from './productDetails/NavBar'
import MainScreen from '../presentational/MainScreen'
import ProductCard from '../presentational/ProductCard'
import { getCookie } from '../utils/helper/tokenHandler'
import { Product } from '../utils/interface/shop'
import Loading from '../presentational/Loading'

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie()}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <NavBar />
      <Container fluid className='shop-container d-flex '>
        <Row>
          <MainScreen />
        </Row>
      </Container>
      <Container
        className='shop-container d-flex justify-content-center align-items-center'
      >
        <Row className='w-100'>
          {loading ? (
            <Loading />
          ) : (
            products?.map((product, index) => (
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
            ))
          )}
        </Row>
      </Container>
    </>
  )
}

export default Home
