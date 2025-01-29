import React, { useState } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { Formik, Form as FormikForm, FieldArray } from 'formik'

import { ProductPart, ProductPartOption } from '../../utils/interface/shop'
import { ProductCustomizations } from '../../utils/interface/customization'
import { getCookie } from '../../utils/helper/tokenHandler'

import 'font-awesome/css/font-awesome.min.css'
import './ProductCustomizationForm.scss'


interface Props {
  productPartNames: ProductPart[]
  productOptions: ProductPartOption[]
  productId?: number
}

const ProductCustomizationForm: React.FC<Props> = ({ productId, productPartNames, productOptions }) => {
  const [applyCustomization, setApplyCustomization] = useState(false)

  const handleApplyCustomization = (isChecked: boolean, values: ProductCustomizations) => {
    console.log(values)
    setApplyCustomization(isChecked)
    if (isChecked) {
      fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/product_customizations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie()}`,
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }

  const handleSubmit = (values: any) => {
  }

  return (
    <Formik
      initialValues={{
        product_id: productId,
        selected_options: [
          {
            part: '',
            option: '',
            price: 0,
          },
        ],
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <FormikForm>
          <FieldArray
            name='selected_options'
            render={(arrayHelpers) => (
              <>
                {values.selected_options.map((product, index) => (
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
                          setFieldValue(`product_id`, productId)
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

                <div className='d-flex justify-content-between align-items-center mb-3'>
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
                  <Form.Check
                    type='switch'
                    id='apply-customization'
                    label='Apply Customization'
                    checked={applyCustomization}
                    onChange={(e) => {
                      handleApplyCustomization(e.target.checked, values)
                    }}
                  />
                </div>
              </>
            )}
          />

          <div className='actions mt-3'>
            <Button variant='success' type='submit' className='buy-now'>
              Buy Now
            </Button>
            <Button variant='outline-dark' type='submit' className='add-to-cart'>
              Add to Cart
            </Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  )
}

export default ProductCustomizationForm
