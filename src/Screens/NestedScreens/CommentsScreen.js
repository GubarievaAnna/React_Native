import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getUserId, getUserPhoto } from "../../redux/auth/authSelectors";
import Comment from "../../components/Comment";

const CommentsScreen = ({ route }) => {
  const { postId, photo, comments } = route.params;
  const [comment, setComment] = useState();
  const [allComments, setAllComments] = useState();
  const userId = useSelector(getUserId);
  const userPhoto = useSelector(getUserPhoto);

  const commentHandler = (text) => setComment(text);

  const addComment = async () => {
    const date = new Date();
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      date,
      userId,
      userPhoto,
    });
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { comments: comments + 1 });
    setComment("");
  };

  const getAllComments = async () => {
    onSnapshot(collection(db, "posts", postId, "comments"), (querySnapshot) => {
      const commentsArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllComments(commentsArray);
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.img} />
      <FlatList
        data={allComments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Comment item={item} />}
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
  img: { width: "100%", height: 240, borderRadius: 8, marginBottom: 32 },
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
  input: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
  },
});

export default CommentsScreen;
