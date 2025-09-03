import { DictionaryList } from "@/features/dictionary/DictionaryList";
import { NoSelectedStudent } from "@/features/student/NoSelectedStudent";
import { useStudentStore } from "@/store/currentStudent";

export default function DictionaryIndex() {
  const student = useStudentStore((s) => s.student)


  if (student) {
    return (<DictionaryList />)
  } else {
    return (<NoSelectedStudent />)
  }

}
