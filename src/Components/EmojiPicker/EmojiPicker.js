import styles from "./EmojiPicker.module.css";

function EmojiPicker(props) {
  const emojiLib = [
    ["🙂", "😊", "🤗", "😄"],
    ["😅", "😆", "😂", "🤣"],
    ["😘", "🥰", "😍", "🤩"],
    ["😇", "😎", "😋", "😜"],
    ["🙃", "😴", "🤯", "🥳"],
  ];

  const emojiSelectHandler = (e) => {
    props.selectEmojiHandler(e.target.innerText);
    // console.log(e.target.innerText);
  };

  return (
    <div className={styles["emoji-container"]}>
      {emojiLib.map((emojirow, indexrow) => (
        <div className={styles["emoji-row"]} key={indexrow}>
          {emojirow.map((emoji, indexcol) => (
            <div onClick={emojiSelectHandler} key={indexcol}>
              {emoji}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default EmojiPicker;
