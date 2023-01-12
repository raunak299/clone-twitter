import styles from "./Navbar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
// import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import TwitterIcon from "@mui/icons-material/Twitter";
// import AddIcon from "@mui/icons-material/Add";
import AddTweetBtn from "../AddTweetBtn/AddTweetBtn";
import { Link } from "react-router-dom";
import { useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useEffect } from "react";

const Navbar = () => {
  const userId = localStorage.getItem("userId");

  // const { theme, themeHandler } = useContext(themeContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const changeThemeHandler = () => {
    console.log("change");
    if (localStorage.getItem("theme") === "light-theme") {
      localStorage.setItem("theme", "dark-theme");
      setTheme("dark-theme");
    } else {
      localStorage.setItem("theme", "light-theme");
      setTheme("light-theme");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      document.body.className = localStorage.getItem("theme");
    }
  }, [theme]);

  return (
    <>
      <div className={styles["navbar-small"]}>
        <Link
          to={`/profile/${userId}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <PermIdentityIcon />
        </Link>
        {/* <NightlightRoundIcon onClick={changeThemeHandler} /> */}
        <div>
          {theme === "light-theme" && (
            <NightlightRoundIcon onClick={changeThemeHandler} />
          )}
          {theme !== "light-theme" && (
            <WbSunnyIcon onClick={changeThemeHandler} />
          )}
        </div>
      </div>

      <div className={styles["navbar-large"]}>
        <div className={styles["icon-container"]}>
          <TwitterIcon />
        </div>

        <div className={styles["icon-container"]}>
          <Link
            to="/home"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <HomeIcon />
          </Link>
        </div>

        <div className={styles["icon-container"]}>
          <Link
            to="/search"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <SearchIcon />
          </Link>
        </div>

        <div className={styles["icon-container"]}>
          <Link
            to={`/profile/${userId}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <PermIdentityIcon />
          </Link>
        </div>

        <div className={styles["icon-container"]} onClick={changeThemeHandler}>
          {theme === "light-theme" && <NightlightRoundIcon />}
          {theme !== "light-theme" && <WbSunnyIcon />}
        </div>
        <AddTweetBtn />
      </div>
    </>
  );
};

export default Navbar;
