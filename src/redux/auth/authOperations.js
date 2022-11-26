import { createAsyncThunk } from "@reduxjs/toolkit";
import {auth} from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const { login, email, password } = userData;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: login,
      });

      const { uid, email: userEmail, displayName } = user;

      return {
        name: displayName,
        userId: uid,
        email: userEmail,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const { email, password } = userData;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, email: userEmail, displayName } = userCredential.user;

      return {
        name: displayName,
        userId: uid,
        email: userEmail,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await signOut(auth);
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// export const currentUser = createAsyncThunk("auth/current", async (_, thunkApi) => {
//   try {
//     let object;
//     await onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const name = user.displayName;
//         const email = user.email;
//         const userId = user.uid;
//         object = { name, email, userId, isAuth: true };
//         return;
//       } object = { name: '', email: "", userId: "", isAuth: false};
//     });
// return object;
//   } catch (error) {
//     return thunkApi.rejectWithValue(error.message);
//   }
// });
