import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  const token = user?.token || localStorage.getItem("token");

  return token ? children : <Navigate to="/" />;
}

export default PrivateRoute;
