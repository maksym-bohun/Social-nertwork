import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import v4 from "uuid4";
import Input from "../ui/Input";

const renderChatItem = (userId, itemData) => {
  return (
    <View
      style={[
        styles.messageContainer,
        itemData.item.senderId == userId
          ? styles.messageToCurrentUser
          : styles.messageFromCurrentUser,
      ]}
    >
      <Text style={styles.messageText}>{itemData.item.message}</Text>
      {/* <Text style={styles.time}></Text> */}
    </View>
  );
};

const Chat = ({ userId = 2, route, navigation }) => {
  const [messages, setMessages] = useState([
    { senderId: 1, message: "Do you want 2 grams?", id: "12312321s" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const sendMessageHandler = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId: userId, message: inputValue, id: v4() },
    ]);
    setInputValue("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messagesContainer}>
        <View>
          <FlatList
            data={messages}
            renderItem={(itemData) => renderChatItem(userId, itemData)}
            style={styles.list}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <Input
        inputValue={inputValue}
        setInputValue={setInputValue}
        submitInputHandler={sendMessageHandler}
      />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  messagesContainer: {
    flex: 11,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  messageContainer: {
    backgroundColor: "#bbddfd",
    padding: 15,
    margin: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
  messageText: {
    fontSize: 18,
  },
  messageFromCurrentUser: {
    alignSelf: "flex-start",
  },
  messageToCurrentUser: {
    alignSelf: "flex-end",
  },
});
