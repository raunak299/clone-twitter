import { useState } from "react";

const useAuthHook = () => {
  const [inputTouched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const setInputTouched = (value) => {
    setTouched(value);
  };

  const checkValidity = (validityCheck, value, errMsg) => {
    if (!validityCheck(value)) {
      setError(errMsg);
    } else {
      setError("");
    }
  };

  return {
    inputTouched,
    error,
    checkValidity,
    setInputTouched,
  };
};

export default useAuthHook;
