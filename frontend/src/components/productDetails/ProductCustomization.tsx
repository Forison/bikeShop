import React from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import ProductCustomizationForm from './ProductCustomizationForm'
import { fetchProduct } from '../../services/fetchProduct'
import 'font-awesome/css/font-awesome.min.css'
import './ProductCustomization.scss'


const ProductCustomization: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const { data: product, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  })

  if (error instanceof Error) return <p>Error: {error.message}</p>

  return (
    <Card className='product-card shadow' >
      <Card.Body>
        <Card.Title className='title'>{product?.name}</Card.Title>
        <Card.Text className='subtitle'>{product?.description}</Card.Text>
        <div className='pricing'>
          <h2>€{product?.base_price}</h2>
        </div>
        {!product?.not_customizable && <small>Customize your product as you wish</small>}

        <ProductCustomizationForm
          notCustomizable={product?.not_customizable}
          productOptions={product?.product_part_options ?? []}
        />
      </Card.Body>
    </Card>
  )
}

export default ProductCustomization
