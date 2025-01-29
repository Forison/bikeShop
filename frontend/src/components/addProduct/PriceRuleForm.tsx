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
      <FieldArray name='price_rule.part_option'>
        {({ push, remove }) => (
          <>
            {values.price_rule.part_option.map((_, index) => (
              <Row key={index} className='align-items-center mb-3'>
                <Col xs={4}>
                  <div className='form-group' control-id={`conditionKey_${index}`}>
                    <label>Part name</label>
                    <Field
                      name={`price_rule.part_option[${index}].condition_key`}
                      type='text'
                      placeholder='Enter condition key'
                      className='form-control'
                    />
                    <ErrorMessage
                      name={`price_rule.part_option[${index}].condition_key`}
                      component='div'
                      className='text-danger'
                    />
                  </div>
                </Col>

                <Col xs={4}>
                  <div className='form-group' control-id={`conditionValue_${index}`}>
                    <label>Part option</label>
                    <Field
                      name={`price_rule.part_option[${index}].condition_value`}
                      type='text'
                      placeholder='Enter condition value'
                      className='form-control'
                    />
                    <ErrorMessage
                      name={`price_rule.part_option[${index}].condition_value`}
                      component='div'
                      className='text-danger'
                    />
                  </div>
                </Col>

                <Col xs={3}>
                  <div className='form-group' control-id={`priceModifier_${index}`}>
                    <label>Price Modifier</label>
                    <Field
                      name={`price_rule.part_option[${index}].price_modifier`}
                      type='number'
                      className='form-control'
                    />
                    <ErrorMessage
                      name={`price_rule.part_option[${index}].price_modifier`}
                      component='div'
                      className='text-danger'
                    />
                  </div>
                </Col>

                <Col xs={1} className='text-center'>
                  {values.price_rule.part_option.length > 1 && (
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
                  push({ condition_key: '', condition_value: '', price_modifier: 0 })
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
