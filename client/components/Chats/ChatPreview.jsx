import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";

const ChatPreview = ({ item }) => {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.currentUserReducer.user);

  const friend = item.users.find((user) => user._id !== currentUser._id);

  let date;
  if (
    new Date().getDate() !== new Date(item.updatedAt).getDate() ||
    (new Date() - new Date(item.updatedAt)) / (1000 * 60 * 60) > 24
  ) {
    date =
      new Date(item.updatedAt).getDate() + new Date(item.updatedAt).getMonth();
  } else {
    let minutes = new Date(item.updatedAt).getMinutes();
    if (minutes.toString().length < 2) minutes = "0" + minutes;
    date = `${new Date(item.updatedAt).getHours()}:${minutes}`;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.chatContainer,
        pressed ? styles.pressed : "",
      ]}
      onPress={() => navigation.navigate("chat", { user: friend })}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: friend.avatar }} style={styles.avatar} />
      </View>

      <View style={styles.chatBody}>
        <Text style={styles.senderName}>{friend.name}</Text>
        <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
          {item.lastMessage}
        </Text>
      </View>

      <View style={styles.chatInfo}>
        <Text style={styles.time}>{date}</Text>
        {/* <View style={styles.messagesNumberContainer}>
          <Text style={styles.messagesNumber}>{messageNumbers}</Text>
        </View> */}
      </View>
    </Pressable>
  );
};

export default ChatPreview;

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    gap: 10,
  },
  avatarContainer: {
    flex: 1,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  chatBody: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "center",
    padding: 2,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "600",
  },
  message: {
    fontSize: 16,
    color: "#525252",
    margin: 0,
    padding: 0,
  },
  chatInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messagesNumberContainer: {
    backgroundColor: "#8DC6FC",
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  messagesNumber: {
    color: "#fff",
    fontWeight: "700",
  },
  pressed: {
    backgroundColor: "#dadada",
  },
});
