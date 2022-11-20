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

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [activeLogin, setActiveLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [activeEmail, setActiveEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [activePassword, setActivePassword] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secureText, setSecureText] = useState("Показать");

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  const reset = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const registerHandler = () => {
    if (!login || !email || !password) {
      alert("Введите все данные");
      return;
    }
    console.log(`Логин ${login}, почта ${email}, пароль ${password}`);
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
            <Text style={styles.title}>Регистрация</Text>
            <TextInput
              placeholder="Логин"
              value={login}
              onChangeText={loginHandler}
              placeholderTextColor="#BDBDBD"
              selectionColor="#212121"
              onBlur={() => setActiveLogin(false)}
              onFocus={() => setActiveLogin(true)}
              style={activeLogin ? styles.activeInput : styles.input}
            />
            <TextInput
              placeholder="Адрес электронной почты"
              value={email}
              onChangeText={emailHandler}
              placeholderTextColor="#BDBDBD"
              selectionColor="#212121"
              onBlur={() => setActiveEmail(false)}
              onFocus={() => setActiveEmail(true)}
              style={activeEmail ? styles.activeInput : styles.input}
            />
            <View style={styles.lastInput}>
              <TextInput
                placeholder="Пароль"
                value={password}
                onChangeText={passwordHandler}
                placeholderTextColor="#BDBDBD"
                selectionColor="#212121"
                secureTextEntry={secure}
                onBlur={() => setActivePassword(false)}
                onFocus={() => setActivePassword(true)}
                style={activePassword ? styles.activeInput : styles.input}
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
              onPress={registerHandler}
            >
              <Text style={styles.btnTitle}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <View style={styles.wrapper}>
              <Text style={styles.link}>Уже есть аккаунт? </Text>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.link}>Войти</Text>
              </TouchableOpacity>
            </View>
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
    paddingTop: 92,
    paddingHorizontal: 16,
    paddingBottom: 78,
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
    marginBottom: 16,
  },
  btnTitle: {
    textAlign: "center",
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
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default RegistrationScreen;
