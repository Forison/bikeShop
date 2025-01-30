import React, { useState } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import ProductUploadForm from './ProductUploadForm'
import ProductPartOptionForm from './ProductPartOptionForm'
import PriceRuleForm from './PriceRuleForm'
import CombinationRuleForm from './CombinationRuleForm'
import { combinedValidationSchema } from '../../utils/schema'
import { Shop } from '../../utils/interface/shop'
import NavBar from '../productDetails/NavBar'
import { getCookie } from '../../utils/helper/tokenHandler'
import './Index.scss'
import AlertBanner from '../../presentational/AlertBanner'

const initialValues: Shop = {
  product: {
    id: 0,
    name: '',
    category: '',
    description: '',
    base_price: 0,
    quantity: 0
  },
  product_parts: [{
    name: '',
    part_options: [{ name: '', price: 0, quantity: 0 }],
  }],
  price_rule: {
    part_option: [
      {
        condition_key: '',
        condition_value: '',
        price_modifier: 0,
      },
    ],
  },
  combination_rule: {
    prohibited_options: [{
      part: '',
      option: ''
    }],
  },
}

const Index: React.FC = () => {
  const navigate = useNavigate()
  const [variant, setVariant] = useState('')
  const [message, setMessage] = useState('')
  const [step, setStep] = useState(1)

  const handleNext = () => setStep((prev) => prev + 1)
  const handlePrev = () => setStep((prev) => prev - 1)

  const handleSubmit = (values: Shop, actions: FormikHelpers<Shop>) => {
    fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie()}`
      },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(() => {
        setVariant('success')
        setMessage('A new product has been added')
        setTimeout(() => {
          setVariant('')
          setMessage('')
          navigate('/')
        }, 2000)
      })
      .catch((error) => {
        console.log(error)
        setVariant('product creation failed')
        setMessage('danger')
      })
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
          {(message && variant) && <AlertBanner variant={variant} message={message} />}
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
                      <Button variant='success' type='submit'>
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

export default Index
