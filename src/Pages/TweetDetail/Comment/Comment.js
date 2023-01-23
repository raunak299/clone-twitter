import styles from "./Comment.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { PostSliceAction } from "../../../Store/PostSlice";
import useFetch from "../../../custom-hooks/fetch-hook";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Comment(props) {
  const { commentData } = props;
  const { tweetId } = useParams();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { sendRequest } = useFetch();
  const dispatch = useDispatch();
  const likedByList = commentData?.votes?.upvotedBy;
  let likedByLogInUser = likedByList.find((item) => item["_id"] === userId);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const response = await sendRequest({
        url: `/api/users/${commentData?.userData["_id"]}`,
      });
      setUserData(response.user);
    };
    getUserData();
  }, [sendRequest, commentData.userData]);

  const likeCommentHandler = async () => {
    const responseData = await sendRequest({
      url: `/api/comments/upvote/${tweetId}/${commentData["_id"]}`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    });
    if (responseData) {
      dispatch(PostSliceAction.setPostData({ allPost: responseData.posts }));
    }
  };

  const deleteCommentHandler = async () => {
    const responseData = await sendRequest({
      url: `/api/comments/delete/${tweetId}/${commentData["_id"]}`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    });
    // console.log(responseData);
    if (responseData) {
      dispatch(PostSliceAction.setPostData({ allPost: responseData.posts }));
    }
  };

  const noOfLikes = commentData?.votes?.upvotedBy?.length;
  // console.log(commentData);

  return (
    <div className={styles["comment"]}>
      <div className={styles["comment-sec"]}>
        <Link
          to={`/profile/${commentData?.userData["_id"]}`}
          style={{ color: "initial", textDecoration: "initial" }}
        >
          <img src={userData?.pic} alt=""></img>
        </Link>
        <div className={styles["comment-details"]}>
          <Link
            to={`/profile/${commentData?.userData["_id"]}`}
            style={{
              color: "var(--main-text-color)",
              textDecoration: "initial",
            }}
          >
            <h3>
              {commentData.username.substr(
                0,
                commentData.username.indexOf("@")
              )}
            </h3>
          </Link>
          <div className={styles["comment-content"]}>{commentData.content}</div>
          <div className={styles["comment-action-sec"]}>
            <div className={styles["comment-like-sec"]}>
              <FavoriteBorderIcon
                onClick={likeCommentHandler}
                className={likedByLogInUser ? styles["likedByLogInUser"] : ""}
              />
              <div>{noOfLikes}</div>
            </div>
            <div onClick={deleteCommentHandler}>Delete</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
