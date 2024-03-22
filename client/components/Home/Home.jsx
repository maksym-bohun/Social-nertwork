import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const Home = ({ route, navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const allUsers = useSelector((state) => state.usersReducer.users);
  const currentUser = useSelector((state) => state.currentUserReducer.user);

  const postsToShow = [...currentUser.posts];
  allUsers.map((user) => {
    if (currentUser.friends.find((friend) => friend._id === user._id)) {
      user.posts.map((post) => postsToShow.push(post));
    }
  });

  const submitInputHandler = () => {
    if (inputValue.trim() !== "") {
      const filteredUsers = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(inputValue.toLowerCase()) &&
          user._id !== currentUser._id
      );
      navigation.navigate("Users list", {
        users: filteredUsers,
        input: inputValue,
      });
      setInputValue("");
    }
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome
            name="search"
            size={20}
            color={"#555"}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Find somebody..."
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.searchButton,
            pressed && styles.pressed,
          ]}
          onPress={submitInputHandler}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      <FlatList
        data={postsToShow.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item._id}
        style={{ marginBottom: 45 }}
      />
      {postsToShow.length === 0 && (
        <View style={styles.emptyPostsContainer}>
          <Text style={styles.emptyPostsContainerText}>
            Find your friend to see new posts!
          </Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
  },
  input: {
    fontSize: 16,
    padding: 5,
    flex: 1,
  },
  icon: { marginHorizontal: 5 },
  searchButton: {
    backgroundColor: "#8DC6FC",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    justifyContent: "center",
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  pressed: {
    backgroundColor: "#bbddfd",
  },
  emptyPostsContainer: {
    alignSelf: "center",
    marginTop: "50%",
  },
  emptyPostsContainerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#999",
  },
});
