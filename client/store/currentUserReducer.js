import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Экшен для асинхронного получения текущего пользователя
export const fetchCurrentUser = createAsyncThunk(
  "currentUser/fetchCurrentUser",
  async (_, { getState }) => {
    const { token } = getState().currentUser; // Получаем токен из состояния
    const res = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("FETCHED CURRENT USER");
    return data;
  }
);
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
    extraReducers: (builder) => {
      builder
        .addCase(fetchCurrentUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
          state.loading = false;
          state.loggedIn = true;
          state.user = action.payload;
        })
        .addCase(fetchCurrentUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  },
});

export const { setUser, likePost, dislikePost, login, logout } =
  currentUserReducer.actions;
export default currentUserReducer.reducer;
