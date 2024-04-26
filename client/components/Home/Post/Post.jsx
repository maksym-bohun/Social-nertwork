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
import { fetchFriends, fetchUsers } from "../../../store/usersReducer";
// import { dislikePost, likePost } from "../../../store/currentUserReducer";
import { path } from "../../../utils/apiRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCurrentUser } from "../../../store/currentUserReducer";
import { fetchPosts } from "../../../store/postsReducer";
import { push } from "../../../routing/rootNavigation";

const Post = ({ postId, post = null }) => {
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  let currentPost;
  if (!post) {
    currentPost = useSelector((state) =>
      state.postsReducer.posts.find((post) => post._id === postId)
    );
  } else {
    currentPost = post;
  }

  if (!currentPost) return;

  const [showAllText, setShowAllText] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [postIsLiked, setPostIsLiked] = useState(false);
  const [likes, setLikes] = useState("0");
  let lastClickTime = 0;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
  }, []);

  const likePostHandler = async () => {
    const currentTime = Date.now();
    // const timeDifference = currentTime - lastClickTime;
    // if (timeDifference < 1000) {
    //   return;
    // }
    // lastClickTime = currentTime;

    const token = await AsyncStorage.getItem("token");
    if (postIsLiked) {
      await fetch(`${path}posts/dislike/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      console.log("START LIKE");

      await fetch(`${path}posts/like/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    setPostIsLiked(!postIsLiked);
    setLikes(currentPost.likes.length);
    dispatch(fetchUsers());
    dispatch(fetchFriends());
    dispatch(fetchPosts());
    if (currentPost.author._id === currentUser._id)
      dispatch(fetchCurrentUser());
  };

  const toggleNumberOfLines = () => {
    setShowAllText(!showAllText);
  };

  useEffect(() => {
    if (
      currentPost.likes &&
      currentPost.likes?.find((like) => like === currentUser._id)
    ) {
      setPostIsLiked(true);
    } else {
      setPostIsLiked(false);
    }
    setLikes(currentPost.likes.length);
  }, [currentPost]);

  const sendPostHandler = () => {
    push("Friends List to Share", { postId });
  };
<<<<<<< HEAD

  console.log("CURRENT POST ", currentPost);
=======
>>>>>>> notifications

  return (
    <View style={styles.post} key={postId}>
      <View style={styles.postInfo}>
        <TouchableOpacity
          style={styles.authorInfo}
          onPress={() =>
            navigation.navigate(
              currentUser._id === currentPost.author._id
                ? "Account"
                : "User page",
              { user: currentPost.author }
            )
          }
        >
          <Image
            style={styles.avatar}
            source={{
              uri: currentPost.author?.avatar,
            }}
          />
          <View>
            <Text style={styles.username}>{currentPost.author?.name}</Text>
            <Text>{formatDate(currentPost.createdAt)}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.postBody}>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={showAllText ? undefined : 3}
            style={{ lineHeight: 21, fontSize: 16 }}
          >
            {currentPost.text}
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

        {currentPost.image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: currentPost.image }} style={styles.image} />
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
          <Text style={{ fontSize: 16, fontWeight: "500", minWidth: 10 }}>
            {likes}
          </Text>
        </View>

        <Pressable
          onPress={() =>
            navigation.navigate("Add comment", {
              postId,
              postAuthorId: currentPost.author._id,
            })
          }
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
