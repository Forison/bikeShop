import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'

interface Props {
  imageUrl: string
  title: string
  price: number
  description?: string
  stockStatus: string
  quantity?: number
  onIncrease?: () => void
  onDecrease?: () => void
  onDelete: () => void
}

const Item: React.FC<Props> = ({
  imageUrl,
  title,
  price,
  stockStatus,
  quantity,
  onIncrease,
  onDecrease,
  onDelete,
}) => (
  <Card className="mb-3">
    <Row className="g-0">
      <Col md={5} className="d-flex align-items-center">
        <img src={imageUrl} alt={title} className="img-fluid rounded-start" />
      </Col>
      <Col md={7}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className="text-muted">${price.toFixed(2)}</Card.Text>
          <Card.Text className="text-success">{stockStatus}</Card.Text>

          {/* Conditional rendering for quantity and increase/decrease buttons */}
          {quantity !== undefined && (
            <Row className="align-items-center">
              <Col xs={4} className="d-flex align-items-center">
                {onDecrease && (
                  <Button variant="outline-secondary" size="sm" onClick={onDecrease}>
                    <i className="fa fa-minus" />
                  </Button>
                )}
                <h6 className="mx-3">{quantity}</h6>
                {onIncrease && (
                  <Button variant="outline-secondary" size="sm" onClick={onIncrease}>
                    <i className="fa fa-plus" />
                  </Button>
                )}
              </Col>
            </Row>
          )}

          {/* Conditional rendering for delete button */}
          {onDelete && (
            <div className="d-flex justify-content-end mt-2">
              <Button variant="link" className="text-danger" onClick={onDelete}>
                <i className="fa fa-trash" />
              </Button>
            </div>
          )}
        </Card.Body>
      </Col>
    </Row>
  </Card>
)

export default Item
