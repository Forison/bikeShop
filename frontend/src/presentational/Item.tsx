import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import StockStatus from './StockStatus'
import { getCookie } from '../utils/helper/tokenHandler'

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
  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/cart_items/${cart_item_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie()}`,
      }
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload()
      })
      .catch((error) => { console.error('Error:', error) })
  }

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
              <Button variant='link' className='text-danger' onClick={handleDelete}>
                <i className='fa fa-trash' />
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default Item
