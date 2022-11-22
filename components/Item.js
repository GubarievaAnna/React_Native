import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const Item = ({ item, navigation }) => {
  const { photo, title, place, location, comments } = item;

  return (
    <View style={styles.container}>
      <Image source={photo} style={styles.img} />
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          ...styles.iconsContainer,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.iconsContainer}>
          <EvilIcons
            name="comment"
            size={24}
            color="#BDBDBD"
            onPress={() => {
              navigation.navigate("Comments");
            }}
          />
          <Text style={styles.commentsText}>{comments.length}</Text>
        </View>
        <View style={styles.iconsContainer}>
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

export default Item;
