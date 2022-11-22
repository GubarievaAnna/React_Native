import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome5 } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const publishPost = () => {
    navigation.navigate("Posts");
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
      <TouchableOpacity
        onPress={publishPost}
        activeOpacity={0.8}
        style={{
          ...styles.btn,
          backgroundColor: !photo ? "#F6F6F6" : "#FF6C00",
        }}
        disabled={!photo ? true : false}
      >
        <Text
          style={{ ...styles.btnTitle, color: !photo ? "#BDBDBD" : "#FFF" }}
        >
          Опубликовать
        </Text>
      </TouchableOpacity>
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
});

export default CreatePostsScreen;
