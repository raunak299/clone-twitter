import { PostSliceAction } from "./PostSlice";

export const addTweetHandler = (tweetImg, tweetContent, sendRequest) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    let userData = await sendRequest({ url: `/api/users/${userId}` });
    let response = await sendRequest({
      url: "/api/posts",
      method: "POST",
      body: JSON.stringify({
        postData: {
          pic: tweetImg,
          content: tweetContent,
          likes: {
            likeCount: 0,
            likedBy: [],
            dislikedBy: [],
          },
          comments: [],
          userPic: userData.user.pic,
          userId,
        },
      }),
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    });
    // console.log(response.posts);
    dispatch(PostSliceAction.setPostData({ allPost: response.posts }));
  };
};

export const addCommentHandler = (sendRequest, postData, content) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  console.log(postData["_id"]);
  return async (dispatch) => {
    let userData = await sendRequest({ url: `/api/users/${userId}` });
    const responseData = await sendRequest({
      url: `/api/comments/add/${postData["_id"]}`,
      method: "POST",
      body: JSON.stringify({
        commentData: {
          content,
          userData: userData.user,
        },
      }),
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    });
    if (responseData) {
      dispatch(PostSliceAction.setPostData({ allPost: responseData.posts }));
    }
  };
};

export const likeTweetHandler = (sendRequest, url) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    const responseData = await sendRequest({
      url,
      method: "POST",
      //   body: JSON.stringify({}),
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    });
    if (responseData) {
      dispatch(PostSliceAction.setPostData({ allPost: responseData.posts }));
    }
  };
};

export const editTweetHandler = (
  tweetImg,
  tweetContent,
  sendRequest,
  postId
) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    let userData = await sendRequest({ url: `/api/users/${userId}` });
    let response = await sendRequest({
      url: `/api/posts/edit/${postId}`,
      method: "POST",
      body: JSON.stringify({
        postData: {
          pic: tweetImg,
          content: tweetContent,
          likes: {
            likeCount: 0,
            likedBy: [],
            dislikedBy: [],
          },
          comments: [],
          userId,
          userPic: userData.user.pic,
        },
      }),
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    });
    // console.log(response);
    dispatch(PostSliceAction.setPostData({ allPost: response.posts }));
  };
};

export const deleteTweetHandler = (sendRequest, postId) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    const response = await sendRequest({
      url: `/api/posts/${postId}`,
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    console.log(response);
    dispatch(PostSliceAction.setPostData({ allPost: response.posts }));
  };
};
