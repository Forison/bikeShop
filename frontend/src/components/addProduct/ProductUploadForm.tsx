import React from 'react'
import { Field, ErrorMessage, useFormikContext } from 'formik'
import { Form, Row, Col } from 'react-bootstrap'
import { Shop } from '../../utils/interface/shop'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../services/category'
import { Category } from '../../utils/interface/category'

const ProductUploadForm: React.FC = React.memo(() => {
  const { touched, errors } = useFormikContext<Shop>()
  const { data: categories } = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  })

  return (
    <>
      <h1 className='text-center fs-4 mb-4'>Add Product Details</h1>
      <div className='shadow rounded p-4'>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId='name' className='mb-3'>
              <Form.Label>Product Name</Form.Label>
              <Field
                name='product.name'
                type='text'
                as={Form.Control}
                isInvalid={touched.product?.name && !!errors.product?.name}
              />
              <ErrorMessage name='product.name' component='div' className='text-danger small' />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId='category' className='mb-3'>
              <Form.Label>Category</Form.Label>
              <Field
                name='product.category_id'
                as='select'
                className='form-control'
              >
                <option value=''>Select a category</option>
                {categories?.map((category, index) => (
                  <option value={category.id} key={index}>{category.name}</option>
                ))}
              </Field>
              <ErrorMessage name='product.category_id' component='div' className='text-danger small' />
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group controlId='quantity' className='mb-3'>
              <Form.Label>Quantity</Form.Label>
              <Field
                name='product.quantity'
                type='number'
                as={Form.Control}
                isInvalid={touched.product?.quantity && !!errors.product?.quantity}
              />
              <ErrorMessage name='product.quantity' component='div' className='text-danger small' />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId='description' className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Field
                name='product.description'
                as='textarea'
                rows={3}
                className='form-control'
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
    </>
  )
})

export default ProductUploadForm
