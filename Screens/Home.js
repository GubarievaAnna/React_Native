import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text } from "react-native";
import PostsScreen from "./MainScreens/PostsScreen";
import CreatePostsScreen from "./MainScreens/CreatePostsScreen";
import ProfileScreen from "./MainScreens/ProfileScreen";
import { useAuthContext } from "../hooks/useAuthContext";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const { setIsAuth } = useAuthContext();

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="grid-outline"
              style={{ marginLeft: 70 }}
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          ),
          headerShown: false,
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.iconAdd}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
          ),
          title: "Создать публикацию",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomWidth: 1,
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
                navigation.navigate("Posts");
              }}
            />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="user"
              style={{ marginRight: 70 }}
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          ),
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  iconAdd: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});
