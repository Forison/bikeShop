import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'
import ProductCustomizationForm from './ProductCustomizationForm'
import { Product, ProductPart, ProductPartOption } from '../../utils/interface/shop'
import { getCookie } from '../../utils/helper/tokenHandler'

import './ProductCustomization.scss'

export interface ProductWithParts extends Product {
  product_parts: ProductPart[];
  product_part_options: ProductPartOption[];
}

const ProductCustomization: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const [product, setProduct] = useState<ProductWithParts | null>(null)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie()}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setProduct(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  return (
    <Card className='product-card'>
      <Card.Body>
        <Card.Title className='title'>{product?.name}</Card.Title>
        <Card.Text className='subtitle'>
          {product?.description}
        </Card.Text>
        <div className='pricing'>
          <h2>€{product?.base_price}</h2>
        </div>
        <small>Customize your product as you wish</small>

        <ProductCustomizationForm
          productPartNames={product?.product_parts ?? []}
          productOptions={product?.product_part_options ?? []}
        />
      </Card.Body>
    </Card>
  )
}

export default ProductCustomization
