import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { theme } from "@/themes/global";
import { SessionProvider } from "@/context/AuthContext";
import { SplashScreenController } from "@/features/splash";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { authConfig } from "@/config/authConfig";
import { useAuth0, Auth0Provider } from "react-native-auth0";
import { UserProvider, useUser } from "@/context/UserContext";
import { useEffect } from "react";

export default function RootLayout() {


  return (

    <Auth0Provider domain={authConfig.domain} clientId={authConfig.clientId}  >
      <UserProvider>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <SplashScreenController />
            <RootNavigator />
          </SessionProvider>
        </ThemeProvider>
      </UserProvider>
    </Auth0Provider>
  );
}

function RootNavigator() {
  const { user } = useAuth0();
  const insets = useSafeAreaInsets();
  const { isUser, getUser } = useUser();

  const isSignedIn = user !== undefined && user !== null;
  console.log(isSignedIn, isUser)
  console.log(user)
  useEffect(() => {
    try {
      getUser();
    } catch (e) {
      console.log(e)
    }
  }, [user])

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
        <Stack.Protected guard={isSignedIn && isUser}>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="(hidden)/student/add" />
        </Stack.Protected>
        <Stack.Protected guard={isSignedIn && !isUser}>
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </View>
  )
}
