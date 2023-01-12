import "./App.css";
// import Button from '@mui/material/Button';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NewTweet from "./Pages/NewTweet/NewTweet";
import Authentication from "./Pages/Authentication/Authentication";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Profile from "./Pages/Profile/Profile";
import TweetDetail from "./Pages/TweetDetail/TweetDetail";
import Bookmark from "./Pages/Bookmark/Bookmark";
import SearchUser from "./Pages/SeachUser/SearchUser";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.body.className = theme;
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/tweet/:tweetId"
        element={
          <PrivateRoute>
            <TweetDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/new-tweet"
        element={
          <PrivateRoute>
            <NewTweet />
          </PrivateRoute>
        }
      />

      <Route
        path="/bookmarks"
        element={
          <PrivateRoute>
            <Bookmark />
          </PrivateRoute>
        }
      />

      <Route
        path="/search"
        element={
          <PrivateRoute>
            <SearchUser />
          </PrivateRoute>
        }
      />

      <Route path="/authentication" element={<Authentication />} />

      <Route
        path="/profile/:userId"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
