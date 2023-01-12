import styles from "./Authentication.module.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useState } from "react";
import { useRef } from "react";
import useAuthHook from "../../custom-hooks/auth-hook";
import useFetch from "../../custom-hooks/fetch-hook";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Authentication() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const location = useLocation();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/profile");
  //   }
  // }, [navigate]);

  const {
    inputTouched: emailTouched,
    error: emailError,
    checkValidity: checkEmailValidity,
    setInputTouched: setEmailTouched,
  } = useAuthHook();
  const emailHandler = () => {
    setEmailTouched(true);
    verifyEmail();
  };
  const verifyEmail = () => {
    checkEmailValidity(
      (email) =>
        email.includes("@") && email.includes(".com") && email.length > 0,
      emailRef.current.value,
      "Email should be of format abc@xyz.com"
    );
  };

  const {
    inputTouched: passwordTouched,
    error: passwordError,
    checkValidity: checkPasswordValidity,
    setInputTouched: setPasswordTouched,
  } = useAuthHook();
  const passwordHandler = () => {
    setPasswordTouched(true);
    verifyPassword();
  };
  const verifyPassword = () => {
    checkPasswordValidity(
      (password) => password.length > 8,
      passwordRef.current.value,
      "Password length should be greater than 8"
    );
  };

  const {
    inputTouched: confirmPasswordTouched,
    error: confirmPasswordError,
    checkValidity: checkConfirmPasswordValidity,
    setInputTouched: setConfirmPasswordTouched,
  } = useAuthHook();
  const confirmPasswordHandler = () => {
    setConfirmPasswordTouched(true);
    verifyConfirmPassword();
  };
  const verifyConfirmPassword = () => {
    checkConfirmPasswordValidity(
      (confirmPassword) =>
        passwordRef.current.value === confirmPassword &&
        confirmPassword.length > 0,
      confirmPasswordRef.current.value,
      "Password & Confirm Password do not match"
    );
  };

  const resetAuthForm = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setEmailTouched(false);
    setPasswordTouched(false);
    if (!login) {
      confirmPasswordRef.current.value = "";
      setConfirmPasswordTouched(false);
    }
  };

  // console.log(passwordTouched);

  const formValid = login
    ? emailError.length === 0 &&
      emailTouched &&
      passwordError.length === 0 &&
      passwordTouched
    : emailError.length === 0 &&
      emailTouched &&
      passwordError.length === 0 &&
      passwordTouched &&
      confirmPasswordError.length === 0 &&
      confirmPasswordTouched;

  const applydata = (data) => {
    if (!data?.encodedToken) {
      resetAuthForm();
      return;
    }
    // console.log(data);
    const userType = login ? "foundUser" : "createdUser";
    localStorage.setItem("token", data?.encodedToken);
    localStorage.setItem("email", data[userType]?.username);
    localStorage.setItem("userId", data[userType]?.["_id"]);
    navigate(location.state?.from?.pathname ?? "/");
  };

  const { sendRequest, error } = useFetch();
  const url = login ? "/api/auth/login" : "/api/auth/signup";
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await sendRequest({
      url,
      method: "POST",
      body: JSON.stringify({
        username: emailRef.current.value.toLowerCase(),
        password: passwordRef.current.value,
        firstname: "",
        lastname: "",
      }),
      headers: { "content-type": "application/json" },
    });
    applydata(response);
    resetAuthForm();
  };

  const testUserLoginHandler = async () => {
    const response = await sendRequest({
      url,
      method: "POST",
      body: JSON.stringify({
        username: "raunakraj299@gmail.com",
        password: "123456789",
        // firstname: "",
        // lastname: "",
      }),
      headers: { "content-type": "application/json" },
    });
    applydata(response);
    resetAuthForm();
  };

  // console.log(process.env.REACT_APP_JWT_SECRET);

  return (
    <div className={styles["auth-page"]}>
      <TwitterIcon />
      {error && <ToastContainer />}

      <form className={styles["auth-sec"]} onSubmit={submitHandler}>
        <h1>{!login ? "Create your account" : "Login to your account"}</h1>

        <div className={styles["input-sec"]}>
          <input
            type="text"
            placeholder="Enter Email Address"
            ref={emailRef}
            onChange={emailHandler}
            className={
              emailError.length > 0 && emailTouched
                ? `${styles["invalid"]}`
                : `${styles["valid"]}`
            }
          />
          {emailError.length > 0 && emailTouched && (
            <div className={styles["error-sec"]}>{emailError}</div>
          )}
        </div>

        <div className={styles["input-sec"]}>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={passwordHandler}
            ref={passwordRef}
            className={
              passwordError.length > 0 && passwordTouched
                ? `${styles["invalid"]}`
                : `${styles["valid"]}`
            }
            autoComplete="off"
          />
          {passwordError.length > 0 && passwordTouched && (
            <div className={styles["error-sec"]}>{passwordError}</div>
          )}
        </div>

        {!login && (
          <div className={styles["input-sec"]}>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={confirmPasswordHandler}
              ref={confirmPasswordRef}
              className={
                confirmPasswordError.length > 0 && confirmPasswordTouched
                  ? `${styles["invalid"]}`
                  : `${styles["valid"]}`
              }
              autoComplete="off"
            />
            {confirmPasswordError.length > 0 && confirmPasswordTouched && (
              <div className={styles["error-sec"]}>{confirmPasswordError}</div>
            )}
          </div>
        )}

        <button
          className={
            formValid ? `${styles["enabled"]}` : `${styles["disabled"]}`
          }
        >
          {!login ? "Sign Up" : "Log In"}
        </button>

        {login && (
          <div onClick={testUserLoginHandler} className={styles["test-user"]}>
            Test User
          </div>
        )}

        <div className={styles["login-toggle"]}>
          {login ? "Not a memeber yet ? " : "Already a member ? "}
          <span
            onClick={() => {
              resetAuthForm();
              setLogin(!login);
            }}
          >
            {login ? "Sign Up" : "Log In"}
          </span>
        </div>
      </form>
    </div>
  );
}

export default Authentication;
