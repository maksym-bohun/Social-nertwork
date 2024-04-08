import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { path } from "../utils/apiRoutes";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch(`${path}posts`, {
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  return data.posts;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], status: "idle", error: null, isLoading: false },
  reducers: {
    setPosts: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUsers } = postsSlice.actions;
export default postsSlice.reducer;
