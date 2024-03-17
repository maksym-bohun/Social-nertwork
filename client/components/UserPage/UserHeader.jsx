import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const UserHeader = ({ user, mode = "user", onEditAccount }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.userInfo}>
      <Image source={{ uri: user.image }} style={styles.avatar} />
      <View>
        <Text style={styles.username}>{user.name}</Text>
        <Text>
          Maybe some really really really really really really really really
          long text
        </Text>
      </View>
      {mode === "user" && (
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.button]}>
            <Image
              source={require("../../assets/add-friend.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionsText}>Make friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#8DC6FC" }]}
          >
            <Image
              source={require("../../assets/share.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionsText}>Send a message</Text>
          </TouchableOpacity>
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
});
