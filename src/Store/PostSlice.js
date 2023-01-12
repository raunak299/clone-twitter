import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "postSlice",
  initialState: {
    postData: [],
  },
  reducers: {
    setPostData(state, action) {
      //   console.log(action.payload.allPost);
      state.postData = action.payload.allPost;
    },
  },
});

export const PostSliceAction = PostSlice.actions;
export default PostSlice.reducer;
