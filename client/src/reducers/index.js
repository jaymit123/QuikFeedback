import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer'
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    surveys: surveysReducer,
    form: formReducer
});