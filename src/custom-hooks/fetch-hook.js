import { useCallback, useState } from "react";
import { toast } from "react-toastify";

const useFetch = () => {
  const [error, setError] = useState("");

  const sendRequest = useCallback(async (requestConfig) => {
    // console.log(requestConfig);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? requestConfig.body : null,
        headers: requestConfig.headers
          ? requestConfig.headers
          : { "content-type": "application/json" },
      });
      if (!response.ok) {
        console.log(response);
        let { errors } = JSON.parse(response["_bodyInit"]);
        throw new Error(errors[0]);
      }
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error.message);
      setError(error);
    }
  }, []);

  return {
    sendRequest,
    error,
  };
};

export default useFetch;
