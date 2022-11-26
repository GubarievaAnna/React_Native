import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { usePostsContext } from "../../hooks/usePostsContext";
import { getUserId } from "../../redux/auth/authSelectors";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState(null);
  const { posts, setPosts } = usePostsContext();
  const userId = useSelector(getUserId);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("useEffect", location);
      setLocation(location.coords);
    })();
  }, []);

  const titleHandler = (text) => setTitle(text);
  const placeHandler = (text) => setPlace(text);
  const reset = () => {
    setPhoto(null);
    setTitle("");
    setPlace("");
  };

  const publishPost = async () => {
    if (!title || !place) {
      alert("Введите название и метность");
      return;
    }
    await addDoc(collection(db, "posts"), {
      title,
      place,
      location,
      userId,
    });
    setPosts([...posts, { photo, title, place, location, comments: [] }]);
    navigation.navigate("Posts");
    reset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {!photo && (
          <Camera style={styles.camera} ref={setCamera}>
            <TouchableOpacity
              onPress={takePhoto}
              style={styles.iconContainer}
              enabled={photo ? "false" : "true"}
            >
              <FontAwesome5 name="camera" size={20} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
        )}
        {photo && (
          <ImageBackground source={{ uri: photo }} style={styles.background}>
            <TouchableOpacity
              onPress={() => setPhoto(null)}
              style={{
                ...styles.iconContainer,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              <FontAwesome5 name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </ImageBackground>
        )}
      </View>
      <Text
        onPress={() => {
          if (!photo) return;
          setPhoto(null);
        }}
        style={styles.loadText}
      >
        {!photo ? "Загрузите фото" : "Редактировать фото"}
      </Text>
      <TextInput
        placeholder="Название..."
        value={title}
        onChangeText={titleHandler}
        placeholderTextColor="#BDBDBD"
        selectionColor="#212121"
        style={styles.input}
      />
      <View
        style={{
          ...styles.input,
          marginBottom: 32,
          paddingLeft: 28,
          position: "relative",
        }}
      >
        <EvilIcons
          name="location"
          size={24}
          color="#BDBDBD"
          style={styles.iconLocation}
        />
        <TextInput
          placeholder="Местность..."
          value={place}
          onChangeText={placeHandler}
          placeholderTextColor="#BDBDBD"
          selectionColor="#212121"
        />
      </View>

      <TouchableOpacity
        onPress={publishPost}
        activeOpacity={0.8}
        style={{
          ...styles.btn,
          backgroundColor: "#FF6C00",
          backgroundColor: !photo ? "#F6F6F6" : "#FF6C00",
        }}
        disabled={!photo ? true : false}
      >
        <Text
          style={{
            ...styles.btnTitle,
            color: "#fff",
            color: !photo ? "#BDBDBD" : "#FFF",
          }}
        >
          Опубликовать
        </Text>
      </TouchableOpacity>
      <View style={{ width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.btnDelete}
          activeOpacity={0.6}
          onPress={reset}
        >
          <AntDesign name="delete" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  cameraContainer: {
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden",
    marginBottom: 8,
  },
  camera: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loadText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  btn: {
    borderRadius: 100,
    paddingVertical: 16,
    marginBottom: 16,
  },
  btnTitle: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btnDelete: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  input: {
    position: "relative",
    height: 50,
    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingVertical: 16,
    marginBottom: 16,
  },
  iconLocation: { position: "absolute", left: 0, top: 13 },
});

export default CreatePostsScreen;
