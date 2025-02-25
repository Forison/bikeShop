import React from 'react'
import { Field, ErrorMessage, useFormikContext } from 'formik'
import { Form } from 'react-bootstrap'
import { Category } from '../../utils/interface/shop'

const CategoryForm: React.FC = () => {
  const { values, touched, errors } = useFormikContext<Category>()
  return (
    <>
      <h1 className='text-center fs-4'>Add Product Category</h1>
      <div className='border p-3 mb-3 rounded shadow'>
        <Form.Group controlId={`product_parts.category.name`} className='mb-3'>
          <Form.Label>Category</Form.Label>
          <Field
            name={'category.name'}
            type='text'
            as={Form.Control}
            placeholder='Enter category name'
            isInvalid={touched.category?.name && !!errors.category?.name}
          />
          <ErrorMessage name={'category.name'} component='div' className='text-danger small' />
        </Form.Group>
      </div>
    </>
  )
}

export default CategoryForm
