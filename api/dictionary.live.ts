import { DictionaryListing, ExpressionType } from "@/types/dictionary";

export type DictionaryListingResponse = {
  status: number;
  body: DictionaryListingBodyResponse | null;
}

export type DictionaryListingBodyResponse = {
  listings: DictionaryListing[] | null;
  expressiontypes: ExpressionType[] | null;
  message?: string;
}

export const getDictionaryListings = async (id: string): Promise<DictionaryListingResponse> => {

  try {
    const api = process.env.EXPO_PUBLIC_API_ADDRESS;

    const response = await fetch(`${api}/dictionary?student_id=${id}`, {
      method: "GET"
    })
    if (response.status === 404) {
      return {
        status: 404,
        body: {
          listings: null,
          expressiontypes: null,
          message: "Student not found",
        },
      }
    }
    if (response.status === 204) {
      return {
        status: 204,
        body: {
          listings: null,
          expressiontypes: null,
          message: "No Entries",
        },
      }
    }
    const body: DictionaryListingBodyResponse = await response.json()
    if (response.status === 200) {
      return {
        status: 200,
        body,
      }
    }
  } catch (err) {
    console.error(err)
  }
  return {
    status: 503,
    body: {
      listings: null,
      expressiontypes: null,
      message: "No Response from Server"
    },
  }
}

export const PostDictionary = (d) => {

}
