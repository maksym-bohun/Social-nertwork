import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { formatDate } from "../../../utils/formatDate";
import { useSelector } from "react-redux";

const CommentItem = ({ item, onDeleteComment, postAuthorId }) => {
  const commentAuthorId = item.author._id;
  const currentUserId = useSelector(
    (state) => state.currentUserReducer.user._id
  );

  const renderComment = () => {
    return (
      <View style={styles.commentContainer}>
        <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
        <View style={styles.commentBody}>
          <Text style={styles.username}>{item.author.name}</Text>
          <Text style={styles.commentText}>{item.text}</Text>
        </View>
        <View style={styles.date}>
          <Text>{formatDate(item.createdAt).slice(0, -5)}</Text>
        </View>
      </View>
    );
  };

  const renderHiddenItem = () => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        style={styles.hiddenButton}
        onPress={() => onDeleteComment(item)}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (commentAuthorId === currentUserId || postAuthorId === currentUserId) {
    return (
      <View style={styles.container}>
        <SwipeListView
          data={[item]}
          renderItem={renderComment}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-95}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          stopLeftSwipe={5}
          stopRightSwipe={-95}
        />
      </View>
    );
  } else {
    return <View>{renderComment()}</View>;
  }
};

export default CommentItem;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    // alignItems: "center",
    padding: 5,
    marginVertical: 10,
    gap: 10,
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },
  username: {
    fontSize: 18,
    fontWeight: "500",
  },
  commentBody: {
    flex: 1,
  },
  date: { alignSelf: "center" },
  commentText: {
    fontSize: 16,
    marginTop: 5,
  },
  hiddenContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderRadius: 10,
    margin: 10,
    marginVertical: 5,
    height: "100%",
    flex: 1,
    alignItems: "center",
    gap: 5,
  },
  hiddenButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    // height: 80,
    height: "80%",
    backgroundColor: "#eda4a4",
    borderRadius: 10,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
