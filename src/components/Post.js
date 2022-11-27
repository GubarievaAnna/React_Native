import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Post = ({ item, navigation }) => {
  const { photo, title, place, location, id, comments, likes } = item;
  const route = useRoute();

  const addLike = async () => {
    if (route.name === "Profile") {
      alert("это ваша публикация, возможность лайкать отсутствует");
      return;
    }
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, { likes: likes + 1 });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.img} />
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          ...styles.iconsContainer,
          justifyContent: "flex-start",
        }}
      >
        <View style={styles.iconsContainer}>
          {route.name === "Profile" ? (
            <FontAwesome
              name="comment"
              size={24}
              color="#FF6C00"
              onPress={() => {
                navigation.navigate("Comments", {
                  postId: id,
                  photo,
                  comments,
                });
              }}
            />
          ) : (
            <EvilIcons
              name="comment"
              size={24}
              color="#BDBDBD"
              onPress={() => {
                navigation.navigate("Comments", {
                  postId: id,
                  photo,
                  comments,
                });
              }}
            />
          )}
          <Text style={styles.commentsText}>{comments}</Text>
        </View>
        <View style={{ ...styles.iconsContainer, marginLeft: 24 }}>
          <AntDesign
            name="like2"
            size={20}
            color={route.name === "Profile" ? "#FF6C00" : "#BDBDBD"}
            onPress={addLike}
          />
          <Text style={styles.commentsText}>{likes}</Text>
        </View>
        <View style={{ ...styles.iconsContainer, marginLeft: "auto" }}>
          <EvilIcons
            name="location"
            size={24}
            color="#BDBDBD"
            onPress={() => {
              navigation.navigate("Map", {
                latitude: location ? location.latitude : 0,
                longitude: location ? location.longitude : 0,
              });
            }}
          />
          <Text style={styles.placeText}>{place}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  img: { width: "100%", height: 240, borderRadius: 8, marginBottom: 8 },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  commentsText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 6,
  },
  placeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
    marginLeft: 4,
  },
});

export default Post;
