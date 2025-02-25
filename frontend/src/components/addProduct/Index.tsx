import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useMutation, useQuery } from '@tanstack/react-query'
import ProductUploadForm from './ProductUploadForm'
import PriceRuleForm from './PriceRuleForm'
import CombinationRuleForm from './CombinationRuleForm'
import { productSchema } from '../../utils/schema'
import { Shop } from '../../utils/interface/shop'
import AlertBanner from '../../presentational/AlertBanner'
import { PRODUCT_INITIAL_VALUES } from '../../utils/constants'
import { createProduct } from '../../services/createProduct'
import './Index.scss'
import { getCategories } from '../../services/category'
import { Category, CategoryWithOptions } from '../../utils/interface/category'

const Index: React.FC = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [variant, setVariant] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const { data: categories } = useQuery<CategoryWithOptions[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  })

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

  const handleSubmit = (values: Shop) => mutate(values)

  const handleNext = () => setStep((prev) => prev + 1)
  const handlePrev = () => setStep((prev) => prev - 1)

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ProductUploadForm />
      case 2:
        return <PriceRuleForm categories={categories} />
      case 3:
        return <CombinationRuleForm categories={categories} />
      default:
        return null
    }
  }

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        {message && variant && <AlertBanner variant={variant} message={message} />}
        <Col lg={6}>
          <Formik
            initialValues={PRODUCT_INITIAL_VALUES}
            validationSchema={productSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                {renderStep()}
                <div className='mt-3 d-flex justify-content-between'>
                  {(step > 1 && !values.product.not_customizable) && (
                    <Button variant='light' onClick={handlePrev} type='button'>
                      Back
                    </Button>
                  )}
                  {(step < 3 && !values.product.not_customizable) && (
                    <Button variant='light' onClick={handleNext} type='button'>
                      Next
                    </Button>
                  )}
                  {(step === 3 || values.product.not_customizable) && (
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
            )
            }
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}

export default Index
