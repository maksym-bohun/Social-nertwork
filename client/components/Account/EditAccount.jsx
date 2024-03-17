import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const EditAccount = ({ route }) => {
  const { user } = route.params;
  console.log("route.params", route.params);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(user.name);
  const [shortInfo, setShortInfo] = useState(user.shortInfo);

  const changeNameHandler = (text) => {
    setName(text);
  };
  const changeShortInfoHandler = (text) => {
    setShortInfo(text);
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      const fileName = uri.substring(uri.lastIndexOf("/") + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: image || user.image }} style={styles.avatar} />
          <TouchableOpacity
            style={styles.changeImageIconContainer}
            onPress={imagePicker}
          >
            <Feather name="refresh-ccw" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
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
  avatarImageContainer: {
    height: 200,
    width: 200,
    position: "relative",
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 300,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  changeImageIconContainer: {
    backgroundColor: "#8DC6FC",
    padding: 5,
    borderRadius: 40,
    position: "absolute",
    bottom: 0,
    right: 20,
    borderColor: "#fff",
    borderWidth: 3,
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
