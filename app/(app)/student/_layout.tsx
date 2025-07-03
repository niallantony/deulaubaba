import { Stack } from "expo-router";
import { StudentBorder } from "@/components/StudentBorder";

export default function Root() {
  return (
    <StudentBorder title={"프로필"} subtitle={"A profile"}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
        />
        <Stack.Screen
          name="edit"
        />
      </Stack>
    </StudentBorder>
  )
}
