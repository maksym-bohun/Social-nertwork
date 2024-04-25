import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const NotificationItem = ({ item }) => {
  const navigation = useNavigation();
  console.log("notification item");
  return (
    <Pressable
      style={styles.container}
      key={item._id}
      onPress={() => {
        navigation.navigate("Post", { postId: item.post._id });
      }}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: item.sender.avatar,
          }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text style={styles.username}>{item.sender.name}</Text>
          {item.type === "like" && " liked your post"}
          {item.type === "comment" && " commented your post"}
        </Text>
      </View>
      {item.post.image && (
        <View style={styles.postImageContainer}>
          <Image
            source={{
              uri: item.post.image,
            }}
            style={styles.postImage}
          />
        </View>
      )}
    </Pressable>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
  },
  postImage: {
    height: 50,
    width: 70,
    objectFit: "contain",
    borderRadius: 10,
  },
  postImageContainer: {
    flex: 3,
  },
  textContainer: {
    flex: 10,
  },
  avatarContainer: {
    flex: 2,
  },
});
