import { DictionaryList } from "@/features/dictionary/DictionaryList";
import { NoSelectedStudent } from "@/features/student/NoSelectedStudent";
import { useStudentStore } from "@/store/currentStudent";

export default function DictionaryIndex() {
  const studentId = useStudentStore((s) => s.studentId)


  if (studentId) {
    return (<DictionaryList />)
  } else {
    return (<NoSelectedStudent />)
  }

}
