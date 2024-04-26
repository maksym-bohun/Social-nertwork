import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { goBack, push } from "../../routing/rootNavigation";
import CheckBox from "react-native-check-box";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import SearchContainer from "../ui/SearchContainer";
import { io } from "socket.io-client";
import { fetchCurrentUser } from "../../store/currentUserReducer";
import { path } from "../../utils/apiRoutes";
import { checkChat } from "../../utils/checkChat";
import { createChat } from "../../utils/createChat";

const renderFriend = (item, selectedFriends, setSelectedFriends) => {
  return (
    <View
      style={styles.userContainer}
      key={item._id}
      onPress={() => {
        if (item._id !== currentUser._id) push("User page", { user: item });
      }}
    >
      <View style={styles.userContainerLeft}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{item.name} </Text>
      </View>

      <CheckBox
        checkedImage={
          <MaterialCommunityIcons
            size={35}
            //   name="checkbox-intermediate"
            name="checkbox-marked"
          />
        }
        unCheckedImage={
          <MaterialCommunityIcons size={35} name="checkbox-blank-outline" />
        }
        onClick={() => {
          if (!selectedFriends.includes(item._id))
            setSelectedFriends((prevFriends) => [...prevFriends, item._id]);
          else {
            setSelectedFriends((prevFriends) =>
              prevFriends.filter((friend) => friend !== item._id)
            );
          }
        }}
        isChecked={selectedFriends.includes(item._id)}
      />
    </View>
  );
};

async function createMessage(sender, receiver, postId, chatId, socket) {
<<<<<<< HEAD
  console.log("receiver ", receiver);
=======
>>>>>>> notifications
  const { data } = await axios.post(`${path}chats/addMessage`, {
    sender,
    receiver,
    message: postId,
    messageType: "post",
    chatId,
  });
  socket.emit("send-message", {
    from: sender,
    to: receiver,
    msg: postId,
  });
}

const fetchChat = async (currentUserId, friendId, postId) => {
  const res = await checkChat(currentUserId, friendId);
  if (res && res.status === "success") {
<<<<<<< HEAD
    console.log("return ", res.chat._id);
    return res.chat._id;
  } else {
    const newChatId = await createChat(currentUserId, friendId, postId, "post");
    console.log("return ", newChatId);
=======
    return res.chat._id;
  } else {
    const newChatId = await createChat(currentUserId, friendId, postId, "post");
>>>>>>> notifications
    return newChatId;
  }
};

export default function FriendsListToShare({ route }) {
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  const [friends, setFriends] = useState(currentUser.friends);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [socket, setSocket] = useState(null);
  const { postId } = route.params;
  let chatId = undefined;

  const dispatch = useDispatch();

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

  const sendPostHandler = async () => {
    for (let index in selectedFriends) {
      chatId = await fetchChat(currentUser._id, selectedFriends[index], postId);
<<<<<<< HEAD
      console.log("chatId ", chatId);
      createMessage(
        currentUser,
=======
      createMessage(
        currentUser._id,
>>>>>>> notifications
        selectedFriends[index],
        postId,
        chatId,
        socket
      );
    }
    goBack();
<<<<<<< HEAD
=======
    dispatch(fetchCurrentUser());
>>>>>>> notifications
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchContainer
        onChangeInput={(text) =>
          setFriends(
            currentUser.friends.filter((friend) =>
              friend.name.toLowerCase().includes(text.toLowerCase().trim())
            )
          )
        }
        type="send post"
        placeholder="Find friend"
      />
      <View style={styles.listContainer}>
        <FlatList
          data={friends}
          renderItem={(itemData) =>
            renderFriend(itemData.item, selectedFriends, setSelectedFriends)
          }
          style={styles.list}
        />
      </View>
      <View>
        <TextInput style={styles.input} placeholder="You can add a message" />
        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            pressed && styles.pressed,
          ]}
          onPress={sendPostHandler}
        >
          <Text style={styles.buttonTitle}>Send</Text>
          <Image
            source={require("../../assets/send.png")}
            style={styles.sendIcon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  userContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 5,
  },
  userContainerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 2,
  },
  username: {
    fontSize: 18,
    flexWrap: "wrap",
    flex: 1,
  },
  button: {
    backgroundColor: "#8DC6FC",
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
  },
  sendIcon: {
    height: 20,
    width: 20,
  },

  listContainer: {
    flex: 1,
  },
  sendButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8DC6FC",
    padding: 10,
    justifyContent: "center",
    gap: 5,
  },
  pressed: { opacity: 0.5 },
  buttonTitle: {
    fontSize: 20,
  },
  input: {
    fontSize: 18,
    padding: 5,
    marginBottom: 5,
    borderColor: "#b8b8b8",
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
