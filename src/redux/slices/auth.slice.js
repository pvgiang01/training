import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
  accessToken: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.isSignedIn = true;
      state.accessToken = action.payload;
    },
    logout: () => initialState,
  },
});
const {reducer, actions} = authSlice;
export const {setUser, logout} = actions;
export default reducer;
