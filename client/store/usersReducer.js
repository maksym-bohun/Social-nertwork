const { createSlice } = require("@reduxjs/toolkit");

const usersReducer = createSlice({
  name: "users",
  initialState: { users: [] },
  reducers: {
    setUsers: (state, payload) => {
      console.log("SET ALL USERS 🦊🦊🦊🦊🦊🦊🦊");
      state.users = payload;
    },
  },
});

export const { setUsers } = usersReducer.actions;
export default usersReducer.reducer;
