interface AuthConfig {
  domain: string;
  clientId: string;
}

export const authConfig: AuthConfig = {
  domain: process.env.EXPO_PUBLIC_AUTH_DOMAIN ?? "",
  clientId: process.env.EXPO_PUBLIC_AUTH_CLIENTID ?? "",
};
