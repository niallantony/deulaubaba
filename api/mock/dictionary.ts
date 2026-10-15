import type remote from "../remote/dictionary";
import { DictionaryResponse } from "../remote/dictionary";
import { DictionaryPosting, ExpressionType } from "@/types/dictionary";
import { authorisedStudent, db, newId, respond } from "./db";

const getDictionaryListings = async (id: string): Promise<DictionaryResponse> => {
  const student = authorisedStudent(id);
  const listings = db.dictionary
    .filter(entry => entry.studentId === student.studentId)
    .map(({ studentId, ...entry }) => entry);
  if (listings.length === 0) {
    return respond({ status: 200, body: { listings: null, expressiontypes: null } });
  }
  const expressiontypes = [...new Set<ExpressionType>(listings.map(entry => entry.type))];
  return respond({ status: 200, body: { listings, expressiontypes } });
}

const postDictionary = async (dictionary: DictionaryPosting): Promise<DictionaryResponse> => {
  authorisedStudent(dictionary.studentId);
  db.dictionary.push({ id: newId(), ...dictionary });
  return respond({ status: 200, body: null });
}

const putDictionary = async ({ dictionary, id }: { dictionary: DictionaryPosting, id: number }): Promise<DictionaryResponse> => {
  authorisedStudent(dictionary.studentId);
  const entry = db.dictionary.find(e => e.id === id);
  if (!entry) {
    return respond({ status: 404, body: null });
  }
  Object.assign(entry, { ...dictionary, imgsrc: dictionary.imgsrc ?? entry.imgsrc });
  return respond({ status: 200, body: null });
}

const deleteDictionary = async (id: number): Promise<{ status: number }> => {
  const entry = db.dictionary.find(e => e.id === id);
  if (!entry) {
    return respond({ status: 404 });
  }
  authorisedStudent(entry.studentId);
  db.dictionary = db.dictionary.filter(e => e.id !== id);
  return respond({ status: 204 });
}

const api: typeof remote = {
  deleteDictionary,
  getDictionaryListings,
  postDictionary,
  putDictionary,
}

export default api;
