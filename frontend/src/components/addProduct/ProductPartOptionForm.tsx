import React from 'react'
import { Field, FieldArray, ErrorMessage, useFormikContext } from 'formik'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { Shop } from '../../utils/interface/shop'

const ProductPartOptionForm: React.FC = () => {
  const { values } = useFormikContext<Shop>()

  return (
    <>
      <h1 className='text-center'>Add Product Part option</h1>
      <Form.Group controlId='part' className='mb-3'>
        <Form.Label>Part Name</Form.Label>
        <Field
          name='productPart.part'
          type='text'
          as={Form.Control}
          placeholder='Enter part name'
        />
        <ErrorMessage name='productPart.part' component='div' className='text-danger' />
      </Form.Group>

      <FieldArray name='productPart.partOptions'>
        {({ push, remove }) => (
          <>
            <h5>Part Options</h5>
            {values.productPart.partOptions.map((_, index) => (
              <Row key={index} className='mb-3 align-items-center'>
                {/* Option Field */}
                <Col md={5}>
                  <Form.Group controlId={`partOption-${index}`} className='mb-0'>
                    <Form.Label>Option</Form.Label>
                    <Field
                      name={`productPart.partOptions[${index}].partOption`}
                      type='text'
                      as={Form.Control}
                      placeholder='Enter option name'
                    />
                    <ErrorMessage
                      name={`productPart.partOptions[${index}].partOption`}
                      component='div'
                      className='text-danger'
                    />
                  </Form.Group>
                </Col>

                {/* Price Field */}
                <Col md={4}>
                  <Form.Group controlId={`price-${index}`} className='mb-0'>
                    <Form.Label>Price</Form.Label>
                    <Field
                      name={`productPart.partOptions[${index}].price`}
                      type='number'
                      as={Form.Control}
                      placeholder='Enter price'
                    />
                    <ErrorMessage
                      name={`productPart.partOptions[${index}].price`}
                      component='div'
                      className='text-danger'
                    />
                  </Form.Group>
                </Col>

                {/* Remove Button */}
                <Col md={3} className='text-center'>
                  {values.productPart.partOptions.length > 1 && (
                    <Button
                      variant='danger'
                      onClick={() => remove(index)}
                      className='mt-4'
                    >
                      Remove Option
                    </Button>
                  )}
                </Col>
              </Row>
            ))}

            <div className='mb-3'>
              <Button
                variant='outline-light'
                onClick={() => push({ partOption: '', price: 0 })}
                className='add-more-btn mr-3'
              >
                <i className='fa fa-plus mr-3' />
              </Button>
              <small className='ml-3'> Add Options</small>
            </div>
          </>
        )}
      </FieldArray>
    </>
  )
}

export default ProductPartOptionForm
