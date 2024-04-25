import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import v4 from "uuid4";
import Input from "../ui/Input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchCurrentUser } from "../../store/currentUserReducer";
import { io } from "socket.io-client";
import { path } from "../../utils/apiRoutes";
import { checkChat } from "./../../utils/checkChat";
import { createChat } from "../../utils/createChat";
import PostMessage from "./PostMessage";

const renderChatItem = (userId, itemData) => {
  return (
    <View
      key={itemData.item._id}
      style={[
        styles.messageContainer,
        itemData.item.sender == userId
          ? styles.messageFromCurrentUser
          : styles.messageToCurrentUser,
      ]}
    >
      {itemData.item.messageType === "text" && (
        <Text style={styles.messageText}>{itemData.item.message}</Text>
      )}
      {itemData.item.messageType === "post" && (
        <PostMessage postId={itemData.item.message} />
      )}
      {/* <Text style={styles.time}></Text> */}
    </View>
  );
};

async function createMessage(sender, receiver, message, chatId, socket) {
  const { data } = await axios.post(`${path}chats/addMessage`, {
    sender,
    receiver,
    message,
    chatId,
    messageType: "text",
  });
  socket.emit("send-message", {
    from: sender,
    to: receiver,
    msg: message,
  });
}

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  const [chatId, setChatId] = useState("");
  const [socket, setSocket] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const dispatch = useDispatch();

  const friendId = route.params.user._id;

  useEffect(() => {
    if (arrivalMessage) console.log("ARRIVAL MESSAGE ", arrivalMessage);
    // setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    let newSocket;
    if (currentUser) {
      newSocket = io(path);
      setSocket(newSocket);
    }

    return () => {
      dispatch(fetchCurrentUser());
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      socket.on("msg-recieve", (data) => {
        setArrivalMessage({ message: { text: data.msg }, sender: data.sender });
      });

      socket.on("message", (data) => {
        console.log("Received message:", data);
      });

      socket.emit("add-user", currentUser._id);
    }
  }, [socket]);

  useEffect(() => {
    const fetchChat = async () => {
      const res = await checkChat(currentUser._id, friendId);
      if (res && res.status === "success") {
        setChatId(res.chat._id);
        setMessages(res.chat.messages);
      } else {
        const newChatId = await createChat(currentUser._id, friendId);
        setChatId(newChatId);
      }
    };
    fetchChat();
  }, []);

  const sendMessageHandler = async () => {
    if (!chatId) {
      console.error("Chat ID is not set.");
      return;
    }

    await createMessage(currentUser._id, friendId, inputValue, chatId, socket);

    const newMessage = {
      senderId: currentUser._id,
      message: inputValue,
      id: v4(),
      messageType: "text",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
  };

  useEffect(() => {
    console.log("messages ", messages);
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messagesContainer}>
        <View>
          <FlatList
            renderItem={(itemData) => renderChatItem(friendId, itemData)}
            style={styles.list}
            keyExtractor={(item) => item._id}
            inverted
            data={[...messages].reverse()}
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
  list: { height: "100%" },
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
