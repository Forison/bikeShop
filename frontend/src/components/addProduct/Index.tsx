import React, { useState } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useMutation } from '@tanstack/react-query'
import ProductUploadForm from './ProductUploadForm'
import ProductPartOptionForm from './ProductPartOptionForm'
import PriceRuleForm from './PriceRuleForm'
import CombinationRuleForm from './CombinationRuleForm'
import { combinedValidationSchema } from '../../utils/schema'
import { Shop } from '../../utils/interface/shop'
import NavBar from '../productDetails/NavBar'
import AlertBanner from '../../presentational/AlertBanner'
import { PRODUCT_INITIAL_VALUES } from '../../utils/constants'
import { createProduct } from '../../services/createProduct'
import './Index.scss'

const Index: React.FC = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [variant, setVariant] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      setVariant('success')
      setMessage('A new product has been added')
      setTimeout(() => {
        setVariant('')
        setMessage('')
        navigate('/')
      }, 2000)
    },
    onError: (error: Error) => {
      setVariant('danger')
      setMessage(error.message || 'Product creation failed')
    },
  })

  const handleSubmit = (values: Shop, actions: FormikHelpers<Shop>) => mutate(values)

  const handleNext = () => setStep((prev) => prev + 1)
  const handlePrev = () => setStep((prev) => prev - 1)

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
          {message && variant && <AlertBanner variant={variant} message={message} />}
          <Col lg={6}>
            <Formik
              initialValues={PRODUCT_INITIAL_VALUES}
              validationSchema={combinedValidationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
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
                      <Button
                        variant='success'
                        type='submit'
                        disabled={isPending}
                      >
                        {isPending ? 'Submitting...' : 'Submit'}
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

export default Index
