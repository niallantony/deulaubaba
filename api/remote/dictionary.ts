import { DictionaryListing, DictionaryPosting, ExpressionType } from "@/types/dictionary";
import { buildFormData } from "../formData";
import { request } from "../request";

export type DictionaryListings = {
  listings: DictionaryListing[];
  expressiontypes: ExpressionType[];
}

const getDictionaryListings = async (id: string): Promise<DictionaryListings> => {
  // The server answers 204 (no body) when the student has no entries yet.
  const body = await request<Partial<DictionaryListings> | undefined>(`/dictionary?student_id=${id}`);
  return {
    listings: body?.listings ?? [],
    expressiontypes: body?.expressiontypes ?? [],
  }
}

const toFormData = ({ imgsrc, ...data }: DictionaryPosting & { id?: number }) =>
  buildFormData(data, imgsrc ? { uri: imgsrc, name: data.studentId } : undefined);

const postDictionary = async (dictionary: DictionaryPosting) => {
  await request("/dictionary", { method: "POST", body: await toFormData(dictionary) });
}

const putDictionary = async ({ dictionary, id }: { dictionary: DictionaryPosting, id: number }) => {
  await request("/dictionary", { method: "PUT", body: await toFormData({ id, ...dictionary }) });
}

const deleteDictionary = (id: number) =>
  request(`/dictionary/${id}`, { method: "DELETE" });

export default {
  deleteDictionary,
  getDictionaryListings,
  postDictionary,
  putDictionary
}
