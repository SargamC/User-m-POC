
import { combineReducers } from 'redux';
import userReducer from './usersSlice';

const rootReducer = combineReducers({
  user: userReducer,
  
});

export default rootReducer;
