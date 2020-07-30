import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, type, timeout = 6000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id }
  });

  // remove alert after 5 seconds
  setTimeout(() => dispatch({
    type: REMOVE_ALERT,
    payload: id
  }), timeout);
}