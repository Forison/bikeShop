import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { Formik, Form as FormikForm, FieldArray } from 'formik'
import { useParams } from 'react-router-dom'
import { ProductPart, ProductPartOption } from '../../utils/interface/shop'
import { ProductCustomizations } from '../../utils/interface/customization'
import { getCookie } from '../../utils/helper/tokenHandler'
import AlertBanner from '../../presentational/AlertBanner'
import { isValidCombination } from '../../utils/helper/validCombination'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createProductCustomization, fetchCustomizations } from '../../services/customization'
import Loading from '../../presentational/Loading'
import 'font-awesome/css/font-awesome.min.css'
import './ProductCustomizationForm.scss'

interface Props {
  productPartNames: ProductPart[]
  productOptions: ProductPartOption[]
}

const ProductCustomizationForm: React.FC<Props> = ({ productPartNames, productOptions }) => {
  const [variant, setVariant] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [combinationError, setCombinationError] = useState<string>('')
  const [formValue, setFormValue] = useState<ProductCustomizations>()
  const { id } = useParams<{ id?: string }>()
  const [productCustomizationId, setProductCustomizationId] = useState(null)

  const { mutate: createCustomizationMutation } = useMutation({
    mutationKey: ['createProductCustomization'],
    mutationFn: createProductCustomization,
    onSuccess: (data) => {
      setProductCustomizationId(data.id)
      setCombinationError('')
    },
    onError: (error: any) => {
      setCombinationError(error.message)
    },
  })

  useEffect(() => {
    if (isValidCombination(formValue)) {
      createCustomizationMutation(formValue)
    }
  }, [formValue])

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/cart_items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie()}`,
      },
      body: JSON.stringify({
        product_id: id,
        product_customization_id: productCustomizationId,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setMessage('Item was added to cart')
        setVariant('success')
        setTimeout(() => {
          setMessage('')
          setVariant('')
        }, 2000)
      })
      .catch((error) => {
        setMessage('Oops! Product could not be added to cart')
        setVariant('danger')
        setTimeout(() => {
          setMessage('')
          setVariant('')
        }, 2000)
        console.error('Error:', error)
      })
  }

  const { data: existingCustomizations, isLoading, isError, error } = useQuery({
    queryKey: ['product_customizations', id],
    queryFn: () => fetchCustomizations(id),
    enabled: !!id,
  })

  if (isLoading) return <Loading />
  if (isError) return <AlertBanner variant='danger' message={error.message} />

  const initialValues = {
    product_id: id,
    selected_options: existingCustomizations?.selected_options?.length > 0
      ? existingCustomizations.selected_options :
      [{ part: '', option: '', price: 0 }]
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => {
          setFormValue(values)
          return (
            <FormikForm>
              <FieldArray
                name='selected_options'
                render={(arrayHelpers) => (
                  <>
                    {values.selected_options.map((product: any, index: any) => (
                      <Row className='dropdown-section mb-3' key={index}>
                        <Col xs={4}>
                          <h6>Part Name</h6>
                          <select
                            className='form-control'
                            value={product.part}
                            onChange={(e) => {
                              const selectedPart = e.target.value
                              setFieldValue(`selected_options[${index}].part`, selectedPart)
                              setFieldValue(`selected_options[${index}].option`, '')
                              setFieldValue(`selected_options[${index}].price`, 0)
                              setFieldValue(`product_id`, id)
                            }}
                          >
                            <option value=''>Select Part</option>
                            {productPartNames.map((part, id) => (
                              <option key={id} value={part.name}>
                                {part.name}
                              </option>
                            ))}
                          </select>
                        </Col>

                        <Col xs={5}>
                          <h6>Part Option</h6>
                          <select
                            className='form-control'
                            value={product.option}
                            onChange={(e) => {
                              const selectedOption = e.target.value
                              const selectedPrice = productOptions.find(
                                (option) => option.name === selectedOption
                              )?.price || 0
                              setFieldValue(`selected_options[${index}].option`, selectedOption)
                              setFieldValue(`selected_options[${index}].price`, selectedPrice)
                            }}
                          >
                            <option value=''>Select Option</option>
                            {productOptions.map((option, idx) => (
                              <option key={idx} value={option.name}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </Col>

                        <Col xs={2} className='text-center mt-4'>
                          {product.price > 0 && <div className='price'>€ {product.price}</div>}
                        </Col>

                        <Col xs={1} className='text-center'>
                          {values.selected_options.length > 1 && (
                            <Button
                              variant='outline-danger'
                              onClick={() => arrayHelpers.remove(index)}
                              className='remove-btn mt-4'
                            >
                              <i className='fa fa-times' />
                            </Button>
                          )}
                        </Col>
                      </Row>
                    ))}
                    {combinationError &&
                      <Form.Control.Feedback type='invalid' className='d-block text-center'>
                        {combinationError}
                      </Form.Control.Feedback>
                    }
                    <div className='d-flex align-items-center'>
                      <Button
                        variant='outline-light'
                        onClick={() => arrayHelpers.push({ part: '', option: '', price: 0 })}
                        className='add-more-btn mr-3'
                      >
                        <i className='fa fa-plus mr-2' />
                      </Button>
                      <small className='ml-2'>Add More</small>
                    </div>
                  </>
                )}
              />

              <div className='actions mt-3'>
                <Button
                  variant='outline-dark'
                  type='submit'
                  className='add-to-cart'
                  disabled={!!combinationError}
                >
                  Add to Cart
                </Button>
              </div>
            </FormikForm>
          )
        }}
      </Formik>
      {(message && variant) && <AlertBanner message={message} variant={variant} />}
    </>
  )
}

export default ProductCustomizationForm
