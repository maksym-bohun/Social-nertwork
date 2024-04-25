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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import SearchContainer from "../ui/SearchContainer";

const Home = ({ route, navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const allUsers = useSelector((state) => state.usersReducer.users);
  const currentUser = useSelector((state) => state.currentUserReducer.user);

  const postsToShow = [...currentUser.posts];
  allUsers.map((user) => {
    if (currentUser.friends.find((friend) => friend._id === user._id)) {
      user.posts?.map((post) => postsToShow.push(post));
    }
  });

  const submitInputHandler = () => {
    console.log("inputValue ", inputValue);
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
      <SearchContainer
        inputValue={inputValue}
        setInputValue={setInputValue}
        submitInputHandler={submitInputHandler}
        onChangeInput={(text) => {
          setInputValue(text);
        }}
      />
      <FlatList
        data={postsToShow.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )}
        renderItem={({ item }) => <Post postId={item._id} />}
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
