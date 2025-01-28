import React from 'react'
import NavBar from './productDetails/NavBar'
import MoterraNeoComponent from '../presentational/MoterraNeoComponent'
// import ProductCard from '../presentational/ProductCard'
import { Col, Container, Row } from 'react-bootstrap'

const Home: React.FC = () => {
  return (
    <>
      <NavBar />
      <Container fluid className='moterra-container d-flex '>
        <Row>
          <MoterraNeoComponent />
        </Row>
      </Container>
      <Container className='moterra-container d-flex '>
        <Row>
          <Col lg={3} >
            {/* <ProductCard /> */}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home