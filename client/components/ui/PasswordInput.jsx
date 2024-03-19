import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const PasswordInput = ({
  passwordIsVisible,
  setPasswordIsVisible,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={passwordIsVisible ? false : true}
        onChangeText={onChange}
        value={value}
      />
      {!passwordIsVisible && (
        <Pressable
          onPress={() => setPasswordIsVisible(true)}
          style={styles.icon}
        >
          <Feather name="eye" size={22} color="black" />
        </Pressable>
      )}
      {passwordIsVisible && (
        <Pressable
          onPress={() => setPasswordIsVisible(false)}
          style={styles.icon}
        >
          <Feather name="eye-off" size={22} color="black" />
        </Pressable>
      )}
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 16,
    flex: 1,
  },
  inputContainer: {
    alignSelf: "stretch",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {
    paddingHorizontal: 8,
  },
});
