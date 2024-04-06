import {
  Alert,
  Button,
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
import postImage from "../../utils/postImage";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../store/usersReducer";
import { fetchCurrentUser } from "../../store/currentUserReducer";
import { path } from "../../utils/apiRoutes";

const NewPost = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

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
          type: `test/${uri.split(".")[1]}`,
          name: `test.${uri.split(".")[1]}`,
        };
        postImage(newfile, setImage);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  const createPostHandler = async () => {
    if (text.trim() !== "") {
      const token = await AsyncStorage.getItem("token");
      const body =
        image !== null
          ? JSON.stringify({
              text,
              image,
            })
          : JSON.stringify({
              text,
            });

      try {
        const res = await fetch(`${path}posts`, {
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          Alert.alert(
            "Post has been created succesfully!",
            "It will appear on your page very soon.",
            [
              {
                text: "Go home",
                onPress: () => navigation.navigate("Home draw"),
              },
            ]
          );
          setText("");
          setImage(null);
          dispatch(fetchUsers());
          dispatch(fetchCurrentUser());
        }
      } catch (err) {
        console.log("Error: ", err);
      }
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
            value={text}
            onChangeText={(value) => setText(value)}
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
        <TouchableOpacity style={styles.button} onPress={createPostHandler}>
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
