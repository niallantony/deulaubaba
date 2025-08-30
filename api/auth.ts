import { authConfig } from "@/config/authConfig";
import Auth0 from "react-native-auth0";

const AUTH0_DOMAIN = authConfig.domain
const AUTH0_CLIENTID = authConfig.clientId

if (!AUTH0_DOMAIN || !AUTH0_CLIENTID) {
  throw new Error(
    'Missing Auth0 credentials. Please add AUTH0_DOMAIN and AUTH0_CLIENT_ID to your environment variables.'
  );
}

const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENTID,
})

export default auth0
