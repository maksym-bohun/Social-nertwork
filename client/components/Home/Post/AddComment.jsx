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
import CommentItem from "./CommentItem";

const fetchComments = async (postId, setComments) => {
  const res = await fetch(`${path}posts/getComments/${postId}`);
  const data = await res.json();
  setComments(data.comments);
};

const AddComment = ({ route, navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);
  const { postId, postAuthorId } = route.params;

  useEffect(() => {
    fetchComments(postId, setComments);
  }, []);

  const renderComments = (itemData) => {
    return (
      <CommentItem
        item={itemData.item}
        onDeleteComment={deleteCommentHandler}
        postAuthorId={postAuthorId}
      />
    );
  };

  const deleteCommentHandler = async (comment) => {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch(
      `${path}posts/deleteComment/${postId}/${comment._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    if (data.status === "success") {
      setComments((prevComments) =>
        prevComments.filter(
          (currentComment) => currentComment._id !== comment._id
        )
      );
    }
  };

  const addCommentHandler = async () => {
    const token = await AsyncStorage.getItem("token");
    if (inputValue !== "") {
      const res = await fetch(`${path}posts/addComment/${postId}`, {
        method: "POST",
        body: JSON.stringify({ text: inputValue }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
          submitInputHandler={addCommentHandler}
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
