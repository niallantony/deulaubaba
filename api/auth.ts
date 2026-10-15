import { authConfig } from "@/config/authConfig";
import Auth0 from "react-native-auth0";

let auth0: Auth0 | null = null;

// Created lazily so demo mode can run without Auth0 credentials configured.
export const getAuth0 = () => {
  if (!auth0) {
    if (!authConfig.domain || !authConfig.clientId) {
      throw new Error(
        'Missing Auth0 credentials. Please add EXPO_PUBLIC_AUTH_DOMAIN and EXPO_PUBLIC_AUTH_CLIENTID to your environment variables.'
      );
    }
    auth0 = new Auth0({
      domain: authConfig.domain,
      clientId: authConfig.clientId,
    })
  }
  return auth0;
}

export const getAccessToken = async () => {
  const credentials = await getAuth0().credentialsManager.getCredentials();
  return credentials.accessToken;
}
