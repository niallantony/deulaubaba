import { ReactNode, useMemo } from "react";
import { Auth0Provider, useAuth0 } from "react-native-auth0";
import { authConfig } from "@/config/authConfig";
import { AuthContext, AuthContextValue } from "./AuthContext";

const Auth0Bridge = ({ children }: { children: ReactNode }) => {
  const { user, authorize, clearSession } = useAuth0();

  const value = useMemo<AuthContextValue>(() => ({
    user: user?.sub ? { sub: user.sub, email: user.email, picture: user.picture } : null,
    login: async () => {
      await authorize({
        audience: "https://deulaubaba/api",
        scope: "openid offline_access profile email",
      });
    },
    logout: async () => {
      await clearSession();
    },
  }), [user, authorize, clearSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const Auth0AuthProvider = ({ children }: { children: ReactNode }) => (
  <Auth0Provider domain={authConfig.domain} clientId={authConfig.clientId}>
    <Auth0Bridge>{children}</Auth0Bridge>
  </Auth0Provider>
)
