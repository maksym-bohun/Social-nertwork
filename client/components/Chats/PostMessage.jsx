import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { push } from "../../routing/rootNavigation";
import { fetchPost } from "../../utils/fetchPost";
<<<<<<< HEAD

const PostMessage = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost(setPost, postId);
    console.log("fetch");
=======
import { useRoute } from "@react-navigation/native";

const PostMessage = ({ postId, fetchChat }) => {
  const [post, setPost] = useState(null);
  const route = useRoute();
  console.log("post message route ", route.params);

  useEffect(() => {
    fetchPost(setPost, postId);
>>>>>>> notifications
  }, []);

  return (
    <Pressable
      style={styles.container}
      onPress={() => push("Post", { postId })}
    >
      {!post && <ActivityIndicator />}
      {post && (
        <View style={styles.postMessageContainer}>
          <View style={styles.authorInfo}>
            <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
            <Text style={styles.authorName}>{post.author.name}</Text>
          </View>
          <Text numberOfLines={2} style={styles.postHeader}>
            {post.text}
          </Text>
          <View style={styles.imageContainer}>
            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            )}
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default PostMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    width: 210,
    minHeight: 200,
  },
  authorInfo: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    height: 30,
    width: 30,
    objectFit: "cover",
    borderRadius: 50,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
    flexWrap: "wrap-reverse",
    flex: 1,
  },
  postMessageContainer: {},
  postHeader: {
    // flexWrap: "nowrap",
  },
  postImage: {
    objectFit: "contain",
    height: 100,
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
});
