import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
<<<<<<< HEAD
import { useSelector } from "react-redux";
import SearchContainer from "../ui/SearchContainer";
=======
import { useDispatch, useSelector } from "react-redux";
import SearchContainer from "../ui/SearchContainer";
import { fetchCurrentUser } from "../../store/currentUserReducer";
import { fetchPosts } from "../../store/postsReducer";
import { fetchFriends } from "../../store/usersReducer";
>>>>>>> notifications

const Home = ({ route, navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { friends, users } = useSelector((state) => state.usersReducer);
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  const [postsToShow, setPostsToShow] = useState([]);

  const dispatch = useDispatch();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchPosts());
    dispatch(fetchCurrentUser());
    dispatch(fetchFriends());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setPostsToShow([]);
    if (currentUser) {
      setPostsToShow((prevPosts) => [...prevPosts, ...currentUser.posts]);
    }
    friends?.map((user) => {
      user.posts?.map((post) =>
        setPostsToShow((prevPosts) => [...prevPosts, post])
      );
    });
  }, [friends, currentUser]);

  const submitInputHandler = () => {
    console.log("inputValue ", inputValue);
    if (inputValue.trim() !== "") {
      const filteredUsers = users.filter(
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
<<<<<<< HEAD
    <View>
=======
    <View style={styles.container}>
>>>>>>> notifications
      <SearchContainer
        inputValue={inputValue}
        setInputValue={setInputValue}
        submitInputHandler={submitInputHandler}
        onChangeInput={(text) => {
          setInputValue(text);
        }}
<<<<<<< HEAD
      />
      <FlatList
        data={postsToShow.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )}
        renderItem={({ item }) => <Post postId={item._id} />}
        keyExtractor={(item) => item._id}
        style={{ marginBottom: 45 }}
=======
>>>>>>> notifications
      />
      {postsToShow.length !== 0 && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={postsToShow.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )}
          renderItem={({ item }) => <Post postId={item._id} key={item._id} />}
          // style={{ marginBottom: 0 }}
        />
      )}
      {postsToShow.length === 0 && (
        <ScrollView
          style={styles.emptyPostsContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50%",
            }}
          >
            <Text style={styles.emptyPostsContainerText}>
              Find your friend to see new posts!
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
<<<<<<< HEAD
=======
  container: { flex: 1 },
>>>>>>> notifications
  emptyPostsContainer: {
    // marginTop: "50%",
  },
  emptyPostsContainerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#999",
  },
});
