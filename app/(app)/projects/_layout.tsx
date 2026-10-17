import { StudentBorder } from "@/components/StudentBorder";
import { useCurrentStudent } from "@/hooks/useCurrentStudent";
import { Stack } from "expo-router";

export default function Root() {
  const student = useCurrentStudent()
  return (
    <StudentBorder
      student={student}
      title={"프로젝트"}
      subtitle={student ? `${student.name}을 위한 계획을 공유해요` : ""}
    >
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen
          name="index" />
        <Stack.Screen name="new" options={{}} />
      </Stack>
    </StudentBorder>
  )
}
