import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Post from "../Home/Post/Post";
import { Feather } from "@expo/vector-icons";

const PostsList = ({ posts }) => {
  return (
    <View style={styles.listContainer}>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      {posts.length === 0 && (
        <View style={styles.emptyContainer}>
          <Feather name="camera" size={50} color="#ccc" />
          <Text style={styles.emptyText}>
            This user doesn't have any posts yet
          </Text>
        </View>
      )}
    </View>
  );
};

export default PostsList;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 30,
    marginBottom: 20,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    fontSize: 22,
    textAlign: "center",
    color: "#bbb",
    marginTop: 10,
  },
});
