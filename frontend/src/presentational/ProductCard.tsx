import React, { useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { OUT_OF_STOCK } from '../utils/helper/magicDefinitions'
import StockStatus from './StockStatus'
import { AuthContext } from '../components/authentication/AuthContext'
import DeleteButton from './DeleteButton'

import './ProductCard.scss'

interface Props {
  quantity: number
  name: string
  category_id: number
  description?: string
  price: number
  id: string
  className?: string
}

const ProductCard: React.FC<Props> = ({ id, name, className, description, price, quantity }) => {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const user = authContext?.user
  const deleteUrl = `${process.env.REACT_APP_BACK_END_API_URL}/api/v1/products/${id}`
  const handleRedirect = () => {
    console.log('heloo worl', !!user)
    if (!user) return
    console.log('heloo worl')
    navigate(`/detail/${id}`)

  }

  return (
    <Card className={`product-card ${className}`} onClick={handleRedirect}>
      <div className='image-container'>
        <Card.Img
          variant='top'
          src={'https://d2f9uwgpmber13.cloudfront.net/public/uploads/mobile/16593b79e64a81b71718111730285.png'}
          alt='product_img'
        />
      </div>
      <Card.Body>
        <Card.Title className='product-title fs-6 muted'>{name}</Card.Title>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='product-price small-text'>€{price}</div>
          <StockStatus quantity={quantity} />
          {user?.admin && <DeleteButton deleteUrl={deleteUrl} />}
        </div>

      </Card.Body>
    </Card>
  )
}

export default ProductCard