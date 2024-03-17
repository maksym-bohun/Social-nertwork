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
  const { users } = route.params;
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userContainer}
            onPress={() => {
              navigation.navigate("User page", { user: item });
            }}
          >
            <View style={styles.userContainerLeft}>
              <Image source={{ uri: item.image }} style={styles.avatar} />
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
            {item.id !== "1231aaslfkassda" && <Button style={styles.button} />}
          </TouchableOpacity>
        )}
      />
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
});
