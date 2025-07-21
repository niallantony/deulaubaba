import { DictionaryListing, DictionaryPosting, ExpressionType } from "@/types/dictionary"
import { createContext, PropsWithChildren, use, useEffect, useState } from "react";
import { useStudent } from "./StudentContext";
import API from "@/api/dictionary";

const DictionaryContext = createContext<{
  dictionary: DictionaryListing[] | null;
  fetchDictionary: (id: string) => void;
  types: ExpressionType[] | null;
  postDictionary: (d: DictionaryPosting) => void;
}>({
  dictionary: null,
  fetchDictionary: () => { },
  types: null,
  postDictionary: () => { },
})

export const useDictionary = () => {
  const value = use(DictionaryContext);
  if (!value) {
    throw new Error("useDictionary must be wrapped in a <DictionaryProvider />");
  }

  return value;
}

export const DictionaryProvider = ({ children }: PropsWithChildren) => {

  const { student } = useStudent();
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
    console.log("Posting", dictionary)
    try {
      const response = await API.postDictionary(dictionary);
      if (response.status === 200) {

      }
    } catch (err) {
      console.error(err);
    }


  }

  return (
    <DictionaryContext.Provider value={{ dictionary, types, fetchDictionary, postDictionary }}>
      {children}
    </DictionaryContext.Provider>
  )

}
