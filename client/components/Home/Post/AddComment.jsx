import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Input from "../../ui/Input";

const renderComments = ({ item }) => {
  return (
    <View style={styles.commentContainer}>
      <Image source={{ uri: item.authorImage }} style={styles.avatar} />
      <View style={styles.commentBody}>
        <Text style={styles.username}>{item.authorName}</Text>
        <Text style={styles.commentText}>{item.comment}</Text>
      </View>
    </View>
  );
};

const AddComment = () => {
  const [inputValue, setInputValue] = useState("");
  const [dummyComments, setDummyComments] = useState([
    {
      authorName: "Oleksandr Zinchenko",
      authorImage:
        "https://dynamo.kiev.ua/media/posts/2024/02/27/GettyImages-1419406432.jpg",
      comment: "I love Arsenal!",
    },
    {
      authorName: "Artem Dovbyk",
      authorImage:
        "https://icdn.sempreinter.com/wp-content/uploads/2023/11/Girona-Striker-Artem-Dovbyk-2-scaled.jpg",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates delectus porro nisi impedit ex esse! Ab laboriosam accusantium at blanditiis quaerat, tempore doloribus aspernatur perferendis molestiae corporis, maiores amet necessitatibus!",
    },
  ]);

  const addComment = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.commentsList}>
        <FlatList
          data={dummyComments}
          renderItem={renderComments}
          style={{ paddingHorizontal: 10 }}
        />
      </View>
      <View style={styles.input}>
        <Input
          inputValue={inputValue}
          setInputValue={setInputValue}
          submitInputHandler={addComment}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddComment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentsList: {
    flex: 1,
  },
  commentContainer: {
    flexDirection: "row",
    // alignItems: "center",
    marginVertical: 10,
    gap: 10,
    flex: 1,
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
  commentText: {
    fontSize: 16,
    marginTop: 5,
  },
});
