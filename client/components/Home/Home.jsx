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
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/usersReducer";

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
      posts: [
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
      ],
      friends: [
        {
          id: "1231asda",
          name: "Dustin Poirier",
          friends: [],
          posts: [],
          image:
            "https://cdn.vox-cdn.com/thumbor/bxpNvU8P9AYhCzBo-vG-qEwhAoE=/0x0:5164x3443/1200x800/filters:focal(2147x223:2973x1049)/cdn.vox-cdn.com/uploads/chorus_image/image/73206841/2072571017.0.jpg",
        },
        {
          id: "1231aaslfkassda",
          name: "Kevin de Bruyne",
          friends: [],
          posts: [],
          image:
            "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf684c7e34b6dc0b8/624d4469924b9d7b687a8071/GettyImages-1389751881.jpg?auto=webp&format=pjpg&width=3840&quality=60",
        },
        {
          id: "1asgadfas231aaslfklassda",
          name: "Margot Robbie",
          friends: [],
          posts: [],

          image:
            "https://goldenglobes.com/wp-content/uploads/2023/10/margot-robbie_gettyimages-1159264558.jpg?w=640",
        },
        {
          id: "1asfas231aaslfkassda",
          name: "Jake Gyllenhaal",
          friends: [],
          posts: [],

          image:
            "https://i.guim.co.uk/img/media/29038e9c9f014ac49fb58d9ef0a8518522cf7441/0_96_3000_1800/master/3000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b78316839adae48c216fced74aaf55f0",
        },
      ],
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
      posts: [],
      friends: [
        {
          id: "1231asda",
          name: "Dustin Poirier",
          image:
            "https://cdn.vox-cdn.com/thumbor/bxpNvU8P9AYhCzBo-vG-qEwhAoE=/0x0:5164x3443/1200x800/filters:focal(2147x223:2973x1049)/cdn.vox-cdn.com/uploads/chorus_image/image/73206841/2072571017.0.jpg",
        },
        {
          id: "1231aaslfkassda",
          name: "Kevin de Bruyne",
          image:
            "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf684c7e34b6dc0b8/624d4469924b9d7b687a8071/GettyImages-1389751881.jpg?auto=webp&format=pjpg&width=3840&quality=60",
        },
        {
          id: "1asgadfas231aaslfklassda",
          name: "Margot Robbie",
          image:
            "https://goldenglobes.com/wp-content/uploads/2023/10/margot-robbie_gettyimages-1159264558.jpg?w=640",
        },
        {
          id: "1asfas231aaslfkassda",
          name: "Jake Gyllenhaal",
          image:
            "https://i.guim.co.uk/img/media/29038e9c9f014ac49fb58d9ef0a8518522cf7441/0_96_3000_1800/master/3000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b78316839adae48c216fced74aaf55f0",
        },
      ],
    },
    publishDate: "2 hours ago",
  },
];

const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

const Home = ({ route, navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const allUsers = useSelector((state) => state.usersReducer.users);
  const currentUser = useSelector((state) => state.currentUserReducer.user);

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
