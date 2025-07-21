import { DictionaryListing, ExpressionType } from "@/types/dictionary"
import { createContext, PropsWithChildren, use, useEffect, useState } from "react";
import { useStudent } from "./StudentContext";
import { DictionaryListingResponse, getDictionaryListings } from "@/api/dictionary";

const DictionaryContext = createContext<{
  dictionary: DictionaryListing[] | null;
  fetchDictionary: (id: string) => void;
  types: ExpressionType[] | null;
}>({
  dictionary: null,
  fetchDictionary: () => { },
  types: null,
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
      const response = await getDictionaryListings(studentId);
      if (response.status === 200 && response.body) {
        setTypes(response.body.expressiontypes);
        setDictionary(response.body.listings)
      }
      if (response.status === 401) {
        setTypes(null);
        setDictionary(null);
      }
    } catch (err) {
      console.error(err)
    } finally {
    }
  }

  return (
    <DictionaryContext.Provider value={{ dictionary, types, fetchDictionary }}>
      {children}
    </DictionaryContext.Provider>
  )

}
