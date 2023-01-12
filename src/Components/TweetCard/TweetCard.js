import styles from "./TweetCard.module.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import useFetch from "../../custom-hooks/fetch-hook";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { addToBookmark, removeFromBookmark } from "../../Store/BookmarkAction";
import { likeTweetHandler } from "../../Store/PostAction";
import { useEffect, useState } from "react";

function TweetCard(props) {
  const { postData } = props;
  const { sendRequest } = useFetch();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  // const bookmarkData = useSelector(
  //   (state) => state.BookmarkSliceReducer.bookmarkData
  // );

  const likedByList = postData?.likes?.likedBy;
  let likedByLogInUser = likedByList.find((item) => item["_id"] === userId);

  const likeTweet = async () => {
    let url = likedByLogInUser
      ? `/api/posts/dislike/${postData["_id"]}`
      : `/api/posts/like/${postData["_id"]}`;
    dispatch(likeTweetHandler(sendRequest, url));
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

  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getUserData = async () => {
      const response = await sendRequest({
        url: `/api/users/${postData?.userId}`,
      });
      setUserData(response.user);
    };
    getUserData();
  }, [sendRequest, postData?.userId]);

  return (
    <>
      <div className={styles["tweet-component"]}>
        <div className={styles["tweet-user-details"]}>
          <Link
            to={`/profile/${postData?.userId}`}
            style={{
              color: "var(--main-text-color)",
              textDecoration: "initial",
            }}
          >
            <img src={userData.pic} className={styles["user-pic"]} alt="" />
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
                {" "}
                {postData.username.substr(0, postData.username.indexOf("@"))}
              </div>
            </Link>
            <div>{postData.createdAt.substr(0, 10)}</div>
          </div>
        </div>

        <Link
          to={`/tweet/${postData["_id"]}`}
          style={{
            color: "inherit",
            textDecoration: "inherit",
            width: "100%",
          }}
        >
          <div className={styles["tweet-content"]}>
            <div>{postData.content}</div>
            {postData.pic && <img src={postData.pic} alt=""></img>}
          </div>
        </Link>

        <div className={styles["tweet-action-container"]}>
          <div className={styles["tweet-action-item-cont"]}>
            <FavoriteBorder
              onClick={likeTweet}
              className={likedByLogInUser ? styles["likedByLogInUser"] : ""}
            />
            <div>{postData.likes.likeCount}</div>
          </div>

          <Link
            to={`/tweet/${postData["_id"]}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <div className={styles["tweet-action-item-cont"]}>
              <ChatBubbleOutlineIcon />
              <div>{postData?.comments?.length}</div>
            </div>
          </Link>

          {/* <div className={styles["tweet-action-item-cont"]}>
            <BookmarkBorderIcon
              onClick={bookmarkHandler}
              className={isPostBookmarked ? styles["postBookmarked"] : ""}
            />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default TweetCard;
