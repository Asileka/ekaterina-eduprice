import React, { useState, FormEvent, useContext } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
export function Register () {
  function initialFormValues () {
    return {
      email: '',
      password: ''
    }
  }
  const [values, setValues] = useState(initialFormValues)
  const { register, errMsg2, errEmail, errPassword, successMsg } = useContext(AuthContext)
  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    })
  }
  async function handleSubmit (e: FormEvent) {
    e.preventDefault()

    await register(values)
  }
  return (
    <Row className="align-items-center">
      <Col lg="7">
      <div className="text-center">
          <h1 style={{ fontSize: '3em' }}>Create a free account</h1>
          <p style={{ color: 'gray' }}>And get access to all the user metrics straight away!</p>
        </div>
        </Col>
        <Col lg="5" className="mt-5">
        <Card body>
        <h3>Register</h3>
      {(errMsg2) && (
        <Alert key={'warning'} variant={'warning'}>
        {errMsg2}
      </Alert>
      )}
       {(successMsg) && (
        <Alert key={'success'} variant={'success'}>
        {successMsg}
      </Alert>
       )}
      <Form
        noValidate
        data-testid="registration-form"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="emailForm">
        <Form.Label>Email address</Form.Label>
        <Form.Control
      value={values.email}
            type="email"
            placeholder="email"
            name="email"
            data-testid="registration-input-email"
            onChange={handleChange}
            />
            {(errEmail && errEmail.length >= 0) &&
          errEmail.map((errMessage) => (
              <p key='errEmail' style={{ color: 'red' }}>
              {errMessage}
              </p>
          ))
      }
      </Form.Group>
        <Form.Group className="mb-3" controlId="passwordForm">
        <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        placeholder="password"
        name="password"
        data-testid="registration-input-password"
        value={values.password}
        onChange={handleChange}
        />
         {(errPassword && errPassword.length >= 0) && (
           errPassword.map((errMessage) => (
        <p key='errPassword' style={{ color: 'red' }}>
       {errMessage}
        </p>
           )))}
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="primary" type="submit" data-testid="registration-submit-button">
        Submit
      </Button>
      </div>
      </Form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
      </Card>
      </Col>
    </Row>
  )
}
