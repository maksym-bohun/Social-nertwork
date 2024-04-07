import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../../ui/Input";
import { path } from "../../../utils/apiRoutes";
import { formatDate } from "../../../utils/formatDate";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const renderComments = ({ item }) => {
  return (
    <View style={styles.commentContainer}>
      <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
      <View style={styles.commentBody}>
        <Text style={styles.username}>{item.author.name}</Text>
        <Text style={styles.commentText}>{item.text}</Text>
      </View>
      <View style={styles.date}>
        <Text>{formatDate(item.createdAt).slice(0, -5)}</Text>
      </View>
    </View>
  );
};

const fetchComments = async (postId, setComments) => {
  const res = await fetch(`${path}posts/getComments/${postId}`);
  const data = await res.json();
  setComments(data.comments);
};

const AddComment = ({ route, navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchComments(route.params.postId, setComments);
  }, []);

  const addComment = async () => {
    const token = await AsyncStorage.getItem("token");
    if (inputValue !== "") {
      const res = await fetch(
        `${path}posts/addComment/${route.params.postId}`,
        {
          method: "POST",
          body: JSON.stringify({ text: inputValue }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log("data ", data);
      if (data.status === "success") {
        setComments((prevComments) => [...prevComments, data.comment]);
        setInputValue("");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.commentsList}>
        {comments.length !== 0 && (
          <FlatList
            data={comments.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            )}
            renderItem={renderComments}
            style={{ paddingHorizontal: 10 }}
          />
        )}
        {comments.length === 0 && (
          <View style={styles.noCommentsContainer}>
            <Text style={styles.noCommentsText}>No comments yet</Text>
          </View>
        )}
      </View>
      <View style={styles.input}>
        <Input
          inputValue={inputValue}
          setInputValue={setInputValue}
          submitInputHandler={addComment}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddComment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentsList: {
    flex: 1,
  },
  commentContainer: {
    flexDirection: "row",
    // alignItems: "center",
    marginVertical: 10,
    gap: 10,
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },
  username: {
    fontSize: 18,
    fontWeight: "500",
  },
  commentBody: {
    flex: 1,
  },
  date: { alignSelf: "center" },
  commentText: {
    fontSize: 16,
    marginTop: 5,
  },
  noCommentsContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -75 }],
  },
  noCommentsText: {
    fontSize: 20,
    color: "#b8b8b8",
  },
});
