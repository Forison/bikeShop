import React from 'react'
import { Carousel } from 'react-bootstrap'
import './ProductCarousel.scss'

const ProductCarousel: React.FC = () => {
  const bikeImages = [
    'https://d2f9uwgpmber13.cloudfront.net/public/uploads/mobile/a218f4cbe91213d31718111552000.png',
    'https://d2f9uwgpmber13.cloudfront.net/public/uploads/mobile/16593b79e64a81b71718111730285.png',
    'https://d2f9uwgpmber13.cloudfront.net/public/uploads/mobile/2fae4f24e06cd9921718112099933.png',
  ]

  return (
    <Carousel indicators controls={false} interval={3000} className="custom-carousel">
      {bikeImages.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 carousel-images"
            src={image}
            alt={`Slide ${index + 1}`}
            height={500}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
