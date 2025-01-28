import React from 'react'
import { Field, ErrorMessage, useFormikContext } from 'formik'
import { Form } from 'react-bootstrap'
import { Shop } from '../../utils/interface/shop'

const ProductUploadForm: React.FC = React.memo(() => {
  const { touched, errors, setFieldValue } = useFormikContext<Shop>()

  // Handle file input change event to update Formik's state
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      // Update the Formik field with the selected files
      setFieldValue('product.images', files)
    }
  }

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

      <Form.Group controlId='description' className='mb-3'>
        <Form.Label>Description</Form.Label>
        <Field
          name='product.description'
          as='textarea'
          rows={3}
          className='form-control'
        />
      </Form.Group>

      <Form.Group controlId='basePrice' className='mb-3'>
        <Form.Label>Base Price</Form.Label>
        <Field
          name='product.basePrice'
          type='number'
          as={Form.Control}
          isInvalid={touched.product?.basePrice && !!errors.product?.basePrice}
        />
        <ErrorMessage name='product.basePrice' component='div' className='text-danger' />
      </Form.Group>

      <Form.Group controlId='images' className='mb-3'>
        <Form.Label>Upload Images</Form.Label>
        <input
          type='file'
          name='product.images'
          multiple
          accept='image/*'
          onChange={handleFileChange}
          className='form-control'
        />
        {touched.product?.images && errors.product?.images && (
          <div className='text-danger'>{errors.product.images}</div>
        )}
      </Form.Group>
    </>
  )
})

export default ProductUploadForm
