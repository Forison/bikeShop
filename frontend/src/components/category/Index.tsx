import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useMutation } from '@tanstack/react-query'
import ProductPartOptionForm from '../category/ProductPartOptionForm'
import { categoryProductOptionSchema } from '../../utils/schema'
import { Category } from '../../utils/interface/shop'
import AlertBanner from '../../presentational/AlertBanner'
import { CATEGORY_INITIAL_VALUES } from '../../utils/constants'
import { createCategory } from '../../services/category'
import CategoryForm from './CategoryForm'
import Footer from '../../presentational/Footer'

const Index: React.FC = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [variant, setVariant] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      setVariant('success')
      setMessage('category and part added')
      setTimeout(() => { navigate('/') }, 2000)
    },
    onError: (error: Error) => {
      setVariant('danger')
      setMessage(error.message || 'category creation failed')
    },
  })

  const handleSubmit = (values: Category) => mutate(values)

  const handleNext = () => setStep((prev) => prev + 1)
  const handlePrev = () => setStep((prev) => prev - 1)

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CategoryForm />
      case 2:
        return <ProductPartOptionForm />
      default:
        return null
    }
  }

  return (
    <>
      <Container className='mt-5'>
        <Row className='justify-content-center'>
          {message && variant && <AlertBanner variant={variant} message={message} />}
          <Col lg={6} md={8} sm={9} sx={12}>
            <Formik
              initialValues={CATEGORY_INITIAL_VALUES}
              validationSchema={categoryProductOptionSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  {renderStep()}
                  <div className='mt-3 d-flex justify-content-between p-2 rounded'>
                    {step > 1 && (
                      <Button variant='light' onClick={handlePrev} type='button'>
                        Back
                      </Button>
                    )}
                    {step < 2 && (
                      <Button variant='light' onClick={handleNext} type='button'>
                        Next
                      </Button>
                    )}
                    {step === 2 && (
                      <Button
                        variant='outline-success'
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
      <Footer />
    </>
  )
}

export default Index
