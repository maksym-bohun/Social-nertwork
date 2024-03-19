import { createSlice } from "@reduxjs/toolkit";

const currentUserReducer = createSlice({
  name: "allUsers",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(
        "SET USER🦾🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️"
      );
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
  },
});

export const { setUser, likePost, dislikePost } = currentUserReducer.actions;
export default currentUserReducer.reducer;
