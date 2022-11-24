import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { AuthContext } from "./src/hooks/useAuthContext";
import RobotoRegular from "./src/assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "./src/assets/fonts/Roboto-Medium.ttf";
import RobotoBold from "./src/assets/fonts/Roboto-Bold.ttf";
import RegistrationScreen from "./src/Screens/Auth/RegistrationScreen";
import LoginScreen from "./src/Screens/Auth/LoginScreen";
import Home from "./src/Screens/Home";

const MainStack = createStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": RobotoRegular,
    "Roboto-Medium": RobotoMedium,
    "Roboto-Bold": RobotoBold,
  });
};

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authInfo, setAuthInfo] = useState(null);

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
    <AuthContext.Provider value={{ setIsAuth, authInfo, setAuthInfo }}>
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
