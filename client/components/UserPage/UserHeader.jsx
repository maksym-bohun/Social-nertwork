import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { push } from "../../routing/rootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { unfriend } from "../../utils/unfriend";
import { makeFriendsHandler } from "../../utils/makeFriend";

const UserHeader = ({ user, mode = "user", onEditAccount }) => {
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  const [userIsFriend, setUserIsFriend] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    if (currentUser.friends.find((friend) => friend._id === user._id)) {
      setUserIsFriend(true);
    } else {
      setUserIsFriend(false);
    }
  }, [currentUser]);

  const friendButtonHandler = () => {
    if (currentUser.friends.find((friend) => friend._id === user._id)) {
      unfriend(user, setUserIsFriend, dispatch);
    } else {
      makeFriendsHandler(user, setUserIsFriend, dispatch);
    }
  };

  return (
    <View style={styles.userInfo}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View>
        <Text style={styles.username}>{user.name}</Text>
        <Text>{user.shortInfo}</Text>
      </View>
      {mode === "user" && (
        <View style={styles.actions}>
          <Button
            style={{ backgroundColor: "#8DC6FC" }}
            title={userIsFriend ? "Unfriend" : "Make friends"}
            onPress={friendButtonHandler}
            icon={
              userIsFriend
                ? require("../../assets/unfriend.png")
                : (icon = require("../../assets/add-friend.png"))
            }
          />
          <Button
            title="Send a message"
            icon={require("../../assets/share.png")}
          />
        </View>
      )}
      {mode === "account" && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.editAccountButton]}
            onPress={onEditAccount}
          >
            <Image
              source={require("../../assets/user-edit.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionsText}>Edit account</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.friendsContainer}
        onPress={() =>
          push("Friends List", {
            users: user.friends,
          })
        }
      >
        <Text style={{ fontSize: 16, fontWeight: "500", marginRight: 10 }}>
          {user.friends.length} Friends:
        </Text>
        <View style={styles.friendsImagesContainer}>
          {user.friends.map((user, i) => {
            if (i < 3)
              return (
                <View key={user._id} style={i > 0 && { marginLeft: -18 }}>
                  <Image
                    source={{ uri: user.avatar }}
                    style={styles.friendsAvatar}
                  />
                </View>
              );
          })}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  userInfo: {},
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 300,
  },
  username: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ccc",
    flex: 1,
    gap: 5,
    justifyContent: "center",
    padding: 5,
    borderRadius: 10,
  },
  editAccountButton: {
    height: 40,
  },
  actionIcon: {
    height: 16,
    width: 16,
  },
  actionsText: {
    fontSize: 16,
    fontWeight: "500",
  },

  friendsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#ccc",
    alignSelf: "stretch",
    paddingHorizontal: 10,
    justifyContent: "center",
    paddingVertical: 5,
    borderRadius: 10,
    height: 40,
    flex: 1,
  },

  friendsImagesContainer: { flexDirection: "row", gap: 5 },
  friendsAvatar: {
    height: 30,
    width: 30,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 2,
  },
});
