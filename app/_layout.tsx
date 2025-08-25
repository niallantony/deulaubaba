import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { theme } from "@/themes/global";
import { SessionProvider, useSession } from "@/context/AuthContext";
import { SplashScreenController } from "@/features/splash";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

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
  const { user } = useSession();
  const insets = useSafeAreaInsets();

  const isSignedIn = !!user;

  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      backgroundColor: theme.colors.background,
    }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isSignedIn}>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="(hidden)/student/add" />
        </Stack.Protected>
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </View>
  )
}
