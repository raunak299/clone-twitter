import styles from "./NewTweet.module.css";

import NewTweetContainer from "./NewTweetContainer";

function NewTweet() {
  return (
    <div className={styles["new-tweet-page"]}>
      <NewTweetContainer />
    </div>
  );
}

export default NewTweet;
