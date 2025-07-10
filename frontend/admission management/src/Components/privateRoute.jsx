import React from "react";

const PrivateRoute = ({ children }) => {
  // Authentication removed, always render children
  return children;
};

export default PrivateRoute;
