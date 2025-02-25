import React from 'react'
import { Field, FieldArray, useFormikContext, FormikErrors } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { Shop, ProhibitedOption } from '../../utils/interface/shop'
import { CategoryWithOptions } from '../../utils/interface/category'
import { getProductPartOptionsByCategoryName } from '../../utils/helper/getProductPartOptionsByCategoryName'

interface Prop {
  categories: CategoryWithOptions[] | undefined
}

const CombinationRuleForm: React.FC<Prop> = ({ categories }) => {
  const { values, setFieldValue, errors } = useFormikContext<Shop>()
  const { parts, part_options } = getProductPartOptionsByCategoryName(categories!, values.product.category_id)
  return (
    <>
      <h1 className='text-center fs-4'>Add Combination Rules</h1>
      <FieldArray name='combination_rule.prohibited_options'>
        {({ push, remove }) => (
          <>
            {values.combination_rule.prohibited_options.map((_, index) => (
              <div key={index} className='d-flex align-items-center gap-3 mb-3 rounded shadow p-3'>
                <Form.Group controlId={`prohibitedOptions-${index}`} className='flex-grow-1'>
                  <Form.Label>Part</Form.Label>
                  <Field
                    as='select'
                    name={`combination_rule.prohibited_options[${index}].part`}
                    className={`form-control ${!!(errors.combination_rule?.prohibited_options?.[index] as FormikErrors<ProhibitedOption>)?.part
                      ? 'is-invalid' : ''}`}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const selectedKey = e.target.value
                      setFieldValue(`combination_rule.prohibited_options[${index}].part`, selectedKey)
                      setFieldValue(`combination_rule.prohibited_options[${index}].option`, '')
                    }}
                  >
                    <option value=''>Select a part</option>
                    {parts.map((value: any, index: number) => (
                      <option key={index} value={value.name}>{value.name}</option>
                    ))}
                  </Field>
                </Form.Group>

                <Form.Group controlId={`prohibitedOptions-${index}`} className='flex-grow-1'>
                  <Form.Label>Option</Form.Label>
                  <Field
                    as='select'
                    name={`combination_rule.prohibited_options[${index}].option`}
                    className={`form-control ${!!(errors.combination_rule?.prohibited_options?.[index] as FormikErrors<ProhibitedOption>)?.option
                      ? 'is-invalid' : ''}`}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const selectedKey = e.target.value
                      setFieldValue(`combination_rule.prohibited_options[${index}].option`, selectedKey)
                    }}
                  >
                    <option value=''>Select a part</option>
                    {part_options.map((value: any, index: number) => (
                      <option key={index} value={value.name}>{value.name}</option>
                    ))}
                  </Field>
                </Form.Group>

                {values.combination_rule.prohibited_options.length > 1 && (
                  <Button
                    variant='outline-danger'
                    className='mt-4'
                    onClick={() => remove(index)}
                  >
                    <i className='fa fa-trash' />
                  </Button>
                )}
              </div>
            ))}

            <div className='mb-3'>
              <Button
                variant='outline-light'
                onClick={() => push({ part: '', option: '' })}
                className='add-more-btn mr-3'
              >
                <i className='fa fa-plus mr-3' />
              </Button>
              <small className='ml-3'> Add Prohibited Rule</small>
            </div>
          </>
        )}
      </FieldArray>
    </>
  )
}

export default CombinationRuleForm
