interface AuthConfig {
  domain: string;
  clientId: string;
}

export const authConfig: AuthConfig = {
  domain: process.env.EXPO_PUBLIC_AUTH_DOMAIN ?? (() => { throw new Error("Missing domain"); })(),
  clientId: process.env.EXPO_PUBLIC_AUTH_CLIENTID ?? (() => { throw new Error("Missing clientId"); })(),
};

