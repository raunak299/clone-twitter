import ImageIcon from "@mui/icons-material/Image";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "../../Components/EmojiPicker/EmojiPicker";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import styles from "./NewTweetContainer.module.css";
import useFetch from "../../custom-hooks/fetch-hook";
import { addTweetHandler } from "../../Store/PostAction";
import { useNavigate } from "react-router-dom";
import { editTweetHandler } from "../../Store/PostAction";

function NewTweetContainer(props) {
  const [emojiPickerVisible, setEmojiPickerVisibility] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postData, setEditModalVisibility, setEditBtnVisibility } = props;
  const textareaRef = useRef();
  const [tweetImg, setTweetImg] = useState("");
  const { sendRequest } = useFetch();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (postData) {
      setTweetImg(postData.pic);
    }
  }, [postData]);

  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getUserData = async () => {
      const response = await sendRequest({
        url: `/api/users/${userId}`,
      });

      setUserData(response.user);
    };
    getUserData();
  }, [sendRequest, userId]);

  const selectEmojiHandler = (emoji) => {
    textareaRef.current.value += emoji;
  };

  // const increaseHeight = (e) => {
  //   e.target.style.height = e.target.scrollHeight + "px";
  // };

  const addTweetImg = async (e) => {
    const file = e.target.files[0];
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    let base64File = await toBase64(file);
    setTweetImg(base64File);
  };

  const removeTweetImg = () => {
    setTweetImg("");
  };

  const cancelEditingHandler = () => {
    setEditModalVisibility(false);
    setEditBtnVisibility(false);
  };

  const newTweetHandler = async () => {
    // console.log(textareaRef.current.value);
    if (!postData) {
      dispatch(
        addTweetHandler(tweetImg, textareaRef.current.value, sendRequest)
      );
    } else {
      dispatch(
        editTweetHandler(
          tweetImg,
          textareaRef.current.value,
          sendRequest,
          postData["_id"]
        )
      );
    }
    setEmojiPickerVisibility(false);
    textareaRef.current.value = "";
    navigate("/home");
  };

  return (
    <div className={styles["new-tweet-container"]}>
      <img src={userData?.pic} alt="" className={styles["profile-pic"]} />

      <div className={styles["tweet-container"]}>
        <textarea
          type="text"
          placeholder="Whats Happening ?"
          ref={textareaRef}
          defaultValue={postData ? postData.content : ""}
        />

        {tweetImg && (
          <div className={styles["tweet-img"]}>
            <CloseIcon onClick={removeTweetImg} />
            <img src={tweetImg} alt="tweet-pic" />
          </div>
        )}

        <div className={styles["tweet-feature-container"]}>
          <div>
            <div className={styles["img-uploader"]}>
              <ImageIcon />
              <input type="file" onChange={addTweetImg} />
            </div>
            <InsertEmoticonIcon
              onClick={() => setEmojiPickerVisibility(!emojiPickerVisible)}
            />
          </div>
          <div className={styles["btn-container"]}>
            <button className={styles["tweet-btn"]} onClick={newTweetHandler}>
              {postData ? "Edit" : "Tweet"}
            </button>
            {postData && (
              <button
                onClick={cancelEditingHandler}
                className={styles["cancel-btn"]}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        {emojiPickerVisible && (
          <div className={styles["emoji-picker"]}>
            <EmojiPicker selectEmojiHandler={selectEmojiHandler} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewTweetContainer;
