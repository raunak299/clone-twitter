import styles from "./Bookmark.module.css";
import Layout from "../../Components/Layout/Layout";
import TweetCard from "../../Components/TweetCard/TweetCard";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../custom-hooks/fetch-hook";
import { useEffect, useState } from "react";
import { BookmarkSliceAction } from "../../Store/BookmarkSlice";
import { CircularProgress } from "@mui/material";

function Bookmark() {
  const { sendRequest } = useFetch();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const responseData = await sendRequest({
        url: `/api/users/bookmark`,
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
    })();
    setTimeout(() => setLoading(false), 1000);
  }, [dispatch, sendRequest, token]);

  const bookmarkData = useSelector(
    (state) => state.BookmarkSliceReducer.bookmarkData
  );

  return (
    <Layout>
      <div className={styles["bookmark-page"]}>
        {loading && <CircularProgress />}
        {!loading && bookmarkData.length === 0 && (
          <h1>No Tweet Bookmarked yet !!</h1>
        )}
        {!loading && bookmarkData.length > 0 && <h1>Bookmarked Tweets</h1>}
        {!loading &&
          bookmarkData?.map((data, index) => (
            <TweetCard postData={data} key={index} />
          ))}
      </div>
    </Layout>
  );
}

export default Bookmark;
