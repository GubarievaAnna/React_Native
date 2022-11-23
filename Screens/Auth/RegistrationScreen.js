import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import background from "../../assets/images/photo_bg.png";
import photoplug from "../../assets/images/photo_bg.png";
import { useAuthContext } from "../../hooks/useAuthContext";

const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [isActiveLogin, setIsActiveLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secureText, setSecureText] = useState("Показать");
  const [photo, setPhoto] = useState(photoplug);
  const { setIsAuth } = useAuthContext();

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  const reset = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const registerHandler = ({ navigation }) => {
    if (!login || !email || !password) {
      alert("Введите все данные");
      return;
    }
    console.log({ login, email, password });
    setIsAuth(true);
    reset();
  };

  const showPassword = () => {
    if (password === "" && secure) return;
    if (secure) {
      setSecure(false);
      setSecureText("Скрыть");
      return;
    }
    setSecure(true);
    setSecureText("Показать");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowKeyboard(false);
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <View
            style={{
              ...styles.form,
              paddingBottom: Platform.OS == "android" && showKeyboard ? 0 : 78,
            }}
          >
            <View style={styles.photoBlock}>
              {photo ? (
                <>
                  <Image source={photo} style={styles.img} />
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color="#BDBDBD"
                    style={styles.btnLoad}
                    onPress={() => setPhoto(null)}
                  />
                </>
              ) : (
                <View style={styles.img}>
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color="#FF6C00"
                    onPress={() => setPhoto(photoplug)}
                    style={styles.btnLoad}
                  />
                </View>
              )}
            </View>
            <Text style={styles.title}>Регистрация</Text>
            <TextInput
              placeholder="Логин"
              value={login}
              onChangeText={loginHandler}
              placeholderTextColor="#BDBDBD"
              selectionColor="#212121"
              onBlur={() => {
                setIsActiveLogin(false);
              }}
              onFocus={() => {
                setIsActiveLogin(true);
                setShowKeyboard(true);
              }}
              style={isActiveLogin ? styles.activeInput : styles.input}
            />
            <TextInput
              placeholder="Адрес электронной почты"
              value={email}
              onChangeText={emailHandler}
              placeholderTextColor="#BDBDBD"
              selectionColor="#212121"
              onBlur={() => {
                setIsActiveEmail(false);
              }}
              onFocus={() => {
                setIsActiveEmail(true);
                setShowKeyboard(true);
              }}
              style={isActiveEmail ? styles.activeInput : styles.input}
            />
            <View
              style={{
                ...styles.lastInput,
                marginBottom:
                  Platform.OS == "android" && showKeyboard ? 32 : 43,
              }}
            >
              <TextInput
                placeholder="Пароль"
                value={password}
                onChangeText={passwordHandler}
                placeholderTextColor="#BDBDBD"
                selectionColor="#212121"
                secureTextEntry={secure}
                onBlur={() => {
                  setIsActivePassword(false);
                }}
                onFocus={() => {
                  setIsActivePassword(true);
                  setShowKeyboard(true);
                }}
                style={
                  isActivePassword
                    ? {
                        ...styles.activeInput,
                        marginBottom:
                          Platform.OS == "ios" && showKeyboard ? 165 : 0,
                      }
                    : {
                        ...styles.input,
                        marginBottom:
                          Platform.OS == "ios" && showKeyboard ? 165 : 0,
                      }
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={showPassword}
                style={styles.lastInputBtn}
              >
                <Text style={styles.lastInputText}>{secureText}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display:
                  Platform.OS == "android" && showKeyboard ? "none" : "flex",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={registerHandler}
              >
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <View style={styles.wrapper}>
                <Text style={styles.link}>Уже есть аккаунт? </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.link}>Войти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: { flex: 1 },
  form: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,

    paddingTop: 92,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",

    marginBottom: 33,
  },
  input: {
    height: 50,

    backgroundColor: "#F6F6F6",
    color: "#212121",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
    marginBottom: 16,
  },
  activeInput: {
    height: 50,

    backgroundColor: "#FFF",
    color: "#212121",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF6C00",
    padding: 16,
    marginBottom: 16,
  },
  lastInput: {
    position: "relative",
  },
  lastInputBtn: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  lastInputText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    marginBottom: 16,
  },
  btnTitle: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFF",
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
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
  btnLoad: {
    position: "absolute",
    right: -12,
    bottom: 18,
  },
});

export default RegistrationScreen;
