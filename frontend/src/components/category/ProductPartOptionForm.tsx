import React from 'react'
import { Field, FieldArray, useFormikContext, FormikErrors } from 'formik'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { Category, ProductPart, ProductPartOption } from '../../utils/interface/shop'

const ProductPartOptionForm: React.FC = () => {
  const { values, touched, errors } = useFormikContext<Category>()
  console.log(values)
  console.log(errors)
  return (
    <>
      <h1 className='text-center fs-4'>Add Product Part and Option</h1>
      <FieldArray name='product_parts'>
        {({ push: addPart, remove: removePart }) => (
          <>
            {values.category.product_parts.map((part, partIndex) => (
              <div key={partIndex} className='border p-3 mb-3 rounded shadow'>
                <Form.Group controlId={`category.product_parts[${partIndex}].name`} className='mb-3'>
                  <Field
                    name={`category.product_parts[${partIndex}].name`}
                    type='text'
                    as={Form.Control}
                    placeholder='Enter part name'
                    isInvalid={touched?.category?.product_parts?.[partIndex]?.name &&
                      (errors.category?.product_parts?.[partIndex] as FormikErrors<ProductPart> | undefined)?.name
                    }
                  />
                </Form.Group>
                <FieldArray name={`category.product_parts[${partIndex}].part_options`}>
                  {({ push: addOption, remove: removeOption }) => (
                    <>
                      {part.part_options.map((_, optionIndex) => {
                        const partError = errors.category?.product_parts?.[partIndex] as FormikErrors<ProductPart> | undefined
                        const isTouched = touched.category?.product_parts?.[partIndex] as FormikErrors<ProductPart> | undefined
                        const optionError = partError?.part_options?.[optionIndex] as FormikErrors<ProductPartOption> | undefined
                        const optionTouched = isTouched?.part_options?.[optionIndex] as FormikErrors<ProductPartOption> | undefined
                        return (
                          <Row key={optionIndex} className='mb-3 align-items-center'>
                            <Col md={5}>
                              <Form.Group controlId={`option-${partIndex}-${optionIndex}`} className='mb-0'>
                                <Form.Label>Option</Form.Label>
                                <Field
                                  name={`category.product_parts[${partIndex}].part_options[${optionIndex}].name`}
                                  type='text'
                                  as={Form.Control}
                                  placeholder='Enter option name'
                                  isInvalid={!!optionError?.name && optionTouched?.name}
                                />
                              </Form.Group>
                            </Col>

                            <Col md={3}>
                              <Form.Group controlId={`price-${partIndex}-${optionIndex}`} className='mb-0'>
                                <Form.Label>Price</Form.Label>
                                <Field
                                  name={`category.product_parts[${partIndex}].part_options[${optionIndex}].price`}
                                  type='number'
                                  as={Form.Control}
                                  placeholder='Enter price'
                                  isInvalid={!!optionError?.price && optionTouched?.price}
                                />
                              </Form.Group>
                            </Col>

                            <Col md={3}>
                              <Form.Group controlId={`quantity-${partIndex}-${optionIndex}`} className='mb-0'>
                                <Form.Label>Quantity</Form.Label>
                                <Field
                                  name={`category.product_parts[${partIndex}].part_options[${optionIndex}].quantity`}
                                  type='number'
                                  as={Form.Control}
                                  placeholder='Enter quantity'
                                  isInvalid={!!optionError?.quantity && optionTouched?.quantity}
                                />
                              </Form.Group>
                            </Col>

                            <Col md={1} className='text-center'>
                              {part.part_options.length > 1 && (
                                <Button
                                  variant='outline-danger'
                                  className='text-danger mt-4'
                                  onClick={() => removeOption(optionIndex)}
                                >
                                  <i className='fa fa-trash' />
                                </Button>
                              )}
                            </Col>
                          </Row>
                        )
                      })}
                      <div className='d-flex justify-content-between align-item-center'>
                        <Button
                          variant='outline-secondary'
                          onClick={() => addOption({ name: '', price: 0, quantity: 0 })}
                          className='mt-2'
                        >
                          <i className='fa fa-plus' /> Add options
                        </Button>
                        {values.category?.product_parts.length > 1 && (
                          <Button
                            variant='outline-danger'
                            onClick={() => removePart(partIndex)}
                            className='mt-3 d-block'
                          >
                            <i className='fa fa-times' /> Remove part
                          </Button>
                        )}
                      </div>
                    </>
                  )
                  }
                </FieldArray>
              </div>
            ))}
            <Button
              variant='light'
              onClick={() => addPart({ name: '', part_options: [{ name: '', price: 0, quantity: 0 }] })}
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
