import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth, storage } from "../../firebase/config";
import { updateProfile } from "firebase/auth";
import { logoutUser } from "../../redux/auth/authOperations";
import {
  getUserName,
  getUserId,
  getUserPhoto,
} from "../../redux/auth/authSelectors";
import { changePhoto } from "../../redux/auth/authSlice";
import background from "../../assets/images/photo_bg.png";
import Post from "../../components/Post";

const ProfileScreen = ({ navigation }) => {
  const name = useSelector(getUserName);
  const userId = useSelector(getUserId);
  const photo = useSelector(getUserPhoto);

  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  const getOwnPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postsArray);
    });
  };

  useEffect(() => {
    getOwnPosts();
  }, []);

  const loadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      return result.assets[0].uri;
    }
  };

  const changePhotoAvatar = async () => {
    try {
      const loadedPhoto = await loadPhoto();
      const response = await fetch(loadedPhoto);
      const file = await response.blob();

      const uniqueImageId = Date.now().toString();

      const storageRef = ref(storage, `authImages/${uniqueImageId}`);
      await uploadBytes(storageRef, file);

      const photoUrl = await getDownloadURL(
        ref(storage, `authImages/${uniqueImageId}`)
      );
      await updateProfile(auth.currentUser, { photoURL: photoUrl });
      dispatch(changePhoto(photoUrl));
    } catch (error) {
      console.log(error);
    }
  };

  const deletePhoto = async () => {
    try {
      await updateProfile(auth.currentUser, { photoURL: null });
      dispatch(changePhoto(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.block}>
          <View style={styles.photoBlock}>
            {photo ? (
              <>
                <Image source={{ uri: photo }} style={styles.img} />
                <AntDesign
                  name="closecircleo"
                  size={24}
                  color="#FF6C00"
                  style={styles.btn}
                  onPress={deletePhoto}
                />
              </>
            ) : (
              <View style={styles.img}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color="#FF6C00"
                  onPress={changePhotoAvatar}
                  style={styles.btn}
                />
              </View>
            )}
          </View>
          <Ionicons
            name="exit-outline"
            style={styles.iconExit}
            size={24}
            color="#BDBDBD"
            onPress={() => dispatch(logoutUser())}
          />
          <Text style={styles.name}>{name}</Text>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Post item={item} navigation={navigation} />
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: { flex: 1 },
  block: {
    position: "relative",
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    paddingTop: 92,
    paddingHorizontal: 16,
    marginTop: 103,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  photoBlock: {
    position: "absolute",
    top: -60,
    left: "36%",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btn: {
    position: "absolute",
    right: -12,
    bottom: 18,
  },
  iconExit: { position: "absolute", top: 22, right: 16 },
  name: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#212121",
    marginBottom: 32,
  },
});

export default ProfileScreen;
