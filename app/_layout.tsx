import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { theme } from "@/themes/global";
import { SessionProvider, useSession } from "@/context/AuthContext";
import { SplashScreenController } from "@/features/splash";

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <SplashScreenController />
        <RootNavigator />
      </SessionProvider>
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();

  return (
    <Stack>
      <Stack.Protected guard={session}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  )
}
