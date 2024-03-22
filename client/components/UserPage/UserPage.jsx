import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import PostsList from "./PostsList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserPage = ({ route }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/users/${route.params.user._id}`
      );
      const data = await res.json();
      console.log("FETCH", data);
      setUser(data.data);

      return { token, user: data };
    };
    fetchUser();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {user !== null && (
        <View>
          <UserHeader user={user} />
          <PostsList posts={user.posts} />
        </View>
      )}
    </ScrollView>
  );
};

export default UserPage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
