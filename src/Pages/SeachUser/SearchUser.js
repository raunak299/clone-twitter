import styles from "./SearchUser.module.css";
import Layout from "../../Components/Layout/Layout";
import { Search } from "@mui/icons-material";
import useFetch from "../../custom-hooks/fetch-hook";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersData } from "../../Store/UserAction";
import { Link } from "react-router-dom";

function SearchUser() {
  const { sendRequest } = useFetch();
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    dispatch(getUsersData(sendRequest));
  }, [sendRequest, dispatch]);

  const userData = useSelector((state) => state.UserSliceReducer.users);
  const [foundUsers, setFoundUsers] = useState([]);

  const searchUserHandler = () => {
    const length = inputRef.current.value.length;
    if (length === 0) {
      setFoundUsers([]);
      return;
    }
    const foundUserTemp = userData.filter((user) => {
      return (
        user.username.substr(0, length).toUpperCase() ===
        inputRef.current.value.toUpperCase()
      );
    });
    setFoundUsers(foundUserTemp);
  };

  return (
    <Layout>
      <div className={styles["search-user-sec"]}>
        <div className={styles["search-input-cont"]}>
          <Search />
          <input
            type="text"
            placeholder="Search User"
            onChange={searchUserHandler}
            ref={inputRef}
          />
        </div>
        <div className={styles["search-result-cont"]}>
          {inputRef.current?.value && foundUsers.length === 0 && (
            <h3 className={styles["no-users"]}>No users to show</h3>
          )}
          {foundUsers.map((user, index) => (
            <Link
              to={`/profile/${user["_id"]}`}
              style={{
                color: "var(--main-text-color)",
                textDecoration: "initial",
              }}
              key={index}
            >
              <div key={index}>
                <img src={user.pic} alt=""></img>
                <div>{user.username}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default SearchUser;
