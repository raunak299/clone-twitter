import { createSlice } from "@reduxjs/toolkit";

const BookmarkSlice = createSlice({
  name: "BookmarkSlice",
  initialState: {
    bookmarkData: [],
    isLoading: false,
  },
  reducers: {
    setBookmarkData(state, action) {
      state.bookmarkData = action.payload.bookmarkDataList;
    },
  },
});

export const BookmarkSliceAction = BookmarkSlice.actions;
export default BookmarkSlice.reducer;
