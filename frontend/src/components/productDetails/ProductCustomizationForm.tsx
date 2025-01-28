import React from 'react'
import { Button, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import { Formik, Form, FieldArray } from 'formik'
import 'font-awesome/css/font-awesome.min.css'
import './ProductCustomizationForm.scss'

const ProductCustomizationForm: React.FC = () => {
  const parts = ['Headband', 'Cushions', 'Case']
  const options = ['Red', 'Blue', 'Black']

  const initialValues = {
    products: [
      {
        part: 'Select Part',
        option: 'Select Option',
      },
    ],
  }

  const handleSubmit = (values: any) => {
    console.log('Form values:', values)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FieldArray
            name='products'
            render={(arrayHelpers) => (
              <>
                {values.products.map((product, index) => (
                  <Row className='dropdown-section mb-3' key={index}>
                    <Col xs={4}>
                      <h6>Part Name</h6>
                      <DropdownButton
                        id={`dropdown-part-${index}`}
                        title={product.part}
                        onSelect={(part) => setFieldValue(`products[${index}].part`, part || 'Select Part')}
                        variant='outline-secondary'
                      >
                        {parts.map((part, id) => (
                          <Dropdown.Item key={id} eventKey={part}>
                            {part}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </Col>
                    <Col xs={5}>
                      <h6>Part Option</h6>
                      <DropdownButton
                        id={`dropdown-option-${index}`}
                        title={product.option}
                        onSelect={(option) => setFieldValue(`products[${index}].option`, option || 'Select Option')}
                        variant='outline-secondary'
                      >
                        {options.map((option, idx) => (
                          <Dropdown.Item key={idx} eventKey={option}>
                            {option}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </Col>
                    <Col xs={1} className='text-center'>
                      {values.products.length > 1 && (
                        <Button
                          variant='outline-danger'
                          onClick={() => arrayHelpers.remove(index)}
                          className='remove-btn mt-4'
                        >
                          <i className='fa fa-times' />
                        </Button>
                      )}
                    </Col>
                    <Col xs={2} className='text-center mt-4'>
                      <div className='price'>€ 121.21</div>
                    </Col>
                  </Row>
                ))}
                <div className='mb-3'>
                  <Button
                    variant='outline-light'
                    onClick={() => arrayHelpers.push({ part: 'Select Part', option: 'Select Option' })}
                    className='add-more-btn mr-3'
                  >
                    <i className='fa fa-plus mr-3' />
                  </Button>
                  <small className='ml-3'> Add More</small>
                </div>
              </>
            )}
          />

          <div className='actions mt-3'>
            <Button variant='success' type='submit' className='buy-now'>
              Buy Now
            </Button>
            <Button variant='outline-dark' className='add-to-cart'>
              Add to Cart
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ProductCustomizationForm
