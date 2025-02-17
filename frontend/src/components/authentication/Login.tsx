import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { User } from '../../utils/interface/user'
import { LoginValidationSchema } from '../../utils/schema'
import { setCookie } from '../../utils/helper/tokenHandler'
import { authUser } from '../../services/authUser'
import AlertBanner from '../../presentational/AlertBanner'

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
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Col md={12}>
          <>
            <h2 className="text-center">Login</h2>
            {(message && variant) && <AlertBanner variant={variant} message={message} />}
            <Formik
              initialValues={initialValues}
              validationSchema={LoginValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!(touched.email && errors.email)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!(touched.password && errors.password)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isPending}>
                    {isPending ? 'Logging in...' : 'Login'}
                  </Button>
                  <AlertBanner
                    variant="info"
                    message={
                      <div dangerouslySetInnerHTML={{ __html: "Don't have an account? <a href='/register'>Sign Up</a>" }} />
                    }
                  />
                </Form>
              )}
            </Formik>
          </>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
