import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { path } from "../utils/apiRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch(`${path}users`, {
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  console.log("USERS DATA FETCH");
  return data.users;
});

export const fetchFriends = createAsyncThunk("users/fetchFriends", async () => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${path}users/friends`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data.users;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
    isLoading: false,
    friends: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUsers, setFriends } = usersSlice.actions;
export default usersSlice.reducer;
