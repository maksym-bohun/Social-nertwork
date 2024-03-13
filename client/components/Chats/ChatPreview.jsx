import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ChatPreview = ({ avatar, senderName, message, time, messageNumbers }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.chatContainer,
        pressed ? styles.pressed : "",
      ]}
      onPress={() =>
        navigation.navigate("chat", {
          username: "Jesse Pinkman",
          userImage:
            "https://media.vanityfair.com/photos/5d62a5ca7a1e590008d3853f/4:3/w_1379,h_1034,c_limit/breaking-bad-movie-teaser.jpg",
        })
      }
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: avatar,
          }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.chatBody}>
        <Text style={styles.senderName}>{senderName}</Text>
        <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
          {message}
        </Text>
      </View>

      <View style={styles.chatInfo}>
        <Text style={styles.time}>{time}</Text>
        <View style={styles.messagesNumberContainer}>
          <Text style={styles.messagesNumber}>{messageNumbers}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatPreview;

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "row",
    alignItems: "stretch",
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
    justifyContent: "space-between",
    padding: 2,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "600",
  },
  message: {
    fontSize: 16,
    color: "#525252",
  },
  chatInfo: {
    flex: 1,
    justifyContent: "space-between",
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
