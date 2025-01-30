import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import { User } from '../../utils/interface/user'
import { registrationSchema } from '../../utils/schema'
import AlertBanner from '../../presentational/AlertBanner'


const initialValues: User = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  role: ''
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [variant, setVariant] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (values: User) => {
    fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: values }),
    })
      .then(response => response.json())
      .then(() => {
        setMessage('Registration successful, login now')
        setVariant('success')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      })
      .catch((error) => {
        setMessage('OOps! something went wrong try again')
        setVariant('danger')
        console.error('Error:', error)
      })
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
