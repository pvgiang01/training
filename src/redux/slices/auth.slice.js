import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
  accessToken: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  //đối tượng chứa các reducer để xử lí các action trong slice
  reducers: {
    setUser: (state, action) => {
      state.isSignedIn = true;
      state.accessToken = action.payload;
    },
    logout: () => initialState,
  },
});
export const {setUser,logout} = authSlice.actions
export default authSlice.reducer
//reducer xử lí các action(setUser,logout)
// const {reducer, actions} = authSlice;
// export const {setUser, logout} = actions;
// export default reducer;
