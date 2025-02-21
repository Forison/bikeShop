import React, { useState } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import './ImageGallery.scss'

const ImageGallery: React.FC = () => {
  const images = [
    'https://d2f9uwgpmber13.cloudfront.net/public/uploads/mobile/2fae4f24e06cd9921718112099933.png',
    'https://d2f9uwgpmber13.cloudfront.net/public/uploads/mobile/16593b79e64a81b71718111730285.png',
    'https://d2f9uwgpmber13.cloudfront.net/public/uploads/mobile/a218f4cbe91213d31718111552000.png',
    'https://d2f9uwgpmber13.cloudfront.net/public/uploads/mobile/16593b79e64a81b71718111730285.png',
    'https://d2f9uwgpmber13.cloudfront.net/public/uploads/mobile/2fae4f24e06cd9921718112099933.png'
  ]

  const [mainImage, setMainImage] = useState(images[0])
  const [zoomStyle, setZoomStyle] = useState({})

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2)',
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({ transform: 'scale(1)' })
  }

  return (
    <Container className='mt-4'>
      <Row>
        <Col md={2} className='d-flex flex-column'>
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              thumbnail
              className='mb-2'
              onMouseEnter={() => setMainImage(img)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Col>
        <Col md={10} className='text-center'>
          <div
            className='main-image-container'
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Image src={mainImage} fluid style={zoomStyle} className='zoom-image' />
          </div>
        </Col>
      </Row>
    </Container>
  )
}
export default ImageGallery

