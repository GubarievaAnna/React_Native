import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  //   KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import photo from "../assets/images/photo_bg.png";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [secureText, setSecureText] = useState("Показать");

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const loginHandler = () => {
    if (!email || !password) {
      alert("Введите все данные");
      return;
    }
    console.log(`Почта ${email}, пароль ${password}`);
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
    <View style={styles.container}>
      <ImageBackground source={photo} style={styles.background}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            {/* <KeyboardAvoidingView // определяем ОС и настраиваем поведение клавиатуры
          behavior="padding"
        > */}
            <Text style={styles.title}>Войти</Text>
            <TextInput
              placeholder="Адрес электронной почты"
              value={email}
              onChangeText={emailHandler}
              placeholderTextColor="#BDBDBD"
              selectionColor="#212121"
              style={styles.input}
            />
            <View style={styles.lastInput}>
              <TextInput
                placeholder="Пароль"
                value={password}
                onChangeText={passwordHandler}
                placeholderTextColor="#BDBDBD"
                selectionColor="#212121"
                style={styles.input}
                secureTextEntry={secure}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={showPassword}
                style={styles.lastInputBtn}
              >
                <Text style={styles.lastInputText}>{secureText}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={loginHandler}
            >
              <Text style={styles.btnTitle}>Войти</Text>
            </TouchableOpacity>

            {/* </KeyboardAvoidingView> */}
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
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
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 144,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  title: {
    textAlign: "center",
    // fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    // letterSpacing: "0.01em",
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
  lastInput: {
    position: "relative",
    marginBottom: 43,
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
  },
  btnTitle: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFF",
  },
});

export default LoginScreen;
