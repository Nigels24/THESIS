import { Navigate, Outlet } from "react-router-dom";
import { decodeToken } from "../utils/token";

const ProtectedRoutes = ({ alloweRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/not-found" />;
  } else {
    const details = decodeToken(token);
    const role = details.role;
    return alloweRoles?.includes(role) ? <Outlet /> : <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
