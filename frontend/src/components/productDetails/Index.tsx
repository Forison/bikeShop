
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ImageGallery from './ImageGallery'
import ProductCustomization from './ProductCustomization'
import NavBar from './NavBar'
import Footer from '../../presentational/Footer'


const Index: React.FC = () => {
  return (
    <>
      <Container>
        <Row className='justify-content-center'>
          <Col md={6}>
            <ImageGallery />
          </Col>
          <Col md={6}>
            <ProductCustomization />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default Index