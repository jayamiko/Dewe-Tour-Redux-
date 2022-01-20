import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Home from "../../pages/Home";

function GuestRoute({children}) {
  const currentState = useSelector((state) => state.auth);
  const stateAuth = currentState.isLogin;
  return !stateAuth ? children : <Navigate to="/" />;
}

export default GuestRoute;
