import React, { useState, FormEvent, useContext } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
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
  const { register, errMsg2, errEmail, errPassword } = useContext(AuthContext)
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
    <div>
      {(errMsg2) && (
        <Alert key={'warning'} variant={'warning'}>
        {errMsg2}
      </Alert>
      )}
      <h1>Register</h1>
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
            {(errEmail.length >= 0) &&
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
         {(errPassword.length >= 0) && (
           errPassword.map((errMessage) => (
        <p key='errPassword' style={{ color: 'red' }}>
       {errMessage}
        </p>
           )))}
      </Form.Group>
        <Button variant="primary" type="submit" data-testid="registration-submit-button">
        Submit
      </Button>
      </Form>
      <p>Already have an account?</p>
      <Link to="/login">Login here</Link>
    </div>
  )
}
