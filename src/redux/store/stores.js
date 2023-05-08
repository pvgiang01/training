import {createStore} from 'redux';

const initialAuth = {
  isSigned: false,
  accessToken: '',
};

function loginReducer(state = {isSigned: false, accessToken: ''}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        isSigned: (state.isSigned = true),
        accessToken: (state.accessToken = accessToken),
      };
    case 'LOGIN_FAILED':
      return {
        isSigned: (state.isSigned = false),
        accessToken: (state.accessToken = ''),
      };
    default:
      return state;
  }
}
const store = createStore(loginReducer)
