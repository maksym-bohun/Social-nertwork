import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Button = ({
  style,
  title = "Make friends",
  icon = require("../../assets/add-friend.png"),
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Image source={icon} style={styles.actionIcon} />
      <Text style={styles.actionsText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
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
