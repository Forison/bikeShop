import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import StockStatus from './StockStatus'
import DeleteButton from './DeleteButton'

interface Props {
  cart_item_id: number
  imageUrl: string
  title: string
  price: number
  description?: string
  quantity: number
}

const Item: React.FC<Props> = ({
  cart_item_id,
  imageUrl,
  title,
  price,
  quantity,
  description,
}) => {
  const deleteUrl = `${process.env.REACT_APP_BACK_END_API_URL}/api/v1/cart_items/${cart_item_id}`
  return (
    <Card className='mb-3'>
      <Row className='g-0'>
        <Col md={5} className='d-flex align-items-center'>
          <img src={imageUrl} alt={title} className='img-fluid rounded-start' />
        </Col>
        <Col md={7}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text className='text-muted'>${price}</Card.Text>
            <Card.Text className='text-muted'>{description}</Card.Text>
            <StockStatus quantity={quantity} />
            <div className='d-flex justify-content-end mt-2'>
              <DeleteButton deleteUrl={deleteUrl} />
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default Item
