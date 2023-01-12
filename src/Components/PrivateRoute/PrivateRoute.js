import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = (props) => {
  const login = localStorage.getItem("token");
  const location = useLocation();

  return (
    <>
      {login && props.children}
      {!login && (
        <Navigate
          to="/authentication"
          state={{ from: location }}
          replace={true}
        />
      )}
    </>
  );
};

export default PrivateRoute;
