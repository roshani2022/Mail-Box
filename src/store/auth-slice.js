import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated:!!localStorage.getItem("user"),
  token:localStorage.getItem("user"),
 email:localStorage.getItem("userEmail")
};


const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.idToken;
      state.email = action.payload.email
      state.isAuthenticated =true;
      localStorage.setItem("user", action.payload.idToken);
      localStorage.setItem("userEmail", action.payload.email);

      
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.email=null;
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail")

      
    },
    setLogin(state) {
      state.isAuthenticated = !state.isAuthenticated;
    },

  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
