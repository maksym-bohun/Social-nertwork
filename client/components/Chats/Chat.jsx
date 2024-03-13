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
    { senderId: 1, message: "Hi", id: "12312321s" },
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
        />
        <Pressable
          style={({ pressed }) => [
            styles.iconContainer,
            pressed && styles.pressed,
          ]}
          onPress={sendMessageHandler}
        >
          <Image
            source={require("../../assets/send.png")}
            style={styles.inputIcon}
          />
        </Pressable>
      </View>
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
    backgroundColor: "yellow",
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
    borderColor: "#000",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    flex: 10,
    height: "100%",
    padding: 10,
  },

  iconContainer: {
    flex: 1,
  },
  inputIcon: {
    height: 24,
    width: 24,
  },
  pressed: {
    opacity: 0.5,
  },
});
