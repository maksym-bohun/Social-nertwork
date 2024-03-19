import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import UserHeader from "../UserPage/UserHeader";
import PostsList from "../UserPage/PostsList";
import { useSelector } from "react-redux";

const Account = ({ navigation }) => {
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  console.log("currentUser 😍😍😍😍😍😍😍😍", currentUser.user);

  return (
    <ScrollView style={styles.container}>
      <UserHeader
        mode="account"
        user={currentUser}
        onEditAccount={() => {
          console.log("EDIT");
          navigation.navigate("Edit account", { user: currentUser });
        }}
      />
      <PostsList posts={currentUser.posts} />
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
