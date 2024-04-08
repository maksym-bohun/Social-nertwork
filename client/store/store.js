import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersReducer";
import currentUserReducer from "./currentUserReducer";
import postsReducer from "./postsReducer";

const store = configureStore({
  reducer: {
    usersReducer,
    currentUserReducer,
    postsReducer,
  },
});

export default store;
