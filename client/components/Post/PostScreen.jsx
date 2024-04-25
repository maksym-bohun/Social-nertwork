import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Post from "../Home/Post/Post";
import { useSelector } from "react-redux";
import { fetchPost } from "../../utils/fetchPost";

const PostScreen = ({ route, nivagation }) => {
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentPost() {
      setIsLoading(true);
      await fetchPost(setPost, route.params.postId);
      setIsLoading(false);
    }
    fetchCurrentPost();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      {!isLoading && <View>{post && <Post postId={post._id} />}</View>}
    </View>
  );
};

export default PostScreen;
