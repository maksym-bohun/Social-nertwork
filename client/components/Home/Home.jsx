import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Post from "./Post/Post";
import { FontAwesome } from "@expo/vector-icons";

const dummyPosts = [
  {
    id: "12adsfkhaf",
    content:
      "Hello how are you? Let' talk about something interesting. What about cars? I am Lewis Hamilton, so I love cars. What about you? I am Lewis Hamilton, so I loo What about you? ",
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
    id: "aksjf3r2a",
    content: "Are you waiting for it?",
    image:
      "https://people.com/thmb/PusxuqE9n35n9EJemL9AH895Dp8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x247:751x249)/hugh-jackman-ryan-reynolds-deadpool-012324-4-3a6ee7a8c28b472c9a347a431f3b225b.jpg",
    author: {
      image:
        "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/57282_v9_bc.jpg",
      name: "Ryan Reynolds",
    },
    publishDate: "2 hours ago",
  },
];

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const submitInputHandler = () => {};

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
          <TextInput style={styles.input} placeholder="Find somebody..." />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.searchButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      <FlatList
        data={dummyPosts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: 45 }}
      />
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
});
