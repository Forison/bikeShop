import React from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { Field, FieldArray, ErrorMessage, useFormikContext, FormikErrors } from 'formik'
import { PriceRulePartOption, Shop } from '../../utils/interface/shop'

const PriceRuleForm: React.FC = () => {
  const { values, errors, touched } = useFormikContext<Shop>()
  console.log(errors.price_rule?.part_option)
  return (
    <>
      <h1 className='text-center fs-4'>Add Price Rule</h1>
      <FieldArray name='price_rule.part_option'>
        {({ push, remove }) => (
          <>
            {values.price_rule.part_option.map((_, index) => (
              <Row key={index} className='align-items-center mb-3 rounded shadow p-3'>
                <Col xs={4}>
                  <div className='form-group' control-id={`conditionKey_${index}`}>
                    <label>Part name</label>
                    <Field
                      name={`price_rule.part_option[${index}].condition_key`}
                      type='text'
                      as={Form.Control}
                      isInvalid={!!(errors.price_rule?.part_option?.[index] as FormikErrors<PriceRulePartOption>)?.condition_key &&
                        !(touched.price_rule?.part_option?.[index] as FormikErrors<PriceRulePartOption>)?.condition_key
                      }
                    />
                  </div>
                </Col>

                <Col xs={4}>
                  <div className='form-group' control-id={`conditionValue_${index}`}>
                    <label>Part option</label>
                    <Field
                      name={`price_rule.part_option[${index}].condition_value`}
                      type='text'
                      as={Form.Control}
                      isInvalid={!!(errors.price_rule?.part_option?.[index] as FormikErrors<PriceRulePartOption>)?.condition_value &&
                        !(touched.price_rule?.part_option?.[index] as FormikErrors<PriceRulePartOption>)?.condition_value
                      }
                    />
                  </div>
                </Col>

                <Col xs={3}>
                  <div className='form-group' control-id={`priceModifier_${index}`}>
                    <label>Price Modifier</label>
                    <Field
                      name={`price_rule.part_option[${index}].price_modifier`}
                      type='number'
                      as={Form.Control}
                      isInvalid={!!(errors.price_rule?.part_option?.[index] as FormikErrors<PriceRulePartOption>)?.price_modifier &&
                        !(touched.price_rule?.part_option?.[index] as FormikErrors<PriceRulePartOption>)?.price_modifier
                      }
                    />
                    <ErrorMessage
                      name={`price_rule.part_option[${index}].price_modifier`}
                      component='div'
                      className='text-danger small'
                    />
                  </div>
                </Col>

                <Col xs={1} className='text-center'>
                  {values.price_rule.part_option.length > 1 && (
                    <Button
                      variant='outline-danger'
                      onClick={() => remove(index)}
                      className='mt-4'
                    >
                      <i className='fa fa-trash' />
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
