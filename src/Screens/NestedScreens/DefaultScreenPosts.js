import React from "react";
import { useSelector } from "react-redux";
import { View, FlatList, Image, Text, StyleSheet } from "react-native";
import { usePostsContext } from "../../hooks/usePostsContext";
import {getUserEmail, getUserName} from "../../redux/auth/authSelectors";
import Post from "../../components/Post";

const DefaultScreenPosts = ({ navigation }) => {
  const { posts } = usePostsContext();
  const email = useSelector(getUserEmail);
  const name = useSelector(getUserName);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {/* {authInfo.photo ? (
          <Image source={{uri:authInfo.photo}} style={styles.img} />
        ) : (
          <View style={{ ...styles.img, backgroundColor: "#F6F6F6" }}></View>
        )} */}
        <View style={{ ...styles.img, backgroundColor: "#F6F6F6" }}></View>
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{name}</Text>
          <Text style={styles.textEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Post item={item} navigation={navigation} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  infoContainer: { display: "flex", flexDirection: "row", marginBottom: 32 },
  textContainer: { justifyContent: "center", marginLeft: 8 },
  img: { width: 60, height: 60, borderRadius: 16 },
  textName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  textEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});

export default DefaultScreenPosts;
