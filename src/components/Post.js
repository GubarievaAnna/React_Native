import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { getUserId, getUserName } from "../redux/auth/authSelectors";
import Modal from "./Modal";

const Post = ({ item, navigation }) => {
  const {
    photo,
    photoId,
    title,
    place,
    location,
    id,
    comments,
    likes,
    userId: itemUserId,
  } = item;
  const [showModal, setShowModal] = useState(false);
  const userId = useSelector(getUserId);
  const userName = useSelector(getUserName);
  const route = useRoute();

  const userLike = useMemo(
    () => likes.find((item) => item.userId === userId),
    [likes]
  );

  const addLike = async () => {
    if (itemUserId === userId) {
      alert("Это ваша публикация, вы не можете ее лайкать");
      return;
    }

    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      const ourLike = docData.likes.find((item) => item.userId === userId);
      if (ourLike) {
        await updateDoc(docRef, {
          likes: docData.likes.filter((item) => item.userId !== userId),
        });
        return;
      }
      await updateDoc(docRef, {
        likes: [...docData.likes, { userId, userName }],
      });
    } catch (error) {
      console.log(error);
    }
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
      {showModal && (
        <Modal setShowModal={setShowModal} id={id} photoId={photoId} />
      )}
      <Image source={{ uri: photo }} style={styles.img} />
      {route.name === "Profile" && (
        <AntDesign
          name="closecircleo"
          size={20}
          color="#FF6C00"
          style={styles.btnDelete}
          onPress={() => setShowModal(true)}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          ...styles.iconsContainer,
          justifyContent: "flex-start",
        }}
      >
        <View style={styles.iconsContainer}>
          {comments > 0 ? (
            <View style={styles.transform}>
              <FontAwesome
                name="comment"
                size={20}
                color="#FF6C00"
                style={styles.icon}
                onPress={navigateToComments}
              />
            </View>
          ) : (
            <View style={styles.transform}>
              <FontAwesome
                name="comment-o"
                size={20}
                color="#FF6C00"
                style={styles.icon}
                onPress={navigateToComments}
              />
            </View>
          )}
          <Text style={styles.commentsText}>{comments}</Text>
        </View>
        <View style={{ ...styles.iconsContainer, marginLeft: 24 }}>
          {!userLike ? (
            <AntDesign
              name="like2"
              size={20}
              color="#FF6C00"
              onPress={addLike}
            />
          ) : (
            <AntDesign
              name="like1"
              size={20}
              color="#FF6C00"
              onPress={addLike}
            />
          )}
          <Text style={styles.commentsText}>{likes.length}</Text>
        </View>
        <View style={{ ...styles.iconsContainer, marginLeft: "auto" }}>
          <EvilIcons
            name="location"
            size={24}
            color="#FF6C00"
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
    position: "relative",
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
  icon: {
    transform: [{ scaleX: -1 }],
  },
  btnDelete: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default Post;
