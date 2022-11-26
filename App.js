import React, { useState } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import RobotoRegular from "./src/assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "./src/assets/fonts/Roboto-Medium.ttf";
import RobotoBold from "./src/assets/fonts/Roboto-Bold.ttf";
import { store } from "./src/redux/store";
import Main from "./src/components/Main";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": RobotoRegular,
    "Roboto-Medium": RobotoMedium,
    "Roboto-Bold": RobotoBold,
  });
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

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
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
