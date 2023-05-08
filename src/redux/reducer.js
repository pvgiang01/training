import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  //authReducer quản lí tthai của ng dùng
});

export default rootReducer;


