import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import FriendPreview from "./FriendPreview";

const FriendsList = ({ route, navigation }) => {
  const { users, input } = route.params;
  return (
    <View style={styles.container}>
      {users.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.text}>No users with username</Text>
          <Text style={[styles.text, { fontWeight: "700" }]}> {input}</Text>
        </View>
      )}
      {users.length !== 0 && (
        <FlatList
          data={users}
          renderItem={({ item }) => {
            return <FriendPreview item={item} navigation={navigation} />;
          }}
        />
      )}
    </View>
  );
};

export default FriendsList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  emptyContainer: {
    flexDirection: "row",
    marginTop: 100,
    flexWrap: "wrap",

    justifyContent: "center",
  },
});
