import React from 'react'
import { Badge } from 'react-bootstrap'

const OUT_OF_STOCK = 0

interface Prop {
  quantity: number
}

const StockStatus: React.FC<Prop> = ({ quantity }) => {
  return (
    <Badge bg={quantity !== OUT_OF_STOCK ? 'success' : 'danger'}>
      {quantity !== OUT_OF_STOCK ? `In stock: ${quantity}` : 'Temporarily out of stock'}
    </Badge>
  )
}

export default StockStatus
