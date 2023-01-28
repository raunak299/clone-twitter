import styles from "./TweetDetail.module.css";
import Layout from "../../Components/Layout/Layout";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../custom-hooks/fetch-hook";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import Comment from "./Comment/Comment";
// import { addToBookmark, removeFromBookmark } from "../../Store/BookmarkAction";
import { addCommentHandler, likeTweetHandler } from "../../Store/PostAction";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NewTweetContainer from "../NewTweet/NewTweetContainer";
import { Link } from "react-router-dom";
import { deleteTweetHandler } from "../../Store/PostAction";
import { CircularProgress } from "@mui/material";

function TweetDetail() {
  const { tweetId } = useParams();
  const postDataList = useSelector((state) => state.PostSliceReducer.postData);
  const inputRef = useRef();
  const userId = localStorage.getItem("userId");
  const { sendRequest } = useFetch();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState();
  const [editBtnVisible, setEditBtnVisibility] = useState(false);
  const [editModalVisible, setEditModalVisibility] = useState(false);
  // const bookmarkData = useSelector(
  //   (state) => state.BookmarkSliceReducer.bookmarkData
  // );
  const [userData, setUserData] = useState({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await sendRequest({ url: `/api/posts/${tweetId}` });
      setPostData(response?.post);
      setLoading(false);
    })();
  }, [tweetId, sendRequest]);

  useEffect(() => {
    (async () => {
      const response = await sendRequest({ url: `/api/posts/${tweetId}` });
      const responseUser = await sendRequest({
        url: `/api/users/${response?.post.userId}`,
      });
      // console.log(responseUser);
      setUserData(responseUser.user);
      setPostData(response?.post);
    })();
  }, [tweetId, sendRequest, postDataList]);

  const likedByList = postData?.likes?.likedBy;
  let likedByLogInUser = likedByList?.find((item) => item["_id"] === userId);
  const likeTweet = async () => {
    let url = likedByLogInUser
      ? `/api/posts/dislike/${postData["_id"]}`
      : `/api/posts/like/${postData["_id"]}`;
    dispatch(likeTweetHandler(sendRequest, url));
  };

  const addComment = async () => {
    dispatch(addCommentHandler(sendRequest, postData, inputRef.current.value));
    inputRef.current.value = "";
  };

  // const isPostBookmarked = bookmarkData.find(
  //   (item) => item["_id"] === postData["_id"]
  // );
  // const bookmarkHandler = async () => {
  //   if (!isPostBookmarked) {
  //     dispatch(addToBookmark(sendRequest, postData));
  //   } else {
  //     dispatch(removeFromBookmark(sendRequest, postData));
  //   }
  // };

  const editPostHandler = () => {
    setEditModalVisibility(!editModalVisible);
  };

  const deletePostHandler = () => {
    dispatch(deleteTweetHandler(sendRequest, postData["_id"]));
    navigate("/home");
  };

  return (
    <Layout>
      <div className={styles["tweet-details-page"]}>
        {editModalVisible && (
          <div className={styles["edit-tweet-modal"]}>
            <NewTweetContainer
              postData={postData}
              setEditModalVisibility={setEditModalVisibility}
              setEditBtnVisibility={setEditBtnVisibility}
            />
          </div>
        )}
        {(loading || !postData) && (
          <div className={styles["loading"]}>
            <CircularProgress />
          </div>
        )}
        {!loading && !editModalVisible && postData && (
          <div className={styles["tweet-component"]}>
            <div className={styles["tweet-user-details"]}>
              <div>
                <Link
                  to={`/profile/${postData?.userId}`}
                  style={{
                    color: "var(--main-text-color)",
                    textDecoration: "initial",
                  }}
                >
                  <img
                    src={userData.pic}
                    className={styles["user-pic"]}
                    alt=""
                  ></img>
                </Link>
                <div className={styles["user-name-date"]}>
                  <Link
                    to={`/profile/${postData?.userId}`}
                    style={{
                      color: "var(--main-text-color)",
                      textDecoration: "initial",
                    }}
                  >
                    <div>
                      {postData.username.substr(
                        0,
                        postData.username.indexOf("@")
                      )}
                    </div>
                  </Link>
                  <div>{postData.createdAt.substr(0, 10)}</div>
                </div>
              </div>
              <div className={styles["post-action-container"]}>
                {postData.userId === userId && (
                  <MoreHorizIcon
                    onClick={() => setEditBtnVisibility(!editBtnVisible)}
                  />
                )}
                {editBtnVisible && (
                  <div className={styles["post-action-btn-container"]}>
                    {editBtnVisible && (
                      <button onClick={editPostHandler}>Edit</button>
                    )}
                    {editBtnVisible && (
                      <button onClick={deletePostHandler}>Delete</button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={styles["tweet-content"]}>
              <div>{postData.content}</div>
              {postData.pic && <img src={postData.pic} alt="pic"></img>}
            </div>

            <div className={styles["tweet-action-container"]}>
              <div className={styles["tweet-action-item-cont"]}>
                <FavoriteBorder
                  onClick={likeTweet}
                  className={likedByLogInUser ? styles["likedByLogInUser"] : ""}
                />
                <div>{postData.likes.likeCount}</div>
              </div>

              <div className={styles["tweet-action-item-cont"]}>
                <ChatBubbleOutlineIcon />
                <div>{postData?.length}</div>
              </div>

              {/* <div className={styles["tweet-action-item-cont"]}>
                <BookmarkBorderIcon
                  onClick={bookmarkHandler}
                  className={isPostBookmarked ? styles["postBookmarked"] : ""}
                />
              </div> */}
            </div>

            <div className={styles["comment-container"]}>
              <div className={styles["add-comment-container"]}>
                <input type="text" ref={inputRef} />
                <button onClick={addComment}>Comment</button>
              </div>
              {postData.comments?.map((commentData, index) => (
                <Comment key={index} commentData={commentData} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default TweetDetail;
