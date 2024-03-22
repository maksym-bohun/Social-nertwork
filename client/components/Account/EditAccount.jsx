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
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditAccount = ({ route }) => {
  const { user } = route.params;
  const [image, setImage] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [shortInfo, setShortInfo] = useState(user.shortInfo);
  const [inputsAreValid, setInputsAreValid] = useState({
    image: true,
    name: true,
    shortInfo: true,
  });
  const [showInvalidInputs, setShowInvalidInputs] = useState(false);

  const changeNameHandler = (text) => {
    setName(text);
    if (text.length < 5) {
      setInputsAreValid((prevValue) => ({ ...prevValue, name: false }));
    } else {
      setInputsAreValid((prevValue) => ({ ...prevValue, name: true }));
    }
  };
  const changeShortInfoHandler = (text) => {
    setShortInfo(text);
    if (text.length < 10) {
      setInputsAreValid((prevValue) => ({ ...prevValue, shortInfo: false }));
    } else {
      setInputsAreValid((prevValue) => ({ ...prevValue, shortInfo: true }));
    }
  };

  const editAccountHandler = async () => {
    console.log(image);
    console.log(name);
    console.log(shortInfo);
    if (image.length > 0 && name.length > 5 && shortInfo.length > 10) {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/v1/users/editAccount",
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${AsyncStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              avatar: image,
              name,
              shortInfo,
            }),
          }
        );
        const data = res.json();
        console.log("Editing completed", data);
      } catch (err) {
        console.log("Error 🙈🙈🙈: ", err);
      }
    } else {
      setShowInvalidInputs(true);
    }
  };

  return (
    <View style={styles.container}>
      <ChangeAvatar
        setImage={setImage}
        source={{ uri: image || user.avatar }}
        handleUploadAvatar={(file) => postImage(file, set)}
      />

      <View style={styles.changeContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={changeNameHandler}
          value={name}
        />
        <Text
          style={[
            styles.errorMessage,
            !inputsAreValid.name && showInvalidInputs && { color: "red" },
          ]}
        >
          Please enter at least 5 characters!
        </Text>
      </View>
      <View style={styles.changeContainer}>
        <Text style={styles.label}>Short information:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={changeShortInfoHandler}
          value={shortInfo}
          multiline={true}
          maxLength={50}
        />
        <Text
          style={[
            styles.errorMessage,
            !inputsAreValid.shortInfo && showInvalidInputs && { color: "red" },
          ]}
        >
          Please enter at least 10 characters!
        </Text>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={editAccountHandler}>
        <Text style={styles.saveButtonText}>Save changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },

  changeContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
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
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
  },
  saveButtonText: {
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "500",
  },
  errorMessage: {
    color: "transparent",
    marginTop: 5,
  },
});
