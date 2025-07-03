import { StudentBorder } from "@/components/StudentBorder";
import { DictionaryProvider } from "@/context/DictionaryContext";
import { Stack } from "expo-router";

export default function Root() {
  return (
    <DictionaryProvider>
      <StudentBorder title={"프로필"} subtitle={"A profile"}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index" />
          <Stack.Screen name="viewList" />
        </Stack>
      </StudentBorder>
    </DictionaryProvider>
  )
}
