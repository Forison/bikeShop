import React, { useState } from 'react'
import { Button, Card, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap'
import 'font-awesome/css/font-awesome.min.css'
import './ProductCustomization.scss'
import ProductCustomizationForm from './ProductCustomizationForm'


const ProductCustomization: React.FC = () => {

  return (
    <Card className='airpods-card'>
      <Card.Body>
        <Card.Title className='title'>Airpods- Max</Card.Title>
        <Card.Text className='subtitle'>
          A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.
        </Card.Text>
        <div className='pricing'>
          <h2>$549.00</h2>
        </div>
        <h6>Customize your product as you wish</h6>

        <ProductCustomizationForm />
      </Card.Body>
    </Card>
  )
}

export default ProductCustomization
