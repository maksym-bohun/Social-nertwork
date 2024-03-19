import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Button from "../ui/Button";

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
            console.log("ITEM", item);
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
                {item.id == "1231aaslfkassda" && (
                  <Button
                    style={styles.button}
                    title="Unfriend"
                    icon={require("../../assets/unfriend.png")}
                  />
                )}
                {item.id !== "1231aaslfkassda" && (
                  <Button style={styles.button} />
                )}
              </TouchableOpacity>
            );
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
  emptyContainer: {
    flexDirection: "row",
    marginTop: 100,
    flexWrap: "wrap",

    justifyContent: "center",
  },
});
