import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

//Register user
export const registerUser = (userData, history) => dispatch => {
  //POST newUser data
  //use axios to connect with backend
  axios
    .post('api/users/register', userData)

    //if successful then take to login form
    .then(res => history.push('/login'))

    //redux thunk allows us to dispatch during an asynchronous call
    //on error we dispatch GET_ERRORS action
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//login user
export const loginUser = userData => dispatch => {
  axios
    .post('api/users/login', userData)
    .then(res => {
      //save to local storage
      const { token } = res.data;

      //set token to local storage
      localStorage.setItem('jwtToken', token);

      //set token to auth header
      setAuthToken(token);

      //decode token to get user data
      const decoded = jwt_decode(token);

      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//logout user
export const logoutUser = () => dispatch => {
  //remove token from localstorage
  localStorage.removeItem('jwtToken');
  //remove auth header for future requests
  setAuthToken(false);
  //set the current user to {} which will set isAutenticated to false
  dispatch(setCurrentUser({}));
};
