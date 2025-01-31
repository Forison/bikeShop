import React from 'react'
import { Col, Spinner } from 'react-bootstrap'

const Loading: React.FC = () => {
  return (
    <Col className="text-center">
      <Spinner animation="border" variant="primary" />
      <p>Loading...</p>
    </Col>
  );
}

export default Loading
