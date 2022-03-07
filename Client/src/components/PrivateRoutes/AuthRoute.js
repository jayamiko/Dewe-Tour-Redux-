import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

function AuthRoute({children}) {
  const currentState = useSelector((state) => state.auth);
  const isLogin = currentState.isLogin;
  return isLogin && currentState.isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" />
  );
}

export default AuthRoute;
