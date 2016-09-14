import { combineReducers } from 'redux';
import form from './form';
import data from './data';


const reducers = combineReducers({
  // ...
  form,
  data,
});

export default reducers;
