import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const NewPost = () => {
  const [image, setImage] = useState(null);

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
    <ScrollView alwaysBounceVertical={false} style={styles.container}>
      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Enter text:</Text>
          <TextInput
            style={styles.input}
            multiline={true}
            numberOfLines={4}
            placeholder="Write your story"
          />
        </View>
        {!image && (
          <TouchableOpacity
            onPress={imagePicker}
            style={styles.imagePickerContainer}
          >
            <Text style={styles.label}>Press to upload image</Text>
            <Image
              style={{ height: 70, width: 70 }}
              source={require("../../assets/upload.png")}
            />
          </TouchableOpacity>
        )}
        {image && (
          <View
            style={[styles.imagePickerContainer, styles.imageUploadedContainer]}
          >
            <Image source={{ uri: image }} style={styles.image} />
            <View>
              <TouchableOpacity
                onPress={() => setImage(null)}
                style={[
                  styles.iconContainer,
                  { backgroundColor: "#FF9999", borderTopRightRadius: 10 },
                ]}
              >
                <AntDesign name="closecircleo" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={imagePicker}
                style={[
                  styles.iconContainer,
                  { backgroundColor: "#99FF99", borderBottomRightRadius: 10 },
                ]}
              >
                <FontAwesome5 name="exchange-alt" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    paddingVertical: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    height: 250,
    padding: 5,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  imageActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
    alignItems: "center",
  },
  imagePickerContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    height: 200,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    height: 150,
    // width: 150,
    objectFit: "contain",
    margin: 10,
  },
  imageUploadedContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    width: 80,
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
    marginTop: 30,
    backgroundColor: "#8CC6FC",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "500",
    textTransform: "uppercase",
  },
});
