import React, { useState } from 'react'
import axios from 'axios'

export default function LoginRegister() {

  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })

  function handleInput(e) {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  function handleLogin() {
    const { email, password } = state
    axios.post('/api/auth/login', { email, password })
  }

  function handleRegister() {
    const { name, email, password } = state
    axios.post('/api/auth/register', { name, email, password })
  }

  return (
    <div>
      <div>
        <form >
          <input
            placeholder='Name'
            type='name'
            name='name'
            onChange={(e) => handleInput(e)}
          />
          <input
            placeholder='Email'
            type='email'
            name='email'
            onChange={(e) => handleInput(e)}
          />
          <input
            placeholder='Password'
            type='password'
            name='password'
            onChange={(e) => handleInput(e)} />
        </form>
      </div>
      <div>
        <button onClick={() => handleLogin()}>Login</button>
        <button onClick={() => handleRegister()}>Register</button>
      </div>
      <p>LoginRegister</p>
    </div>
  )
}