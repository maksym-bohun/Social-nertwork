import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const ChangeAvatar = ({ setImage, source, imageStyle, handleUploadAvatar }) => {
  const imagePicker = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        const uri = data.assets[0].uri;
        let newfile = {
          uri,
          type: `test/${uri?.split(".")[1]}`,
          name: `test.${uri?.split(".")[1]}`,
        };
        handleUploadAvatar(newfile);
      }
    } else {
      Alert.alert("you need to give up permission to work");
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
