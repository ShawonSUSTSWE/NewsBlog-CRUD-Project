import { configureStore, createSlice } from "@reduxjs/toolkit";

let log = false;

if (localStorage.getItem("token") !== "") {
  log = true;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: log },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.setItem("token", "");
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
