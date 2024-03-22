import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import PostsList from "./PostsList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dummyUser = {
  name: "Lewis Hamilton",
  image:
    "https://static.wikia.nocookie.net/f1wikia/images/9/9f/LewisHam.png/revision/latest?cb=20220309110334",
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
};

const UserPage = ({ route }) => {
  const [currentUser, setCurrentUser] = useState(null);
  console.log("route.params", route.params.user._id);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/users/${route.params.user._id}`
      );
      const data = await res.json();
      console.log("FETCH", data);
      setCurrentUser(data.data);

      return { token, currentUser: data };
    };
    fetchUser();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {currentUser !== null && (
        <View>
          <UserHeader user={currentUser} />
          <PostsList posts={currentUser.posts} />
        </View>
      )}
    </ScrollView>
  );
};

export default UserPage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
