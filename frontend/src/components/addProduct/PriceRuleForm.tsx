import React from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { Field, FieldArray, useFormikContext, FormikErrors } from 'formik'
import { PriceRulePartOption, Shop } from '../../utils/interface/shop'
import { CategoryWithOptions } from '../../utils/interface/category'
import { getProductPartOptionsByCategoryName } from '../../utils/helper/getProductPartOptionsByCategoryName'

interface Prop {
  categories: CategoryWithOptions[] | undefined
}

const PriceRuleForm: React.FC<Prop> = ({ categories }) => {
  const { values, errors, touched, setFieldValue } = useFormikContext<Shop>()
  const { parts, part_options } = getProductPartOptionsByCategoryName(categories!, values.product.category_id)
  return (
    <>
      <h1 className='text-center fs-4'>Add Price Rule</h1>
      <FieldArray name='price_rule.part_option'>
        {({ push, remove }) => (
          <>
            {values.price_rule.part_option.map((_, index) => (
              <Row key={index} className='align-items-center mb-3 rounded shadow p-3'>
                <Col xs={4}>
                  <Form.Group controlId={`conditionKey_${index}`}>
                    <Form.Label>Part name</Form.Label>
                    <Field
                      as='select'
                      name={`price_rule.part_option[${index}].condition_key`}
                      className={`form-control ${!!(errors.price_rule?.part_option?.[index] as FormikErrors<PriceRulePartOption>)?.condition_key
                        ? 'is-invalid' : ''}`}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {

                        const selectedKey = e.target.value
                        setFieldValue(`price_rule.part_option[${index}].condition_key`, selectedKey)
                        setFieldValue(`price_rule.part_option[${index}].condition_value`, '')
                      }}
                    >
                      <option value=''>Select a part</option>
                      {parts.map((value: any, index: number) => (
                        <option key={index} value={value.name}>{value.name}</option>
                      ))}
                    </Field>
                  </Form.Group>
                </Col>

                <Col xs={4}>
                  <Form.Group controlId={`conditionValue_${index}`}>
                    <Form.Label>Part option</Form.Label>
                    <Field
                      as='select'
                      name={`price_rule.part_option[${index}].condition_value`}
                      className={`form-control ${!!(errors.price_rule?.part_option?.[index] as FormikErrors<PriceRulePartOption>)?.condition_value ?
                        'is-invalid' : ''}`}
                    >
                      <option value=''>Select an option</option>
                      {part_options.map((part: any, index: number) => (
                        <option key={index} value={part.name}>{part.name}</option>
                      ))}
                    </Field>
                  </Form.Group>
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
                className='add-more-btn mr-3'
                variant='outline-light'
                onClick={() =>
                  push({ condition_key: '', condition_value: '', price_modifier: 0 })
                }
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
