import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentPicker from "react-native-document-picker";
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
import {
  logoutUser,
} from '../../redux/auth/authOperations';
import { usePostsContext } from "../../hooks/usePostsContext";
import {getUserName} from "../../redux/auth/authSelectors";
import background from "../../assets/images/photo_bg.png";
import Post from "../../components/Post";

const ProfileScreen = ({ navigation }) => {
  const { posts } = usePostsContext();
  const [photo, setPhoto] = useState();
  const name = useSelector(getUserName);
  const dispatch = useDispatch();

  const loadPhoto = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setPhoto(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("error -----", err);
      } else {
        console.log("DocumentPicker error", err);
      }
    }
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.block}>
          <View style={styles.photoBlock}>
            {/* {photo ? (
              <>
                <Image source={{uri: photo}} style={styles.img} />
                <AntDesign
                  name="closecircleo"
                  size={24}
                  color="#BDBDBD"
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
                  onPress={loadPhoto}
                  style={styles.btn}
                />
              </View>
            )} */}
                          <View style={styles.img}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color="#FF6C00"
                  onPress={loadPhoto}
                  style={styles.btn}
                />
              </View>
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
    // alignItems: "center",
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
