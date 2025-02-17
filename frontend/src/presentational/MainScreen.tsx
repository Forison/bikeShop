import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './MainScreen.scss'
import { Product } from '../utils/interface/shop'

interface Prop {
  product: Product
}

const MainScreen: React.FC<Prop> = ({ product }) => {
  const navigate = useNavigate()
  return (
    <Row className='align-items-center'>
      <Col lg={4} className='text-center text-lg-start'>
        <p className='text-muted mb-1 moterra-subheading'>
          When The Only Boundary Left Is Gravity
        </p>
        <h1 className='moterra-title'>{product.name}</h1>
        <Button variant='warning' size='lg' className='moterra-button' onClick={() => navigate(`/detail/${product.id}`)}>
          Shop Now
        </Button>
      </Col>
      <Col lg={6} className='text-center'>
        <img
          src='https://ahoybikes.com/wp-content/uploads/2022/12/HYBRID-BIKE-1-500x330.jpg.webp'
          alt='Moterra Neo'
          className='moterra-image'
        />
      </Col>
      <Col lg={2} className='text-center'>
        <img
          src='https://ahoybikes.com/wp-content/uploads/2022/12/HYBRID-BIKE-1-500x330.jpg.webp'
          alt='Moterra Neo'
          className='moterra-image'
        />
        <p className='text-muted mt-3 mb-1 moterra-description'>
          {product.description}
        </p>
        <h2 className='moterra-price'>€{product.base_price}</h2>
      </Col>
    </Row>
  )
}

export default MainScreen
