import { Navigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { PrivateRouteProps } from "@/types/common";

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLogged } = useAuth();

  return isLogged ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;
