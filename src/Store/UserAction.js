import { UserSliceAction } from "./UserSlice";

export const getUsersData = (sendRequest) => {
  return async (dispatch) => {
    const response = await sendRequest({ url: "/api/users" });
    dispatch(UserSliceAction.setUserData({ usersList: response.users }));
  };
};

export const followHandler = (sendRequest, url, userId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const response = await sendRequest({
      url,
      method: "POST",
      headers: {
        authorization: token,
      },
    });
    dispatch(UserSliceAction.setUserData({ usersList: response.allUsers }));
  };
};

export const editProfileHandler = (sendRequest, user, profilePic, bio) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const response = await sendRequest({
      url: "/api/users/edit",
      method: "POST",
      body: JSON.stringify({
        userData: { ...user, pic: profilePic, bio },
      }),
      headers: {
        authorization: token,
      },
    });
    console.log(response);
    dispatch(UserSliceAction.setUserData({ usersList: response.user }));
  };
};
