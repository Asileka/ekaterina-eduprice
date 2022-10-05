import React, { FormEvent, useContext, useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
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
      <form
        noValidate
        data-testid="login-form"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={values.email}
            type="email"
            name="email"
            id="email"
            data-testid="login-input-email"
            disabled={loginRequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            type="password"
            name="password"
            id="password"
            data-testid="login-input-password"
            disabled={loginRequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={loginRequestStatus === 'loading'}
        >
          {loginRequestStatus === 'loading' ? 'Loading...' : 'Submit'}
        </button>
      </form>
      <p>New here?</p>
      <Link to="/register">Please register</Link>
    </div>
  )
}
