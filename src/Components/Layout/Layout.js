import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import AddTweetBtn from "../AddTweetBtn/AddTweetBtn";

const Layout = (props) => {
  return (
    <div className={styles["layout"]}>
      <Navbar />
      <div className={styles["add-tweet-btn"]}>
        <AddTweetBtn />
      </div>
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
