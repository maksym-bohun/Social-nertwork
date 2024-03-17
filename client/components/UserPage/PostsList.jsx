import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Post from "../Home/Post/Post";
import { Feather } from "@expo/vector-icons";

const dummyPosts = [
  {
    id: "12adsfkhaf",
    content:
      "Hello how are you? Let's talk about something interesting. What about cars? I am Lewis Hamilton, so I love cars. What about you? I am Lewis Hamilton, so I loo What about you? ",
    image:
      "https://media.formula1.com/content/dam/fom-website/sutton/2023/Bahrain/Sunday/1471447115.jpg.img.640.medium.jpg/1678031744732.jpg",
    author: {
      image:
        "https://static.wikia.nocookie.net/f1wikia/images/9/9f/LewisHam.png/revision/latest?cb=20220309110334",
      name: "Lewis Hamilton",
    },
    publishDate: "15 min ago",
  },
  {
    id: "12adsfkasfdafshaf",
    content: "Love this bolid.",
    image:
      "https://traveler.marriott.com/wp-content/uploads/2019/03/MRN_LewisHamilton_wCar_11.jpg",
    author: {
      image:
        "https://static.wikia.nocookie.net/f1wikia/images/9/9f/LewisHam.png/revision/latest?cb=20220309110334",
      name: "Lewis Hamilton",
    },
    publishDate: "1 hour ago",
  },
];

const PostsList = ({ posts = dummyPosts }) => {
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
