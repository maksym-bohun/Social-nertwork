import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk action to fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (nameFragment, thunkAPI) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/users");
      const users = await response.json();
      return users;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle", error: null },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
