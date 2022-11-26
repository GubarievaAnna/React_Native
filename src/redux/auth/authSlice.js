import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
} from "./authOperations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: "",
    name: "",
    email: "",
    photo: "",
    isAuth: false,
    error: "",
  },
  reducers: {
    changeError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { userId, name, email } = payload;
        state.id = userId;
        state.name = name;
        state.email = email;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { userId, name, email } = payload;
        state.id = userId;
        state.name = name;
        state.email = email;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.id = "";
        state.name = "";
        state.email = "";
        state.isAuth = false;
      });
  },
  // [currentUser.fulfilled]: (state, { payload }) => {
  //   const {userId, name, email, isAuth} = payload;
  //   state.id = userId;
  //   state.name = name;
  //   state.email = email;
  //   state.isAuth = isAuth;
  // },
  // }
});

export const { changeError, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
