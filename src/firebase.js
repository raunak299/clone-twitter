// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBIfRsaW034__GZK6NxUXKmJNlQbnJYXh0",
//   authDomain: "twitter-clone-90fa7.firebaseapp.com",
//   projectId: "twitter-clone-90fa7",
//   storageBucket: "twitter-clone-90fa7.appspot.com",
//   messagingSenderId: "448294863359",
//   appId: "1:448294863359:web:3e9031cbede1e4272527ca",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCziXzUOLt2CzUDYjOZV0Wldu8gmp4jVAE",
  authDomain: "embifi.firebaseapp.com",
  projectId: "embifi",
  storageBucket: "embifi.appspot.com",
  messagingSenderId: "888713229097",
  appId: "1:888713229097:web:74ed5b7df881824d06fd38",
};

//Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
