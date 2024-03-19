import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ChangeAvatar from "../ui/ChangeAvatar";
import postImage from "../../utils/postImage";

const EditAccount = ({ route }) => {
  const { user } = route.params;
  const [image, setImage] = useState(null);
  const [name, setName] = useState(user.name);
  const [shortInfo, setShortInfo] = useState(user.shortInfo);

  const changeNameHandler = (text) => {
    setName(text);
  };
  const changeShortInfoHandler = (text) => {
    setShortInfo(text);
  };

  console.log("IMAGE 🦺", image);

  return (
    <View style={styles.container}>
      <ChangeAvatar
        setImage={setImage}
        source={{ uri: image || user.avatar }}
        handleUploadAvatar={(file) => postImage(file, setImage)}
      />

      <View style={styles.changeContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={changeNameHandler}
          value={name}
        />
      </View>
      <View style={styles.changeContainer}>
        <Text style={styles.label}>Short information:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={changeShortInfoHandler}
          value={shortInfo}
          multiline={true}
        />
      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  changeContainer: {
    paddingHorizontal: 30,
    marginTop: 40,
  },
  nameInput: {
    fontSize: 20,
    fontWeight: "500",
    // textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderColor: "#333",
    borderWidth: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  saveButton: {
    alignSelf: "center",
    backgroundColor: "#8DC6FC",
    marginTop: 60,
    padding: 10,
    borderRadius: 10,
  },
  saveButtonText: {
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "500",
  },
});
