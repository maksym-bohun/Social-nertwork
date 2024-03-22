import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch("http://127.0.0.1:8000/api/v1/users", {
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  return data.users;
});

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle", error: null, isLoading: false },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
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
      });
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
