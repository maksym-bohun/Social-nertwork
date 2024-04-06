import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../../../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../store/usersReducer";
// import { dislikePost, likePost } from "../../../store/currentUserReducer";
import { path } from "../../../utils/apiRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Post = ({ post }) => {
  useEffect(() => {}, []);
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  const [showAllText, setShowAllText] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [postIsLiked, setPostIsLiked] = useState(false);
  let likes = post.likes?.length || 0;
  let lastClickTime = 0;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
  }, []);

  const likePostHandler = async () => {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastClickTime;
    if (timeDifference < 1000) {
      return;
    }
    lastClickTime = currentTime;

    const token = await AsyncStorage.getItem("token");
    if (postIsLiked) {
      console.log("Start dislike");
      // dispatch(dislikePost(post._id));
      const res = await fetch(`${path}posts/dislike/${post._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("DISLIKE DATA ", data);
    } else {
      // dispatch(likePost(post._id));
      const res = await fetch(`${path}posts/like/${post._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("LIKE DATA ", data);
    }
    setPostIsLiked(!postIsLiked);

    dispatch(fetchUsers());
  };

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setShowAllText(!showAllText);
  };

  useEffect(() => {
    if (post.likes && post.likes?.find((like) => like === currentUser._id)) {
      setPostIsLiked(true);
    } else {
      setPostIsLiked(false);
    }
  }, [post]);

  const sendPostHandler = () => {};

  return (
    <View style={styles.post} key={post._id}>
      <View style={styles.postInfo}>
        <TouchableOpacity
          style={styles.authorInfo}
          onPress={() =>
            navigation.navigate(
              currentUser._id === post.author._id ? "Account" : "User page",
              { user: post.author }
            )
          }
        >
          <Image
            style={styles.avatar}
            source={{
              uri: post.author?.avatar,
            }}
          />
          <View>
            <Text style={styles.username}>{post.author?.name}</Text>
            <Text>{formatDate(post.createdAt)}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.postBody}>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={showAllText ? undefined : 3}
            style={{ lineHeight: 21, fontSize: 16 }}
          >
            {post.text}
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Pressable onPress={likePostHandler}>
            <Image
              style={styles.actionIcon}
              source={
                postIsLiked
                  ? require("../../../assets/heart_filled.png")
                  : require("../../../assets/heart.png")
              }
            />
          </Pressable>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{likes}</Text>
        </View>

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
