import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ children }) => {
  const { authValue } = useSelector((state) => state.auth);

  if (!authValue) {
    return <Navigate to={"/login"} replace />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;
