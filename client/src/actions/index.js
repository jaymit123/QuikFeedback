import axios from "axios";
import { FETCH_USER, LOGOUT_USER, FETCH_SURVEYS_USER } from './types';

//Fetch current user dtails
export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const logoutUser = () => async dispatch => {
  await axios.get('/api/logout');
  dispatch({ type: LOGOUT_USER, payload: '' });
};

//sends stripe payment token to be handled by api
export const handlePaymentToken = token => async dispatch => {
  const response = await axios.post('/api/payment', token);
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const response = await axios.post('/api/surveys', values);
  history.push('/surveys')
  dispatch({ type: FETCH_USER, payload: response.data });
}

//
export const fetchSurveys = () => async  dispatch => {
  const response = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS_USER, payload: response.data });
}