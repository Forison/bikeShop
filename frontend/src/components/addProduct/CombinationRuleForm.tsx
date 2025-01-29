import React from 'react'
import { Field, FieldArray, ErrorMessage, useFormikContext } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { Shop } from '../../utils/interface/shop'

const CombinationRuleForm: React.FC = () => {
  const { values, errors } = useFormikContext<Shop>()
  console.log(errors)
  return (
    <>
      <h1 className='text-center'>Add Combination Rules</h1>
      <FieldArray name='combination_rule.prohibited_options'>
        {({ push, remove }) => (
          <>
            <h5>Prohibited Options</h5>
            {values.combination_rule.prohibited_options.map((_, index) => (
              <div key={index} className='d-flex align-items-center gap-3 mb-3'>
                <Form.Group controlId={`prohibitedOptions-${index}`} className='flex-grow-1'>
                  <Form.Label>Part</Form.Label>
                  <Field
                    name={`combination_rule.prohibited_options[${index}].part`}
                    type='text'
                    as={Form.Control}
                    placeholder='Enter prohibited part'
                  />
                  <ErrorMessage
                    name={`combination_rule.prohibited_options[${index}].part`}
                    component='div'
                    className='text-danger'
                  />
                </Form.Group>

                <Form.Group controlId={`prohibitedOptions-${index}`} className='flex-grow-1'>
                  <Form.Label>Option</Form.Label>
                  <Field
                    name={`combination_rule.prohibited_options[${index}].option`}
                    type='text'
                    as={Form.Control}
                    placeholder='Enter prohibited option'
                  />
                  <ErrorMessage
                    name={`combination_rule.prohibited_options[${index}].option`}
                    component='div'
                    className='text-danger'
                  />
                </Form.Group>

                {values.combination_rule.prohibited_options.length > 1 && (
                  <Button
                    variant='danger'
                    className='mt-4'
                    onClick={() => remove(index)}
                  >
                    Remove
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
