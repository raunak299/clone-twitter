import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    users: [],
  },
  reducers: {
    setUserData(state, action) {
      state.users = action.payload.usersList;
    },
  },
});

export const UserSliceAction = UserSlice.actions;
export default UserSlice.reducer;
