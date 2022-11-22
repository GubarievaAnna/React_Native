import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useAuthContext } from "../../hooks/useAuthContext";
import DefaultScreenPosts from "../NestedScreens/DefaultScreenPosts";
import CommentsScreen from "../NestedScreens/CommentsScreen";
import MapScreen from "../NestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  const { setIsAuth } = useAuthContext();

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreenPosts"
        component={DefaultScreenPosts}
        options={{
          title: "Публикации",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            color: "#212121",
          },
          headerRight: () => (
            <Ionicons
              name="exit-outline"
              style={{ marginRight: 21 }}
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              onPress={() => setIsAuth(false)}
            />
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            color: "#212121",
          },
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              style={{ marginLeft: 20 }}
              size={24}
              color="black"
              onPress={() => {
                navigation.navigate("DefaultScreenPosts");
              }}
            />
          ),
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            color: "#212121",
          },
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              style={{ marginLeft: 20 }}
              size={24}
              color="black"
              onPress={() => {
                navigation.navigate("DefaultScreenPosts");
              }}
            />
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
