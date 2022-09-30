import React, { useState, FormEvent, useContext } from 'react'

import { AuthContext } from '../../context/AuthContext'
export function Register () {
  function initialFormValues () {
    return {
      email: '',
      password: ''
    }
  }
  const [values, setValues] = useState(initialFormValues)
  const { register, errMsg } = useContext(AuthContext)
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
       <p>{errMsg}</p>
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
        <button
          type="submit"
          data-testid="registration-submit-button"
          disabled= {false}
        >
         Submit
        </button>
      </form>
    </div>
  )
}
