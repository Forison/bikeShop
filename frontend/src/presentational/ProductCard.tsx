import React from 'react'
import { Card, Button } from 'react-bootstrap'
import './ProductCard.scss'

interface Props {
  productImgUrl: string
  name: string
  category: string
  description: string
  price: string
}

const ProductCard: React.FC<Props> = ({ productImgUrl, name, category, description, price }) => {
  return (
    <Card className='product-card'>
      <div className='image-container'>
        <Card.Img
          variant='top'
          src={productImgUrl}
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
        <Button variant='success' className='add-to-cart-btn'>
          View detail
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard