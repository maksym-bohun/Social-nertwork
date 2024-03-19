import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersReducer";
import currentUserReducer from "./currentUserReducer";

const store = configureStore({
  reducer: {
    usersReducer,
    currentUserReducer,
  },
});

export default store;
