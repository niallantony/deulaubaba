import { useStudent } from "@/context/StudentContext";
import { DictionaryList } from "@/features/dictionary/DictionaryList";
import { NoStudent } from "@/features/student/NoStudent";

export default function DictionaryIndex() {
  const { student } = useStudent();


  if (student) {
    return (<DictionaryList />)
  } else {
    return (<NoStudent />)
  }

}
