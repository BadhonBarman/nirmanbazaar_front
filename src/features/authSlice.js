import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Initial state
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload; // Update the user state
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});


export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
