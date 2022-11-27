import React from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { doc, updateDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { getUserId, getUserName } from "../redux/auth/authSelectors";

const Post = ({ item, navigation }) => {
  const { photo, title, place, location, id, comments, likes } = item;
  const userId = useSelector(getUserId);
  const userName = useSelector(getUserName);
  const route = useRoute();

  const addLike = async () => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    const docData = docSnap.data();
    if (docData.userId === userId) {
      alert("это ваша публикация, вы не можете ее лайкать");
      return;
    }
    const ourLike = docData.likes.find((item) => item.userId === userId);
    if (ourLike) {
      alert("вы уже лайкали эту публикацию");
      return;
    }
    await updateDoc(docRef, {
      likes: [...docData.likes, { userId, userName }],
    });
  };

  const navigateToComments = () => {
    navigation.navigate("Comments", {
      postId: id,
      photo,
    });
  };

  const navigateToMap = () => {
    navigation.navigate("Map", {
      latitude: location ? location.latitude : 0,
      longitude: location ? location.longitude : 0,
    });
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
              onPress={navigateToComments}
            />
          ) : (
            <EvilIcons
              name="comment"
              size={24}
              color="#BDBDBD"
              onPress={navigateToComments}
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
          <Text style={styles.commentsText}>{likes.length}</Text>
        </View>
        <View style={{ ...styles.iconsContainer, marginLeft: "auto" }}>
          <EvilIcons
            name="location"
            size={24}
            color="#BDBDBD"
            onPress={navigateToMap}
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
