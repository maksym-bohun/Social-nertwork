import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const SearchContainer = ({
  inputValue,
  submitInputHandler,
  setInputValue,
  placeholder = "Find somebody...",
  type = "find user",
  onChangeInput = null,
}) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
        <FontAwesome
          name="search"
          size={20}
          color={"#555"}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={inputValue}
          onChangeText={onChangeInput}
        />
      </View>
      {type !== "send post" && (
        <Pressable
          style={({ pressed }) => [
            styles.searchButton,
            pressed && styles.pressed,
          ]}
          onPress={submitInputHandler}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      )}
    </View>
  );
};

export default SearchContainer;

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
  },
  input: {
    fontSize: 16,
    padding: 5,
    flex: 1,
  },
  icon: { marginHorizontal: 5 },
  searchButton: {
    backgroundColor: "#8DC6FC",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    justifyContent: "center",
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  pressed: {
    backgroundColor: "#bbddfd",
  },
});
