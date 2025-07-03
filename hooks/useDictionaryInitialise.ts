import { getDictionaryListings } from "@/api/dictionary";
import { DictionaryListing, ExpressionType } from "@/types/dictionary";
import { useState } from "react"

export const useDictionaryInitialise = () => {
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<DictionaryListing[] | null>(null);
  const [filtered, setFiltered] = useState<DictionaryListing[] | null>(null);
  const [expressionTypes, setExpressionTypes] = useState<ExpressionType[] | null>(null);

  const fetchEntries = async (studentId: string) => {
    try {
      setLoading(true);
      const response = await getDictionaryListings(studentId);
      if (response.status === 200 && response.body) {
        setExpressionTypes(response.body.expressiontypes)
        setEntries(response.body.listings)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  }

  const filterEntries = (expression: ExpressionType): DictionaryListing[] | null => {
    const filteredExpressions = entries?.filter((entry) => entry.type === expression);
    if (filteredExpressions) {
      return filteredExpressions;
    }
    return null;
  }

  return { loading, filtered, filterEntries, expressionTypes, fetchEntries }
}
