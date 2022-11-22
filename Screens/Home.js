import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import PostsScreen from "./MainScreens/PostsScreen";
import CreatePostsScreen from "./MainScreens/CreatePostsScreen";
import ProfileScreen from "./MainScreens/ProfileScreen";
import { PostsContext } from "../hooks/usePostsContext";

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      <MainTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <MainTab.Screen
          name="Posts"
          component={PostsScreen}
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
        />
        <MainTab.Screen
          name="Create"
          component={CreatePostsScreen}
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
        />
        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
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
        />
      </MainTab.Navigator>
    </PostsContext.Provider>
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
