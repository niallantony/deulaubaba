import { NoSelectedStudent } from "@/features/student/NoSelectedStudent"
import { useStudentStore } from "@/store/currentStudent"
import { Text } from "react-native"

export default function Route() {
  const student = useStudentStore((s) => s.student)

  if (student) {
    return (
      <Text>
        Hello
      </Text>
    )
  } else {
    return (<NoSelectedStudent />)
  }
}
