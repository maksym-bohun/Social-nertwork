import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ChatPreview from "./ChatPreview";

const messages = [
  {
    avatar:
      "https://static.wikia.nocookie.net/f1wikia/images/9/9f/LewisHam.png/revision/latest?cb=20220309110334",
    senderName: "Lewis Hamilton",
    message: "Let's drive a formula 1!",
    time: "14:00",
    messageNumbers: "1",
    id: 1,
  },
  {
    avatar:
      "https://s.abcnews.com/images/GMA/tom-holland-gty-rc-210119_1611064519173_hpMain_16x9_992.jpg",
    senderName: "Peter Parker",
    message: "How about protecting New York? Let's go with us!",
    time: "16:13",
    messageNumbers: "1",
    id: 2,
  },
  {
    avatar:
      "https://media.vanityfair.com/photos/5d62a5ca7a1e590008d3853f/4:3/w_1379,h_1034,c_limit/breaking-bad-movie-teaser.jpg",
    senderName: "Jesse Pinkman",
    message: "Do you want 2 grams?",
    time: "04:20",
    messageNumbers: "2",
    id: 3,
  },
];

const Chats = () => {
  return (
    <View style={styles.chatsContainer}>
      <FlatList
        data={messages}
        renderItem={(itemData) => <ChatPreview {...itemData.item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  chatsContainer: {
    flex: 1,
  },
});
