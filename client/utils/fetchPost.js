import { path } from "./apiRoutes";

export const fetchPost = async (setPost, postId) => {
  const res = await fetch(`${path}posts/${postId}`);
  const data = await res.json();
  const { post } = data;
  setPost(post);
};
