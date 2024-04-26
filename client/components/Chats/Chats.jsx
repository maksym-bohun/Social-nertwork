import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ChatPreview from "./ChatPreview";
import { useSelector } from "react-redux";
import axios from "axios";
import { path } from "../../utils/apiRoutes";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const currentUser = useSelector((state) => state.currentUserReducer.user);
  useEffect(() => {
    getUsersChats();
  }, [currentUser]);

  const getUsersChats = async () => {
    const { data } = await axios.get(`${path}chats/${currentUser._id}`);
    setChats(data.chats.chats);
  };

  return (
    <View style={styles.chatsContainer}>
      <FlatList
        data={chats
          .filter((chat) => chat.messages.length !== 0)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))}
        renderItem={(itemData) => {
          return <ChatPreview item={itemData.item} />;
        }}
        keyExtractor={(item) => item._id}
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
