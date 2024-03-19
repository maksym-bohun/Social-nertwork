import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const ChangeAvatar = ({
  setImage,
  source,
  imageStyle,
  setAvatarFull = () => {},
}) => {
  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.assets[0].uri;
      const fileName = uri.substring(uri.lastIndexOf("/") + 1);

      // Convert data URI to Blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Create File object
      const imageFile = new File([blob], fileName, {
        type: result.assets[0].type,
      });

      // Now you can use `imageFile` with multer or any other file upload library

      // Additional actions if needed
      setImage({ uri });
      setAvatarFull(imageFile);
    }
  };

  return (
    <View style={styles.avatarContainer}>
      <View style={styles.avatarContainer}>
        <Image source={source} style={[styles.avatar, imageStyle]} />
        <TouchableOpacity
          style={styles.changeImageIconContainer}
          onPress={imagePicker}
        >
          <Feather name="refresh-ccw" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeAvatar;

const styles = StyleSheet.create({
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
});
