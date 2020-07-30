import React from 'react';
import FloatContainer from '../../../containers/FloatContainer/FloatContainer';
import useInput from '../../hooks/useInput/useInput';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ register, isAuthenticated }) => {
  const { value: name, onChange: nameOnChange } = useInput("");
  const { value: email, onChange: emailOnChange } = useInput("");
  const { value: password, onChange: passwordOnChange } = useInput("");

  async function handleSubmit(e) {
    e.preventDefault();

    register({ name, email, password });
  }

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <FloatContainer>
      <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
      <label className="form-group">
          Name:
          <input  autoComplete="new-password" type="text" value={name} onChange={nameOnChange} />
        </label>
        <label className="form-group">
          Email:
          <input  autoComplete="new-password" type="text" value={email} onChange={emailOnChange} />
        </label>
        <label className="form-group">
          Password:
          <input autoComplete="new-password" type="password" value={password} onChange={passwordOnChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </FloatContainer>
  )
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(Register);