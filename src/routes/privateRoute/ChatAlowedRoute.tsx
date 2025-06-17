import { Navigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { isChatAllowed } from "@constants/constants";
import { useIsAdmin } from "@hooks/useIsAdmin";
import { PrivateRouteProps } from "@/types/common";

function ChatRoute({ children }: PrivateRouteProps) {
  const { isLogged } = useAuth();
  const { data: isAdmin } = useIsAdmin();

  return isLogged ? (
    isChatAllowed || isAdmin ? (
      <>{children}</>
    ) : null
  ) : (
    <Navigate to="/login" />
  );
}

export default ChatRoute;
