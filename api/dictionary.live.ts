import { DictionaryListing, DictionaryPosting, ExpressionType } from "@/types/dictionary";
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'

export type DictionaryResponse = {
  status: number;
  body: DictionaryListingBodyResponse |  null;
}

export type DictionaryListingBodyResponse = {
  listings: DictionaryListing[] | null;
  expressiontypes: ExpressionType[] | null;
  message?: string;
}


export const getDictionaryListings = async (id: string): Promise<DictionaryResponse> => {

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

const compressImage = async (uri: string) => {
  const imageContext = ImageManipulator.manipulate(uri);
  const manipulated = await imageContext
      .resize({width: 1000})
      .renderAsync()

  return await manipulated.saveAsync({compress: 0.7, format: SaveFormat.JPEG})
};

export const postDictionary = async (dictionary: DictionaryPosting): Promise<DictionaryResponse> => {
  try {
    const api = process.env.EXPO_PUBLIC_API_ADDRESS;
    const formData = new FormData();
    formData.append("data", JSON.stringify(dictionary))
    if (dictionary.imgsrc) {
      const compressed = await compressImage(dictionary.imgsrc);
      formData.append("image", {
        uri: compressed.uri,
        name: `${dictionary.studentId}.jpg`,
        type: "image/jpeg",
      } as any)

    }

    const response = await fetch(`${api}/dictionary`, {
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data"
      },
      body: formData,
    })
    if (response.status === 404) {
      return {
        status: 404,
        body: null,
      }
    }
    if (response.status === 200) {
      const body = await response.json()
      return {
        status: 200,
        body,
      };

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
