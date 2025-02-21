import React from 'react'
import { Row, Col, Button, Carousel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './MainScreen.scss'
import { Product } from '../utils/interface/shop'
import ProductCarousel from './ProductCarousel'
import CategoryMenu from './CategoryMenu'

interface Prop {
  product: Product
}

const MainScreen: React.FC<Prop> = ({ product }) => {
  const navigate = useNavigate()
  return (
    <Row className='align-items-center'>
      <Col lg={3}>
        <CategoryMenu />
      </Col>

      <Col lg={6}>
        <ProductCarousel />
      </Col>
      <Col lg={3} className='text-center text-lg-start'>
        <p className='text-muted mb-1 moterra-subheading'>
          When The Only Boundary Left Is Gravity
        </p>
        <h1 className='moterra-title'>{product.name}</h1>
        <Button variant='warning' size='lg' className='moterra-button shadow' onClick={() => navigate(`/detail/${product.id}`)}>
          Shop Now
        </Button>
      </Col>
    </Row>
  )
}

export default MainScreen
