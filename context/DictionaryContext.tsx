import { DictionaryListing, DictionaryPosting, ExpressionType } from "@/types/dictionary"
import { createContext, PropsWithChildren, use, useEffect, useState } from "react";
import API from "@/api/dictionary";
import { useStudentStore } from "@/store/currentStudent";

const DictionaryContext = createContext<{
  dictionary: DictionaryListing[] | null;
  fetchDictionary: (id: string) => void;
  types: ExpressionType[] | null;
  postDictionary: (d: DictionaryPosting) => void;
  putDictionary: (d: DictionaryPosting, id: number) => void;
  deleteDictionary: (id: number) => void;
}>({
  dictionary: null,
  fetchDictionary: () => { },
  types: null,
  postDictionary: () => { },
  putDictionary: () => { },
  deleteDictionary: () => { },
})

export const useDictionary = () => {
  const value = use(DictionaryContext);
  if (!value) {
    throw new Error("useDictionary must be wrapped in a <DictionaryProvider />");
  }

  return value;
}

export const DictionaryProvider = ({ children }: PropsWithChildren) => {

  const student = useStudentStore((s) => s.student)
  const [dictionary, setDictionary] = useState<DictionaryListing[] | null>(null)
  const [types, setTypes] = useState<ExpressionType[] | null>(null)

  useEffect(() => {
    if (student?.studentId) {
      fetchDictionary(student.studentId)
    }
  }, [student])

  const fetchDictionary = async (studentId: string) => {
    try {
      const response = await API.getDictionaryListings(studentId);
      if (response.status === 200 && response.body) {
        setTypes(response.body.expressiontypes);
        setDictionary(response.body.listings)
      }
      if (response.status === 204) {
        setTypes(null);
        setDictionary(null);
      }
      // TODO: Student not found error handling
      if (response.status === 404) {
        setTypes(null);
        setDictionary(null);
      }
    } catch (err) {
      console.error(err)
    }
  }

  const postDictionary = async (dictionary: DictionaryPosting) => {
    try {
      const response = await API.postDictionary(dictionary);
      if (response.status === 200) {
        if (student?.studentId) {
          await fetchDictionary(student?.studentId)
        }

      }
    } catch (err) {
      console.error(err);
    }
  }

  const putDictionary = async (dictionary: DictionaryPosting, id: number) => {
    try {
      const response = await API.putDictionary(dictionary, id);
      console.log(response)
      if (response.status === 200 && student?.studentId) {
        await fetchDictionary(student?.studentId)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const deleteDictionary = async (id: number) => {
    try {
      const response = await API.deleteDictionary(id);
      console.log(response)
      if (response.status === 204 && student?.studentId) {
        fetchDictionary(student?.studentId);
      }
      return response.status
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DictionaryContext.Provider value={{ dictionary, types, fetchDictionary, postDictionary, putDictionary, deleteDictionary }}>
      {children}
    </DictionaryContext.Provider>
  )

}
