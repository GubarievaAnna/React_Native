import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { usePostsContext } from "../../hooks/usePostsContext";

const CommentsScreen = ({ route }) => {
  const { photo, title, comments } = route.params;

  const [comment, setComment] = useState();
  const [commentsRender, setCommentsRender] = useState(comments);
  const { posts, setPosts } = usePostsContext();

  const commentHandler = (text) => setComment(text);

  const addComment = () => {
    const newArray = [...comments, comment];
    const newPosts = posts.map(
      (item) =>
        (item.comments = item.title === title ? newArray : item.comments)
    );
    setPosts(newPosts);
    setCommentsRender(newArray);
  };

  return (
    <View style={styles.container}>
      <Image source={photo} style={styles.img} />
      <FlatList
        data={commentsRender}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
      />
      <View style={styles.blockInput}>
        <TextInput
          placeholder="Комментарии"
          value={title}
          onChangeText={commentHandler}
          placeholderTextColor="#BDBDBD"
          selectionColor="#212121"
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.btnArrow}
          opacity={0.6}
          onPress={addComment}
        >
          <AntDesign name="arrowup" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
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
  img: { width: "100%", height: 240, borderRadius: 8, marginBottom: 32 },
  btnArrow: {
    position: "absolute",
    right: 0,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  blockInput: { width: "100%", position: "relative" },
  input: { borderRadius: 8 },
});

export default CommentsScreen;
