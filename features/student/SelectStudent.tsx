import { StudentList } from "@/components/StudentList";
import { ErrorText } from "@/components/ThemedText";
import { useStudents } from "@/hooks/useStudents";

export const SelectStudent = () => {
  const { data } = useStudents();

  if (!data?.students) {
    return (<ErrorText>No Students found</ErrorText>)
  }
  return (<StudentList />)

}
