import { useSession } from "@/context/AuthContext"
import { SplashScreen } from "expo-router";

export const SplashScreenController = () => {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
