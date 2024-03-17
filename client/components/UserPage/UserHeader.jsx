import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../ui/Button";

const UserHeader = ({ user, mode = "user", onEditAccount }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.userInfo}>
      <Image source={{ uri: user.image }} style={styles.avatar} />
      <View>
        <Text style={styles.username}>{user.name}</Text>
        <Text>{user.shortInfo}</Text>
      </View>
      {mode === "user" && (
        <View style={styles.actions}>
          <Button />
          <Button
            style={{ backgroundColor: "#8DC6FC" }}
            title="Send a message"
            icon={require("../../assets/share.png")}
          />
        </View>
      )}
      {mode === "account" && (
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.button]} onPress={onEditAccount}>
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
          navigation.navigate("Friends List", { users: user.friends })
        }
      >
        <Text style={{ fontSize: 16, fontWeight: "500", marginRight: 10 }}>
          {user.friends.length} Friends:
        </Text>
        <View style={styles.friendsImagesContainer}>
          {user.friends.map((user, i) => {
            console.log("i ", i);
            if (i < 3)
              return (
                <View key={user.id} style={i > 0 && { marginLeft: -18 }}>
                  <Image
                    source={{ uri: user.image }}
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
    borderRadius: 15,
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
