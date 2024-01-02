import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated:true,
  token:"",
  
};


const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.idToken;
      state.isAuthenticated =true;
      localStorage.setItem("user", action.payload.idToken);
      
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      
      
    },
    setLogin(state) {
      state.isAuthenticated = !state.isAuthenticated;
    },

  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
