import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from './types';
import { setAlert } from './alert';
import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';

// load user
export const loadUser = () => async dispatch => {
  try {
    // returns user by token
    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const register = user => async dispatch => {
  try {
    const res = await api.post(
      '/users',
        user
    );
    setAuthToken(res.data.token);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data});
    dispatch(setAlert('User Created', 'success'))
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    const errors = err.response && err.response.data.errors;

    if(errors) {
      errors.forEach(error => 
        dispatch(setAlert(error.msg, 'danger'))
      );
    }

    dispatch({
      type: REGISTER_FAIL 
    });
  }
};

