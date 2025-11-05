import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export function useAuthToken() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE || "";

  useEffect(() => {
    async function setToken() {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: audience === "" ? undefined : audience,
            },
          });
          localStorage.setItem("auth_token", token);
        } catch (error) {
          console.error("Error getting access token:", error);
        }
      } else {
        localStorage.removeItem("auth_token");
      }
    }

    setToken();
  }, [isAuthenticated, getAccessTokenSilently, audience]);
}
