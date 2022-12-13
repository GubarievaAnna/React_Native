import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { logoutUser } from "../../redux/auth/authOperations";
import DefaultScreenPosts from "../NestedScreens/DefaultScreenPosts";
import CommentsScreen from "../NestedScreens/CommentsScreen";
import MapScreen from "../NestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreenPosts"
        component={DefaultScreenPosts}
        options={{
          ...headerOptions,
          title: "Публикации",
          headerRight: () => (
            <Ionicons
              name="exit-outline"
              style={{ marginRight: 21 }}
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              onPress={() => dispatch(logoutUser())}
            />
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          ...headerOptions,
          title: "Комментарии",
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              style={{ marginLeft: 20 }}
              size={24}
              color="black"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          ...headerOptions,
          title: "Карта",
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              style={{ marginLeft: 20 }}
              size={24}
              color="black"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;

const headerOptions = {
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
};
