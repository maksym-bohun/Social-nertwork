import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { push } from "../../routing/rootNavigation";
import { unfriend } from "../../utils/unfriend";
import { makeFriendsHandler } from "../../utils/makeFriend";

const FriendPreview = ({ item, navigation }) => {
  const [userIsFriend, setUserIsFriend] = useState(false);
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.friends.find((el) => el._id === item._id)) {
      setUserIsFriend(true);
    } else {
      setUserIsFriend(false);
    }
  }, [currentUser]);

  return (
    <TouchableOpacity
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
      {/* TEST  */}
      {currentUser._id !== item._id && userIsFriend && (
        <Button
          style={styles.button}
          title="Unfriend"
          icon={require("../../assets/unfriend.png")}
          onPress={() => unfriend(item, setUserIsFriend, dispatch)}
        />
      )}
      {currentUser._id !== item._id && !userIsFriend && (
        <Button
          style={styles.button}
          onPress={() => makeFriendsHandler(item, setUserIsFriend, dispatch)}
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
});
