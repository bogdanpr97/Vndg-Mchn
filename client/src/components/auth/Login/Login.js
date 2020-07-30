import React from 'react'
import FloatContainer from '../../../containers/FloatContainer/FloatContainer'
import useInput from '../../hooks/useInput/useInput'
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { login } from '../../../actions/auth';
 
const Login = ({ login, isAuthenticated }) => {
  const { value: email, onChange: emailOnChange } = useInput("");
  const { value: password, onChange: passwordOnChange } = useInput("");

  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password });
  }

  if(isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <FloatContainer>
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-group">
          Email:
          <input autoComplete="new-password" type="text" value={email} onChange={emailOnChange} />
        </label>
        <label className="form-group">
          Password:
          <input autoComplete="new-password" type="password" value={password} onChange={passwordOnChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </FloatContainer>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
