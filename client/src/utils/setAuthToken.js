import axios from 'axios';

//add token to requests if it exists, otherwise remove
const setAuthToken = token => {
  if (token) {
    //apply to ever request if there is a token
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //delete auth header if no token
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
