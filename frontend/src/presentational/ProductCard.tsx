import React, { useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import './ProductCard.scss'
import { OUT_OF_STOCK } from '../utils/helper/magicDefinitions'
import StockStatus from './StockStatus'
import { AuthContext } from '../components/authentication/AuthContext'
import DeleteButton from './DeleteButton'

interface Props {
  quantity: number
  name: string
  category: string
  description: string
  price: number
  id: number
}

const ProductCard: React.FC<Props> = ({ id, name, category, description, price, quantity }) => {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const user = authContext?.user
  const deleteUrl = `${process.env.REACT_APP_BACK_END_API_URL}/api/v1/products/${id}`
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
        <div className='d-flex justify-content-between align-items-center'>
          <StockStatus quantity={quantity} />
          {user?.admin && <DeleteButton deleteUrl={deleteUrl} />}
        </div>
        {(quantity !== OUT_OF_STOCK && user?.name) &&
          <Button variant='secondary' className='add-to-cart-btn mt-2' onClick={() => navigate(`/detail/${id}`)}>
            View detail
          </Button>
        }
      </Card.Body>
    </Card>
  )
}

export default ProductCard