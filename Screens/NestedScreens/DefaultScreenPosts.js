import React from "react";
import { View, FlatList, Image, Text, StyleSheet } from "react-native";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import Item from "../../components/Item";
import photo from "../../assets/images/photo_bg.png";

const DefaultScreenPosts = ({ navigation }) => {
  const { posts } = usePostsContext();
  const { authInfo } = useAuthContext();

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={photo} style={styles.img} />
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{authInfo.login}</Text>
          <Text style={styles.textEmail}>{authInfo.email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
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
