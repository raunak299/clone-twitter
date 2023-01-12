import { configureStore } from "@reduxjs/toolkit";
import PostSliceReducer from "./PostSlice";
import BookmarkSliceReducer from "./BookmarkSlice";
import UserSliceReducer from "./UserSlice";

const store = configureStore({
  reducer: { PostSliceReducer, BookmarkSliceReducer, UserSliceReducer },
});

export default store;
