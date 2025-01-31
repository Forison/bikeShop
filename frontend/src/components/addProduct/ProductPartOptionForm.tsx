import React from 'react'
import { Field, FieldArray, ErrorMessage, useFormikContext } from 'formik'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { Shop } from '../../utils/interface/shop'

const ProductPartOptionForm: React.FC = () => {
  const { values } = useFormikContext<Shop>()

  return (
    <>
      <h1 className='text-center'>Add Product Part Option</h1>

      <FieldArray name="product_parts">
        {({ push: addPart, remove: removePart }) => (
          <>
            {values.product_parts.map((part, partIndex) => (
              <div key={partIndex} className="border p-3 mb-3 rounded">
                <h5>Part {partIndex + 1}</h5>

                {/* Part Name Input */}
                <Form.Group controlId={`product_parts[${partIndex}].part`} className='mb-3'>
                  <Form.Label>Part Name</Form.Label>
                  <Field
                    name={`product_parts[${partIndex}].part`}
                    type='text'
                    as={Form.Control}
                    placeholder='Enter part name'
                  />
                  <ErrorMessage name={`product_parts[${partIndex}].part`} component='div' className='text-danger' />
                </Form.Group>

                {/* Nested FieldArray for Options */}
                <FieldArray name={`product_parts[${partIndex}].part_options`}>
                  {({ push: addOption, remove: removeOption }) => (
                    <>
                      <h6>Part Options</h6>
                      {part.part_options.map((_, optionIndex) => (
                        <Row key={optionIndex} className='mb-3 align-items-center'>
                          <Col md={5}>
                            <Form.Group controlId={`option-${partIndex}-${optionIndex}`} className='mb-0'>
                              <Form.Label>Option</Form.Label>
                              <Field
                                name={`product_parts[${partIndex}].part_options[${optionIndex}].part`}
                                type='text'
                                as={Form.Control}
                                placeholder='Enter option name'
                              />
                              <ErrorMessage
                                name={`product_parts[${partIndex}].part_options[${optionIndex}].part`}
                                component='div'
                                className='text-danger'
                              />
                            </Form.Group>
                          </Col>

                          <Col md={3}>
                            <Form.Group controlId={`price-${partIndex}-${optionIndex}`} className='mb-0'>
                              <Form.Label>Price</Form.Label>
                              <Field
                                name={`product_parts[${partIndex}].part_options[${optionIndex}].price`}
                                type='number'
                                as={Form.Control}
                                placeholder='Enter price'
                              />
                              <ErrorMessage
                                name={`product_parts[${partIndex}].part_options[${optionIndex}].price`}
                                component='div'
                                className='text-danger'
                              />
                            </Form.Group>
                          </Col>

                          <Col md={3}>
                            <Form.Group controlId={`quantity-${partIndex}-${optionIndex}`} className='mb-0'>
                              <Form.Label>Quantity</Form.Label>
                              <Field
                                name={`product_parts[${partIndex}].part_options[${optionIndex}].quantity`}
                                type='number'
                                as={Form.Control}
                                placeholder='Enter quantity'
                              />
                              <ErrorMessage
                                name={`product_parts[${partIndex}].part_options[${optionIndex}].quantity`}
                                component='div'
                                className='text-danger'
                              />
                            </Form.Group>
                          </Col>

                          <Col md={1} className='text-center'>
                            {part.part_options.length > 1 && (
                              <Button
                                variant="link"
                                className="text-danger mt-4"
                                onClick={() => removeOption(optionIndex)}
                              >
                                <i className="fa fa-trash" />
                              </Button>
                            )}
                          </Col>
                        </Row>
                      ))}

                      <Button
                        variant='outline-secondary'
                        onClick={() => addOption({ part: '', price: 0, quantity: 0 })}
                        className='mt-2'
                      >
                        <i className='fa fa-plus' /> Add Options
                      </Button>
                    </>
                  )}
                </FieldArray>
                {values.product_parts.length > 1 && (
                  <Button
                    variant="danger"
                    onClick={() => removePart(partIndex)}
                    className="mt-3 d-block"
                  >
                    Remove Part
                  </Button>
                )}
              </div>
            ))}

            {/* Add More Parts Button */}
            <Button
              variant='primary'
              onClick={() => addPart({ part: '', part_options: [{ part: '', price: 0, quantity: 0 }] })}
              className='mt-3'
            >
              <i className='fa fa-plus' /> Add More Parts
            </Button>
          </>
        )}
      </FieldArray>
    </>
  )
}

export default ProductPartOptionForm
