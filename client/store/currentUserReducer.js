import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Экшен для асинхронного получения текущего пользователя
export const fetchCurrentUser = createAsyncThunk(
  "currentUser/fetchCurrentUser",
  async () => {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.data;
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    user: {},
    loggedIn: false,
    isLoading: false,
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
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state, action) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        if (action.payload) {
          state.loggedIn = true;
        }
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser, likePost, dislikePost, logout } =
  currentUserSlice.actions;
export default currentUserSlice.reducer;
