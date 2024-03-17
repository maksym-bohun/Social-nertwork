import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import UserHeader from "../UserPage/UserHeader";
import PostsList from "../UserPage/PostsList";

const Account = ({ navigation }) => {
  const user = {
    name: "Oleksandr Usyk",
    image:
      "https://ca-times.brightspotcdn.com/dims4/default/944d9ad/2147483647/strip/true/crop/3900x2599+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fcb%2Fcb%2F88421cf7552ea4b7ad10c003f537%2F608af726816e448ea3e0f9a9af2c0feb",
    posts: [],
  };
  return (
    <ScrollView style={styles.container}>
      <UserHeader
        mode="account"
        user={user}
        onEditAccount={() => {
          console.log("EDIT");
          navigation.navigate("Edit account");
        }}
      />
      <PostsList posts={user.posts} />
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
