import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Field, FieldArray, ErrorMessage, useFormikContext } from 'formik'
import { Shop } from '../../utils/interface/shop'

const PriceRuleForm: React.FC = () => {
  const { values } = useFormikContext<Shop>()
  console.log(values)
  return (
    <>
      <h1 className='text-center'>Add Price Rule</h1>
      <FieldArray name='priceRule.partOption'>
        {({ push, remove }) => (
          <>
            {values.priceRule.partOption.map((_, index) => (
              <Row key={index} className='align-items-center mb-3'>
                <Col xs={4}>
                  <div className='form-group' control-id={`conditionKey_${index}`}>
                    <label>Part name</label>
                    <Field
                      name={`priceRule.partOption[${index}].conditionKey`}
                      type='text'
                      placeholder='Enter condition key'
                      className='form-control'
                    />
                    <ErrorMessage
                      name={`priceRule.partOption[${index}].conditionKey`}
                      component='div'
                      className='text-danger'
                    />
                  </div>
                </Col>

                <Col xs={4}>
                  <div className='form-group' control-id={`conditionValue_${index}`}>
                    <label>Part option</label>
                    <Field
                      name={`priceRule.partOption[${index}].conditionValue`}
                      type='text'
                      placeholder='Enter condition value'
                      className='form-control'
                    />
                    <ErrorMessage
                      name={`priceRule.partOption[${index}].conditionValue`}
                      component='div'
                      className='text-danger'
                    />
                  </div>
                </Col>

                <Col xs={3}>
                  <div className='form-group' control-id={`priceModifier_${index}`}>
                    <label>Price Modifier</label>
                    <Field
                      name={`priceRule.partOption[${index}].priceModifier`}
                      type='number'
                      className='form-control'
                    />
                    <ErrorMessage
                      name={`priceRule.partOption[${index}].priceModifier`}
                      component='div'
                      className='text-danger'
                    />
                  </div>
                </Col>

                <Col xs={1} className='text-center'>
                  {values.priceRule.partOption.length > 1 && (
                    <Button
                      variant='danger'
                      onClick={() => remove(index)}
                      className='mt-4'
                    >
                      Remove
                    </Button>
                  )}
                </Col>
              </Row>
            ))}
            <div className='mb-3'>
              <Button
                variant='outline-light'
                onClick={() =>
                  push({ conditionKey: '', conditionValue: '', priceModifier: 0 })
                }
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

export default PriceRuleForm
