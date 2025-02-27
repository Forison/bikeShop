import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCheckCircle,
  faShippingFast,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "./OrderDetails.scss";

const OrderDetails: React.FC = () => {
  return (
    <Container className="order-container">
      <Card className="order-card">
        <Card.Body>
          <Row>
            <Col md={8} className="order-info">
              <h5 className="order-number">Order #25436</h5>
              <p className="order-date">25 Sep, 2024 | 15:04</p>
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="product-card mt-3">
                  <Row>
                    <Col xs={3} className="product-image">
                      <FontAwesomeIcon icon={faBoxOpen} size="2x" />
                    </Col>
                    <Col xs={6} className="product-details">
                      <h6>T-shirt</h6>
                      <p>Black / V-neck</p>
                      <p>SKU: 21938059315</p>
                    </Col>
                    <Col xs={3} className="product-price">
                      <p>5630.98 TL</p>
                      <p>9 Adet</p>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Col>
            <Col md={4} className="order-status">
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderDetails;
