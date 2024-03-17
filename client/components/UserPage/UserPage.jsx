import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import UserHeader from "./UserHeader";
import PostsList from "./PostsList";

const dummyUser = {
  name: "Lewis Hamilton",
  image:
    "https://static.wikia.nocookie.net/f1wikia/images/9/9f/LewisHam.png/revision/latest?cb=20220309110334",
};

const UserPage = ({ user = dummyUser }) => {
  return (
    <ScrollView style={styles.container}>
      <UserHeader user={user} />
      <PostsList posts={user.posts} />
    </ScrollView>
  );
};

export default UserPage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
