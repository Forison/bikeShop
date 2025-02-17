import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import { User } from '../../utils/interface/user'
import { registrationSchema } from '../../utils/schema'
import AlertBanner from '../../presentational/AlertBanner'
import { setCookie } from '../../utils/helper/tokenHandler'
import { authUser } from '../../services/authUser'
import { useMutation } from '@tanstack/react-query'


const initialValues: User = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: ''
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
      setMessage('Login failed. Please try again.')
    },
  })

  const handleSubmit = (values: User) => {
    mutate(values)
  }
  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <Row>
        <Col>
          <h2 className='text-center'>Register</h2>
          {(message && variant) && <AlertBanner variant={variant} message={message} />}
          <Formik
            initialValues={initialValues}
            validationSchema={registrationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId='formName'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!(touched.name && errors.name)}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

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

                <Form.Group controlId='formRole'>
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as='select'
                    name='role'
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!(touched.role && errors.role)}
                  >
                    <option value=''>Select a role</option>
                    <option value='admin'>Admin</option>
                    <option value='customer'>Customer</option>
                  </Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    {errors.role}
                  </Form.Control.Feedback>
                </Form.Group>

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

                <Button variant='primary' type='submit' className='w-100 mt-3' disabled={isPending}>
                  {isPending ? 'Registering ...' : 'Register'}
                </Button>
                <AlertBanner
                  variant='info'
                  message={
                    // There is no security breach, this is safe
                    <div dangerouslySetInnerHTML={{ __html: "Already have an account? <a href='/login'>Sign In</a>" }} />
                  }
                />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container >
  )
}

export default Register
