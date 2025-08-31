import { StudentBorder } from "@/components/StudentBorder";
import { useStudentStore } from "@/store/currentStudent";
import { Stack } from "expo-router";

export default function Root() {
  const student = useStudentStore((s) => s.student)
  return (
    <StudentBorder title={"의사소통 사전"} subtitle={student ? `${student.name}이 어떻게 표현하나요?` : ""}>
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen
          name="index" />
        <Stack.Screen name="viewList/[extype]/index" />
        <Stack.Screen name="new" />
      </Stack>
    </StudentBorder>
  )
}
