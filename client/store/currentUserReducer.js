import { createSlice } from "@reduxjs/toolkit";

const currentUserReducer = createSlice({
  name: "allUsers",
  initialState: {
    user: {},
    loggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    likePost: (state, action) => {
      if (state.user.likedPosts) {
        state.user.likedPosts.push(action.payload);
      }
    },
    dislikePost: (state, action) => {
      if (state.user) {
        const indexInArray = state.user.likedPosts.indexOf(action.payload);
        state.user.likedPosts.splice(indexInArray, 1);
      }
    },

    logout: (state, action) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const { setUser, likePost, dislikePost, login, logout } =
  currentUserReducer.actions;
export default currentUserReducer.reducer;
