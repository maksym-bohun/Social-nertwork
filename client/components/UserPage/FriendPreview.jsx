import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCurrentUser } from "../../store/currentUserReducer";

const FriendPreview = ({ item, navigation }) => {
  const [userIsFriend, setUserIsFriend] = useState(false);
  const currentUser = useSelector((state) => state.currentUserReducer.user);

  useEffect(() => {
    if (currentUser.friends.find((el) => el === item._id)) {
      setUserIsFriend(true);
    }
  }, [currentUser]);

  const makeFriendsHandler = async (user) => {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch(
      `http://127.0.0.1:8000/api/v1/users/makeFriend/${user._id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.status === "success") {
      setUserIsFriend(true);
      fetchCurrentUser();
    }
  };

  const unfriend = async (user) => {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch(
      `http://127.0.0.1:8000/api/v1/users/unfriend/${user._id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.status === "success") {
      setUserIsFriend(false);
      fetchCurrentUser();
    }
  };

  return (
    <TouchableOpacity
      style={styles.userContainer}
      key={item._id}
      onPress={() => {
        navigation.navigate("User page", { user: item });
      }}
    >
      <View style={styles.userContainerLeft}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{item.name} </Text>
      </View>
      {/* TEST  */}
      {userIsFriend && (
        <Button
          style={styles.button}
          title="Unfriend"
          icon={require("../../assets/unfriend.png")}
          onPress={() => unfriend(item)}
        />
      )}
      {!userIsFriend && (
        <Button
          style={styles.button}
          onPress={() => makeFriendsHandler(item)}
        />
      )}
    </TouchableOpacity>
  );
};

export default FriendPreview;

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
  },
  userContainerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 2,
  },
  username: {
    fontSize: 18,
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
});
