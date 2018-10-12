import {GET_ERRORS} from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

// register user
export const registerUser = (userData,history) => dispatch => {
    axios
      .post('/api/users/register', userData)
      .then(res => history.push('/login'))
      .catch(err => dispatch({
          type: GET_ERRORS,
          payload: err.response.data
      }));
}

// login. get user token

export const loginUser = (userData) => dispatch =>{
    axios.post('/api/users/login', userData)
        .then(res=>{
            // Save to localStorage
            const { token } = res.data;
            // Set token to localStorage
            localStorage.getItem('jwtToken',token);
            // Set token to Auth header
            setAuthToken(token);
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data})
        );
}