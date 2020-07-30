import React from 'react'
import FloatContainer from '../../../containers/FloatContainer/FloatContainer'
import useInput from '../../hooks/useInput/useInput'
import { Link } from 'react-router-dom';

const Login = () => {
  const { value: emailValue, onChange: emailOnChange } = useInput("");
  const { value: passwordValue, onChange: passwordOnChange } = useInput("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <FloatContainer>
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-group">
          Email:
          <input type="text" value={emailValue} onChange={emailOnChange} />
        </label>
        <label className="form-group">
          Password:
          <input type="text" value={passwordValue} onChange={passwordOnChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </FloatContainer>
  )
}

export default Login
