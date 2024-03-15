import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";

const Input = ({ inputValue, setInputValue, submitInputHandler }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={(text) => setInputValue(text)}
        value={inputValue}
      />
      <Pressable
        style={({ pressed }) => [
          styles.iconContainer,
          pressed && styles.pressed,
        ]}
        onPress={submitInputHandler}
      >
        <Image
          source={require("../../assets/send.png")}
          style={styles.inputIcon}
        />
      </Pressable>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
    borderColor: "#000",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    flex: 10,
    height: "100%",
    padding: 10,
  },

  iconContainer: {
    flex: 1,
  },
  inputIcon: {
    height: 24,
    width: 24,
  },
  pressed: {
    opacity: 0.5,
  },
});
