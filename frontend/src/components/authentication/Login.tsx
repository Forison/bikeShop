import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import { User } from '../../utils/interface/user'
import { LoginValidationSchema } from '../../utils/schema'
import AlertBanner from '../../presentational/AlertBanner'


const initialValues: User = {
  email: '',
  password: '',
}

const Login: React.FC = () => {

  const handleSubmit = (values: User) => {
    console.log(values)
  }

  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <Row>
        <Col md={12}>
          <>
            <h2 className='text-center'>Login</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
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

                  <Button variant='primary' type='submit' className='mt-3'>
                    Login
                  </Button>
                  <AlertBanner
                    variant='info'
                    message={
                      // There is no security threat here, this is safe
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
