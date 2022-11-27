import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

const Comment = ({ item }) => {
  const { comment, date, userId, userPhoto } = item;

  return (
    <View style={styles.container}>
      {userPhoto ? (
        <Image source={{ uri: userPhoto }} style={styles.img} />
      ) : (
        <View style={{ ...styles.img, backgroundColor: "#F6F6F6" }}></View>
      )}
      <View style={styles.blockCommentText}>
        <Text style={styles.comment}>{comment}</Text>
        <Text style={styles.date}>
          {moment(date).format("DD MMMM, YYYY")} |
          {moment(date).format("hh:mm")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "row", marginBottom: 24 },
  img: { height: 28, width: 28, borderRadius: 50 },
  blockCommentText: {
    width: 290,
    borderTopEndRadius: 6,
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginLeft: "auto",
    padding: 16,
  },
  comment: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  date: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    textAlign: "right",
  },
});

export default Comment;
