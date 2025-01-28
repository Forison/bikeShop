import React, { useState } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import './ImageGallery.scss'

const ImageGallery: React.FC = () => {
  const images = [
    { id: 1, src: 'https://ahoybikes.com/wp-content/uploads/2022/12/HYBRID-BIKE-1-500x330.jpg.webp', alt: 'Main Image' },
    { id: 2, src: 'https://ahoybikes.com/wp-content/uploads/2022/12/HYBRID-BIKE-1-500x330.jpg.webp', alt: 'Sub Image 1' },
    { id: 3, src: 'https://ahoybikes.com/wp-content/uploads/2022/12/HYBRID-BIKE-1-500x330.jpg.webp', alt: 'Sub Image 2' },
    { id: 4, src: 'https://ahoybikes.com/wp-content/uploads/2022/12/HYBRID-BIKE-1-500x330.jpg.webp', alt: 'Sub Image 3' },
    { id: 5, src: 'https://ahoybikes.com/wp-content/uploads/2022/12/HYBRID-BIKE-1-500x330.jpg.webp', alt: 'Sub Image 4' },
  ]

  const [mainImage, setMainImage] = useState(images[0])

  return (
    <Container className='image-gallery'>
      <Row className='justify-content-center'>
        <Col md={6} className='text-center'>
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            className='main-image'
            fluid
          />
        </Col>
      </Row>
      <Row className='justify-content-center thumbnails'>
        {images.slice(1).map((img) => (
          <Col key={img.id} xs={3} md={2} className='text-center'>
            <Image
              src={img.src}
              alt={img.alt}
              className='thumbnail'
              fluid
              onClick={() => setMainImage(img)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ImageGallery
