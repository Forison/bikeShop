import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import { Formik } from 'formik'
import DatePicker from 'react-datepicker'
import { useMutation } from '@tanstack/react-query'
import 'react-datepicker/dist/react-datepicker.css'
import { User } from '../../utils/interface/user'
import { registrationSchema } from '../../utils/schema'
import AlertBanner from '../../presentational/AlertBanner'
import { setCookie } from '../../utils/helper/tokenHandler'
import { authUser } from '../../services/authUser'
import GoogleSignInButton from './GoogleSignInButton'

const initialValues: User = {
  last_name: '',
  first_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  date_of_birth: ''
}

const Register: React.FC = () => {
  const [variant, setVariant] = useState('')
  const [message, setMessage] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: (values: User) => authUser(values, 'api/v1/register'),
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
      setMessage('Registration failed. Please try again.')
    },
  })

  const handleSubmit = (values: User) => {
    mutate(values)
  }
  return (
    <Container fluid className='d-flex justify-content-center align-items-center mt-5 main-content'>
      <Row className='justify-content-center w-100'>
        <Col md={8} lg={4} sm={12}>
          <Card className='shadow p-4'>
            <Card.Body>
              <div className='mb-4'>
                <h2 className='fw-bold'>Sign up</h2>
                <p className='text-muted fs-6'>
                  Enter your details below to create your account and get started.
                </p>
              </div>
              {(message && variant) && <AlertBanner variant={variant} message={message} />}
              <Formik
                initialValues={initialValues}
                validationSchema={registrationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                      <Col sm={6}>
                        <Form.Group controlId='formFirstName'>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type='text'
                            name='first_name'
                            value={values.first_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!(touched.first_name && errors.first_name)}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.first_name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group controlId='formLastName'>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type='text'
                            name='last_name'
                            value={values.last_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!(touched.last_name && errors.last_name)}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.last_name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group controlId='formEmail'>
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
                      </Col>
                      <Col sm={6}>
                        <Form.Group controlId='formDateOfBirth'>
                          <Form.Label>Date of Birth</Form.Label>
                          <DatePicker
                            selected={values.date_of_birth ? new Date(values.date_of_birth) : null}
                            onChange={(date) => setFieldValue('date_of_birth', date)}
                            placeholderText='MM/DD/YYYY'
                            dateFormat='MM/dd/yyyy'
                            className='form-control'
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.date_of_birth}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group controlId='formPassword'>
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
                      </Col>
                      <Col sm={6}>
                        <Form.Group controlId='formPasswordConfirmation'>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type='password'
                            name='password_confirmation'
                            value={values.password_confirmation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!(touched.password_confirmation && errors.password_confirmation)}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.password_confirmation}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant='primary' type='submit' className='w-100 mt-3' disabled={isPending}>
                      {isPending ? 'Registering ...' : 'Register'}
                    </Button>
                    <div className='d-flex align-items-center my-3'>
                      <hr className='flex-grow-1' />
                      <span className='px-2 text-muted'>or</span>
                      <hr className='flex-grow-1' />
                    </div>
                    <GoogleSignInButton />
                    <div className='text-center mt-2'>
                      <small>
                        Already have an account?{' '}
                        <a href='/login' className='text-primary text-decoration-none'>
                          Log in
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

export default Register
