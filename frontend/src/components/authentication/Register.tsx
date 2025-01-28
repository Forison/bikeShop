import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import { User } from '../../utils/interface/user'
import { registrationSchema } from '../../utils/schema'
import AlertBanner from '../../presentational/AlertBanner'


const initialValues: User = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

const Register: React.FC = () => {

  const handleSubmit = (values: User) => {
    console.log(values)
  }

  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <Row>
        <Col>
          <h2 className='text-center'>Register</h2>
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
                    name='passwordConfirmation'
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!(touched.passwordConfirmation && errors.passwordConfirmation)}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.passwordConfirmation}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant='primary' type='submit' className='mt-3'>
                  Register
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
