import type remote from "../remote/dictionary";
import { DictionaryListings } from "../remote/dictionary";
import { ApiError } from "../errors";
import { DictionaryPosting, ExpressionType } from "@/types/dictionary";
import { authorisedStudent, db, newId, respond } from "./db";

const findEntry = (id: number) => {
  const entry = db.dictionary.find(e => e.id === id);
  if (!entry) throw new ApiError(404, "Entry not found");
  return entry;
}

const validate = (dictionary: DictionaryPosting) => {
  if (!dictionary.title || dictionary.category.length === 0 || !dictionary.type) {
    throw new ApiError(400, "Entry data not valid");
  }
}

const getDictionaryListings = async (id: string): Promise<DictionaryListings> => {
  const student = authorisedStudent(id);
  const listings = db.dictionary
    .filter(entry => entry.studentId === student.studentId)
    .map(({ studentId, ...entry }) => entry);
  const expressiontypes = [...new Set<ExpressionType>(listings.map(entry => entry.type))];
  return respond({ listings, expressiontypes });
}

const postDictionary = async (dictionary: DictionaryPosting) => {
  validate(dictionary);
  authorisedStudent(dictionary.studentId);
  db.dictionary.push({ id: newId(), ...dictionary });
  return respond(undefined);
}

const putDictionary = async ({ dictionary, id }: { dictionary: DictionaryPosting, id: number }) => {
  validate(dictionary);
  authorisedStudent(dictionary.studentId);
  const entry = findEntry(id);
  Object.assign(entry, { ...dictionary, imgsrc: dictionary.imgsrc ?? entry.imgsrc });
  return respond(undefined);
}

const deleteDictionary = async (id: number) => {
  const entry = findEntry(id);
  authorisedStudent(entry.studentId);
  db.dictionary = db.dictionary.filter(e => e !== entry);
  return respond(undefined);
}

const api: typeof remote = {
  deleteDictionary,
  getDictionaryListings,
  postDictionary,
  putDictionary,
}

export default api;
