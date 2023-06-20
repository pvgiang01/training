import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  //đối tượng chứa các reducer để xử lí các action trong slice
  reducers: {
    setUser: (state, action) => {
      state = {
        ...state,
        isSignedIn: false,
        ...action.payload,
      };
      return state;
    },
    logout: () => initialState,
  },
});
export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;
//reducer xử lí các action(setUser,logout)
// const {reducer, actions} = authSlice;
// export const {setUser, logout} = actions;
// export default reducer;
