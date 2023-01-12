import styles from "./Footer.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
// import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className={styles["footer-small"]}>
        <Link
          to="/home"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <div className={styles["icon-container"]}>
            <HomeIcon />
          </div>
        </Link>

        <div className={styles["icon-container"]}>
          <Link
            to="/search"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <SearchIcon />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
