import Cookies from "js-cookie";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken === undefined) {
    try {
      return <Navigate to="/login" />;
    } catch (error) {
      console.log(error.message);
    }
  }
  return <Outlet />;
};

export default ProtectedRoute;
