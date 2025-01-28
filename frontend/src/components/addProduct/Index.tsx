import React, { useState } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import { Container, Row, Col, Button } from 'react-bootstrap'
import ProductUploadForm from './ProductUploadForm'
import ProductPartOptionForm from './ProductPartOptionForm'
import PriceRuleForm from './PriceRuleForm'
import CombinationRuleForm from './CombinationRuleForm'
import { combinedValidationSchema } from '../../utils/schema'
import { Shop } from '../../utils/interface/shop'
import NavBar from '../productDetails/NavBar'
import './Index.scss'

const initialValues: Shop = {
  product: {
    name: '',
    category: '',
    description: '',
    basePrice: '',
    images: [],
  },
  productPart: {
    part: '',
    partOptions: [{ partOption: '', price: 0 }],
  },
  priceRule: {
    partOption: [
      {
        conditionKey: '',
        conditionValue: '',
        priceModifier: 0,
      },
    ],
  },
  combinationRule: {
    productId: 1,
    prohibitedOptions: [{
      part: '',
      option: ''
    }],
  },
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1)

  const handleNext = () => setStep((prev) => prev + 1)
  const handlePrev = () => setStep((prev) => prev - 1)

  const handleSubmit = (values: Shop, actions: FormikHelpers<Shop>) => {
    console.log('Form submitted with values:', values)
    actions.setSubmitting(false)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ProductUploadForm />
      case 2:
        return <ProductPartOptionForm />
      case 3:
        return <PriceRuleForm />
      case 4:
        return <CombinationRuleForm />
      default:
        return null
    }
  }

  return (
    <>
      <NavBar />
      <Container className='mt-5'>
        <Row className='justify-content-center'>
          <Col lg={6}>
            <Formik
              initialValues={initialValues}
              validationSchema={combinedValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {renderStep()}
                  <div className='mt-3 d-flex justify-content-between'>
                    {step > 1 && (
                      <Button variant='secondary' onClick={handlePrev} type='button'>
                        Back
                      </Button>
                    )}
                    {step < 4 && (
                      <Button variant='primary' onClick={handleNext} type='button'>
                        Next
                      </Button>
                    )}
                    {step === 4 && (
                      <Button variant='success' type='submit' disabled={isSubmitting}>
                        Submit
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MultiStepForm
