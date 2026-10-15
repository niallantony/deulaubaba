import { DEMO_MODE } from "@/config/demo";
import { Auth0AuthProvider } from "./Auth0AuthProvider";
import { DemoAuthProvider } from "./DemoAuthProvider";

export { useAuth } from "./AuthContext";
export type { AuthUser } from "./AuthContext";

export const AuthProvider = DEMO_MODE ? DemoAuthProvider : Auth0AuthProvider;
