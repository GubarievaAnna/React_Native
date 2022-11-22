import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { AuthContext } from "./hooks/useAuthContext";
import RobotoRegular from "./assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "./assets/fonts/Roboto-Medium.ttf";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";
import Home from "./Screens/Home";

const MainStack = createStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": RobotoRegular,
    "Roboto-Medium": RobotoMedium,
  });
};

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ setIsAuth }}>
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuth ? (
            <>
              <MainStack.Screen name="Login" component={LoginScreen} />
              <MainStack.Screen
                name="Register"
                component={RegistrationScreen}
              />
            </>
          ) : (
            <MainStack.Screen name="Home" component={Home} />
          )}
        </MainStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
