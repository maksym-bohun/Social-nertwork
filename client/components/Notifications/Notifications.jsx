import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { path } from "../../utils/apiRoutes";
import { useSelector } from "react-redux";

const fetchNotifications = async (setNotifications) => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${path}posts/getNotifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("DATA ", data);
  setNotifications(data.notifications);
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  useEffect(() => {
    fetchNotifications(setNotifications);
  }, []);

  console.log("NOTIFICATIONS ", notifications);

  return (
    <View style={styles.container}>
      {notifications.filter(
        (notification) => notification.sender._id !== currentUser._id
      ).length === 0 && (
        <View style={styles.noNotificationsContainer}>
          <Text style={styles.noNotificationsText}>
            You don't have any notifications
          </Text>
        </View>
      )}
      {notifications.filter(
        (notification) => notification.sender._id !== currentUser._id
      ).length !== 0 && (
        <View>
          <FlatList
            style={{ height: "100%" }}
            data={notifications
              .filter(
                (notification) => notification.sender._id !== currentUser._id
              )
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
            renderItem={(itemData) => <NotificationItem item={itemData.item} />}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noNotificationsText: {
    fontSize: 18,
    color: "#b8b8b8",
  },
});
