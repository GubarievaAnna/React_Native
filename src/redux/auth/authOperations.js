import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
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
      const { login, email, password, photo } = userData;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: login,
        photoURL: photo,
      });

      const { uid, email: userEmail, displayName, photoURL } = user;

      return {
        name: displayName,
        userId: uid,
        email: userEmail,
        photo: photoURL,
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
      const {
        uid,
        email: userEmail,
        displayName,
        photoURL,
      } = userCredential.user;

      return {
        name: displayName,
        userId: uid,
        email: userEmail,
        photo: photoURL,
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

export const currentUser = createAsyncThunk(
  "auth/current",
  async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve({
            userId: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            isAuth: true,
          });
        } else {
          resolve({
            userId: "",
            name: "",
            email: "",
            photo: "",
            isAuth: false,
          });
        }
      });
    });
  }
);
