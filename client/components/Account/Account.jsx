import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import UserHeader from "../UserPage/UserHeader";
import PostsList from "../UserPage/PostsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../store/currentUserReducer";
import { RefreshControl } from "react-native-gesture-handler";

const Account = ({ navigation }) => {
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  const [posts, setPosts] = useState(currentUser.posts);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchCurrentUser());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setPosts(currentUser.posts);
  }, [currentUser]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <UserHeader
        mode="account"
        user={currentUser}
        onEditAccount={() => {
          navigation.navigate("Edit account", { user: currentUser });
        }}
      />
      <PostsList posts={posts} />
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
