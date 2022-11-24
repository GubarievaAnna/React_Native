import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Post = ({ item, navigation }) => {
  const { photo, title, place, location, comments } = item;
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Image source={{uri:photo}} style={styles.img} />
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
                navigation.navigate("Comments", { photo, title, comments });
              }}
            />
          ) : (
            <EvilIcons
              name="comment"
              size={24}
              color="#BDBDBD"
              onPress={() => {
                navigation.navigate("Comments", { photo, title, comments });
              }}
            />
          )}
          <Text style={styles.commentsText}>{comments.length}</Text>
        </View>
        {route.name === "Profile" && (
          <View style={{ ...styles.iconsContainer, marginLeft: 24 }}>
            <AntDesign name="like2" size={24} color="#FF6C00" />
            <Text style={styles.commentsText}>0</Text>
          </View>
        )}
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
