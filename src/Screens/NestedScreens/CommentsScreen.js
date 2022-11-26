import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  Text
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { usePostsContext } from "../../hooks/usePostsContext";
import Comment from "../../components/Comment";

const CommentsScreen = ({ route }) => {
  const { photo, title, comments } = route.params;

  const [comment, setComment] = useState();
  const [commentsRender, setCommentsRender] = useState(comments);
  const { posts, setPosts } = usePostsContext();

  const commentHandler = (text) => setComment(text);

  const addComment = () => {
    const date = new Date();
    const newCommentsArray = [...commentsRender, {comment, date, author: ''}];
    setComment("");
    const newPosts = posts.map(
      (item) =>
        ({...item, comments: item.title === title ? newCommentsArray : item.comments})
    );
    setPosts(newPosts);
    setCommentsRender(newCommentsArray);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri:photo}} style={styles.img} />
      <FlatList
        data={commentsRender}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (<Comment item={item}/>
        )}
      />
      <View style={styles.blockInput}>
        <TextInput
          placeholder="Комментировать..."
          value={comment}
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
    paddingBottom: 16,
  },
  img: { width: "100%", height: 240, borderRadius: 8, marginBottom: 32},
  btnArrow: {
    position: "absolute",
    top: 8,
    right: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    width: 34,
    height: 34,
  },
  blockInput: { width: "100%", position: "relative", height: 50 },
  input: { borderRadius: 100, borderWidth: 1, borderColor: "#E8E8E8", padding: 16  },
});

export default CommentsScreen;
