import styles from "./AddTweetBtn.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const AddTweetBtn = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["icon-container"]}>
      <AddIcon onClick={() => navigate("/new-tweet")} />
    </div>
  );
};

export default AddTweetBtn;
