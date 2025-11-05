import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

interface ProtectedRouteProps {
  readonly children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
