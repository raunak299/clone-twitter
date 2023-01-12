import { BookmarkSliceAction } from "./BookmarkSlice";

const token = localStorage.getItem("token");

export const addToBookmark = (sendRequest, postData) => {
  return async (dispatch) => {
    const responseData = await sendRequest({
      url: `/api/users/bookmark/${postData["_id"]}`,
      method: "POST",
      //   body: JSON.stringify({}),
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    });

    dispatch(
      BookmarkSliceAction.setBookmarkData({
        bookmarkDataList: responseData.bookmarks,
      })
    );
  };
};

export const removeFromBookmark = (sendRequest, postData) => {
  return async (dispatch) => {
    const responseData = await sendRequest({
      url: `/api/users/remove-bookmark/${postData["_id"]}`,
      method: "POST",
      //   body: JSON.stringify({}),
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    });
    dispatch(
      BookmarkSliceAction.setBookmarkData({
        bookmarkDataList: responseData.bookmarks,
      })
    );
  };
};
