import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import { Formik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { User } from '../../utils/interface/user'
import { LoginValidationSchema } from '../../utils/schema'
import { setCookie } from '../../utils/helper/tokenHandler'
import { authUser } from '../../services/authUser'
import AlertBanner from '../../presentational/AlertBanner'
import GoogleSignInButton from './GoogleSignInButton'

const initialValues: User = {
  email: '',
  password: '',
}

const Login: React.FC = () => {
  const [variant, setVariant] = useState('')
  const [message, setMessage] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: (values: User) => authUser(values, 'api/v1/login'),
    onSuccess: (data) => {
      setCookie(data.user.token)
      setMessage('Login successful')
      setVariant('success')
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    },
    onError: () => {
      setVariant('danger')
      setMessage('Login failed. Please try again.')
    },
  })

  const handleSubmit = (values: User) => {
    mutate(values)
  }

  return (
    <Container fluid className='d-flex justify-content-center align-items-center mt-5'>
      <Row className='justify-content-center w-100'>
        <Col md={6} lg={4} sm={12}>
          <Card className='shadow p-4'>
            <Card.Body>
              <div className='text-center mb-4'>
                <h2 className='fw-bold'>Welcome Back! 👋</h2>
                <p className='text-muted fs-6'>
                  We're excited to see you again. <br /> Please login to continue.
                </p>
              </div>

              {/* Alert Banner */}
              {(message && variant) && <AlertBanner variant={variant} message={message} />}

              <GoogleSignInButton />

              {/* Divider */}
              <div className='d-flex align-items-center my-3'>
                <hr className='flex-grow-1' />
                <span className='px-2 text-muted'>or</span>
                <hr className='flex-grow-1' />
              </div>

              {/* Login Form */}
              <Formik
                initialValues={initialValues}
                validationSchema={LoginValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId='formEmail' className='mb-3'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type='email'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!(touched.email && errors.email)}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='formPassword' className='mb-3'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!(touched.password && errors.password)}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className='d-flex justify-content-between align-items-center mb-3'>
                      <a href='/forgot-password' className='text-decoration-none small'>
                        Forgot password?
                      </a>
                    </div>

                    <Button variant='primary' type='submit' className='w-100 mb-3' disabled={isPending}>
                      {isPending ? 'Logging in...' : 'Login'}
                    </Button>

                    <div className='text-center'>
                      <small>
                        Don’t have an account?{' '}
                        <a href='/register' className='text-primary text-decoration-none'>
                          Sign Up
                        </a>
                      </small>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
