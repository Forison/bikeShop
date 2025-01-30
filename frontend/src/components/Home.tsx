import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavBar from './productDetails/NavBar'
import MoterraNeoComponent from '../presentational/MoterraNeoComponent'
import ProductCard from '../presentational/ProductCard'
import { getCookie } from '../utils/helper/tokenHandler'
import { Product } from '../utils/interface/shop'

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie()}`
      }
    })
      .then(response => response.json())
      .then(data => { setProducts(data) })
      .catch((error) => { console.log(error) })
  }, [])

  return (
    <>
      <NavBar />
      <Container fluid className='moterra-container d-flex '>
        <Row>
          <MoterraNeoComponent />
        </Row>
      </Container>
      <Container className='moterra-container d-flex '>
        <Row>
          {products?.map((product, index) => (
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