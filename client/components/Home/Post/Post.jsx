import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Post = ({ post }) => {
  const [showAllText, setShowAllText] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [postIsLiked, setPostIsLiked] = useState(false);

  const navigation = useNavigation();

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
  }, []);

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setShowAllText(!showAllText);
  };

  const sendPostHandler = () => {};

  return (
    <View style={styles.post}>
      <View style={styles.postInfo}>
        <TouchableOpacity
          style={styles.authorInfo}
          onPress={() =>
            navigation.navigate("User page", { user: post.author })
          }
        >
          <Image
            style={styles.avatar}
            source={{
              uri: post.author.image,
            }}
          />
          <View>
            <Text style={styles.username}>{post.author.name}</Text>
            <Text>{post.publishDate}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.postBody}>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={showAllText ? undefined : 3}
            style={{ lineHeight: 21, fontSize: 16 }}
          >
            {post.content}
          </Text>
          {lengthMore ? (
            <Text
              onPress={toggleNumberOfLines}
              style={{
                lineHeight: 21,
                marginTop: 10,
              }}
            >
              {showAllText ? "Read less..." : "Read more..."}
            </Text>
          ) : null}
        </View>

        {post.image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: post.image }} style={styles.image} />
          </View>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <Pressable onPress={() => setPostIsLiked(!postIsLiked)}>
          <Image
            style={styles.actionIcon}
            source={
              postIsLiked
                ? require("../../../assets/heart_filled.png")
                : require("../../../assets/heart.png")
            }
          />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Add comment", { postId: "123" })}
        >
          <Image
            style={styles.actionIcon}
            source={require("../../../assets/comment.png")}
          />
        </Pressable>

        <Pressable onPress={sendPostHandler}>
          <Image
            style={styles.actionIcon}
            source={require("../../../assets/share.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  post: {
    padding: 10,
    gap: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  postInfo: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "500",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  postBody: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionIcon: {
    height: 24,
    width: 24,
  },
  imageContainer: {
    height: 200,
    marginTop: 20,
  },
  image: {
    flex: 1,
    objectFit: "contain",
  },
});
