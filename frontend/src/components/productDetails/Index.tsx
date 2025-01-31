
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ImageGallery from './ImageGallery'
import ProductCustomization from './ProductCustomization'
import NavBar from './NavBar'

import './Index.scss'

const Index: React.FC = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Row className='justify-content-center'>
          <Col md={6}>
            {/* <ImageGallery /> */}
          </Col>
          <Col md={6}>
            <ProductCustomization />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Index