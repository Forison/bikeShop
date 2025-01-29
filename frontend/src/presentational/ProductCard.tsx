import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import './ProductCard.scss'

interface Props {
  name: string
  category: string
  description: string
  price: string
  id: number
}

const ProductCard: React.FC<Props> = ({ id, name, category, description, price }) => {
  const navigate = useNavigate()
  console.log(id)
  return (
    <Card className='product-card'>
      <div className='image-container'>
        <Card.Img
          variant='top'
          src={'https://d2f9uwgpmber13.cloudfront.net/public/uploads/mobile/16593b79e64a81b71718111730285.png'}
          alt='product_img'
        />
      </div>
      <Card.Body>
        <Card.Title className='product-title'>{name}</Card.Title>
        <Card.Text className='product-description'>
          {description}
        </Card.Text>
        <Card.Text className='product-description'>
          {category}
        </Card.Text>
        <div className='product-price'>€{price}</div>
        <Button variant='success' className='add-to-cart-btn' onClick={() => navigate(`/detail/${id}`)}>
          View detail
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard