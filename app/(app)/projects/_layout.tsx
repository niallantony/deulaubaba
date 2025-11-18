import { StudentBorder } from "@/components/StudentBorder";
import { useStudentStore } from "@/store/currentStudent";
import { useModal } from "@/hooks/useModal";
import { Stack } from "expo-router";

export default function Root() {
  const student = useStudentStore((s) => s.student)
  const { show } = useModal()
  return (
    <StudentBorder
      student={student}
      showModal={show}
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
