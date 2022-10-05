import React, { useState, FormEvent, useContext } from 'react'
import Alert from 'react-bootstrap/Alert'
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
      <form
        noValidate
        data-testid="registration-form"
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
            onChange={handleChange}
          />
        </div>
        <div>
        {(errEmail.length >= 0) &&
          errEmail.map((errMessage) => (
              <Alert key='danger' variant='danger'>
              {errMessage}
              </Alert>
          ))
      }
      </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            type="password"
            name="password"
            id="password"
            data-testid="login-input-password"
            onChange={handleChange}
          />
        </div>
        <div>
        {(errPassword.length >= 0) && (
          errPassword.map((errMessage) => (
        <Alert key='danger' variant='danger'>
       {errMessage}
        </Alert>
          )))}
      </div>
        <button
          type="submit"
          data-testid="registration-submit-button"
          disabled= {false}
        >
         Submit
        </button>
      </form>
      <p>Already have an account?</p>
      <Link to="/login">Login here</Link>
    </div>
  )
}
