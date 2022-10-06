import React, { FormEvent, useContext, useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

function initialFormValues () {
  return {
    email: '',
    password: ''
  }
}

export function Login () {
  const [values, setValues] = useState(initialFormValues)
  const [loginRequestStatus, setLoginRequestStatus] = useState('success')
  const { signIn, errMsg } = useContext(AuthContext)

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    })
  }

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()

    setLoginRequestStatus('loading')

    await signIn(values)

    setLoginRequestStatus('success')
  }

  useEffect(() => {
    // clean the function to fix memory leak
    return () => setLoginRequestStatus('success')
  }, [])

  return (
    <div>
      <div>
        <h1>Welcome back!</h1>
        <p>You can sign in with your existing account</p>
      </div>
      <div>
        {(errMsg) && (
        <Alert key={'warning'} variant={'warning'}>
        {errMsg}
      </Alert>
        )}
      </div>
      <Form
        noValidate
        data-testid="login-form"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="emailForm">
        <Form.Label>Email address</Form.Label>
        <Form.Control
        type="email"
        placeholder="email"
        name="email"
        data-testid="login-input-email"
        disabled={loginRequestStatus === 'loading'}
        value={values.email}
        onChange={handleChange}/>
      </Form.Group>
        <Form.Group className="mb-3" controlId="passwordForm">
        <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        placeholder="password"
        name="password"
        data-testid="login-input-password"
        disabled={loginRequestStatus === 'loading'}
        value={values.password}
        onChange={handleChange}/>
      </Form.Group>
        <Button variant="primary" type="submit" data-testid="login-submit-button"
          disabled={loginRequestStatus === 'loading'}>
        {loginRequestStatus === 'loading' ? 'Loading...' : 'Submit'}
      </Button>
      </Form>
      <p>New here?</p>
      <Link to="/register">Please register</Link>
    </div>
  )
}
