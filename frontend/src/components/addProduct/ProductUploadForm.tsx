import React from 'react'
import { Field, ErrorMessage, useFormikContext } from 'formik'
import { Form } from 'react-bootstrap'
import { Shop } from '../../utils/interface/shop'

const ProductUploadForm: React.FC = React.memo(() => {
  const { touched, errors } = useFormikContext<Shop>()

  return (
    <>
      <h1 className='text-center'>Add Product Details</h1>
      <Form.Group controlId='name' className='mb-3'>
        <Form.Label>Product Name</Form.Label>
        <Field
          name='product.name'
          type='text'
          as={Form.Control}
          isInvalid={touched.product?.name && !!errors.product?.name}
        />
        <ErrorMessage name='product.name' component='div' className='text-danger' />
      </Form.Group>

      <Form.Group controlId='category' className='mb-3'>
        <Form.Label>Category</Form.Label>
        <Field
          name='product.category'
          type='text'
          as={Form.Control}
          isInvalid={touched.product?.category && !!errors.product?.category}
        />
        <ErrorMessage name='product.category' component='div' className='text-danger' />
      </Form.Group>

      <Form.Group controlId='quantity' className='mb-3'>
        <Form.Label>Quantity</Form.Label>
        <Field
          name='product.quantity'
          type='numer'
          as={Form.Control}
          isInvalid={touched.product?.quantity && !!errors.product?.quantity}
        />
        <ErrorMessage name='product.quantity' component='div' className='text-danger' />
      </Form.Group>

      <Form.Group controlId='description' className='mb-3'>
        <Form.Label>Description</Form.Label>
        <Field
          name='product.description'
          as='textarea'
          rows={3}
          className='form-control'
        />
      </Form.Group>
    </>
  )
})

export default ProductUploadForm
