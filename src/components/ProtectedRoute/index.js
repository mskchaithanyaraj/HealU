import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get("authToken");

  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
