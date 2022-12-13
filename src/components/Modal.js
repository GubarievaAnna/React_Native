import React from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/config";

const ModalDelete = ({ setShowModal, id, photoId }) => {

  const deletePost = async () => {
    try {
      await deleteDoc(doc(db, "posts", id));
      const desertRef = ref(storage, `postImages/${photoId}`);
      await deleteObject(desertRef);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Вы уверены, что хотите удалить это фото?
          </Text>
          <View style={styles.btnBlock}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={deletePost}
            >
              <Text style={styles.textStyle}>Да</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ ...styles.button, marginLeft: 20 }}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.textStyle}>Нет</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDelete;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 35,
    alignItems: "center",
    shadowColor: "#FF6C00",
    elevation: 20,
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
  },
  btnBlock: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    width: 80,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#FF6C00",
  },
  textStyle: {
    fontFamily: "Roboto-Bold",
    color: "#fff",
    textAlign: "center",
  },
});
