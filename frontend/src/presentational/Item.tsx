import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import StockStatus from './StockStatus'

interface Props {
  imageUrl: string
  title: string
  price: number
  description?: string
  quantity: number
  onDelete: () => void
}

const Item: React.FC<Props> = ({
  imageUrl,
  title,
  price,
  quantity,
  description,
  onDelete,
}) => {
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
            {onDelete && (
              <div className='d-flex justify-content-end mt-2'>
                <Button variant='link' className='text-danger' onClick={onDelete}>
                  <i className='fa fa-trash' />
                </Button>
              </div>
            )}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default Item
