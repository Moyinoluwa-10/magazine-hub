import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const AuthenticatedRoutes = ({ children }) => {
  const { authValue } = useSelector((state) => state.auth);

  if (authValue) {
    return <Navigate to={"/catalog"} replace />;
  }

  return children ? children : <Outlet />;
};

AuthenticatedRoutes.propTypes = {
  children: PropTypes.node,
};

export default AuthenticatedRoutes;
