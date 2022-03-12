import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

function AdminRoute({children}) {
  const currentState = useSelector((state) => state.auth);
  const isAdmin = currentState.user.status === "admin";
  return isAdmin ? children : <Navigate to="/" />;
}

export default AdminRoute;
