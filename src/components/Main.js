import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { currentUser } from "../redux/auth/authOperations";
import { getIsAuth } from "../redux/auth/authSelectors";
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import AddInfo from "./AddInfo";
import Home from "./Home";

const MainStack = createStackNavigator();

const Main = () => {
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, []);

  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuth ? (
        <>
          <MainStack.Screen name="Login" component={LoginScreen} />
          <MainStack.Screen name="Register" component={RegistrationScreen} />
        </>
      ) : (
        <>
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="AddInfo" component={AddInfo} />
        </>
      )}
    </MainStack.Navigator>
  );
};

export default Main;

