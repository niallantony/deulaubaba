import { DictionaryListing, DictionaryPosting, ExpressionType } from "@/types/dictionary";
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'
import { API_BASE_URL } from "./api";
import auth0 from "./auth";

export type DictionaryResponse = {
  status: number;
  body: DictionaryListingBodyResponse | null;
}

export type DictionaryListingBodyResponse = {
  listings: DictionaryListing[] | null;
  expressiontypes: ExpressionType[] | null;
  message?: string;
}

const getAccessToken = async () => {
  const credentials = await auth0.credentialsManager.getCredentials();
  return credentials.accessToken;
}

const getDictionaryListings = async (id: string): Promise<DictionaryResponse> => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${API_BASE_URL}/dictionary?student_id=${id}`, {
      method: "GET",
      "headers": {
        "Authorization": `Bearer ${accessToken}`,
      }
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
    .resize({ width: 1000 })
    .renderAsync()

  return await manipulated.saveAsync({ compress: 0.7, format: SaveFormat.JPEG })
};

const postDictionary = async (dictionary: DictionaryPosting): Promise<DictionaryResponse> => {
  try {
    const accessToken = await getAccessToken();
    const formData = new FormData();
    const { imgsrc, ...dictionaryData } = dictionary;
    formData.append("data", JSON.stringify(dictionaryData))
    if (imgsrc) {
      const compressed = await compressImage(imgsrc);
      formData.append("image", {
        uri: compressed.uri,
        name: `${dictionary.studentId}.jpg`,
        type: "image/jpeg",
      } as any)

    }

    const response = await fetch(`${API_BASE_URL}/dictionary`, {
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data",
        "Authorization": `Bearer ${accessToken}`
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

const putDictionary = async ({ dictionary, id }: { dictionary: DictionaryPosting, id: number }): Promise<DictionaryResponse> => {
  try {
    const accessToken = await getAccessToken();
    const formData = new FormData();
    const { imgsrc, ...dictionaryData } = dictionary;
    formData.append("data", JSON.stringify({ id, ...dictionaryData }))
    if (imgsrc) {
      const compressed = await compressImage(imgsrc);
      formData.append("image", {
        uri: compressed.uri,
        name: `${dictionary.studentId}.jpg`,
        type: "image/jpeg",
      } as any)

    }

    const response = await fetch(`${API_BASE_URL}/dictionary`, {
      method: "PUT",
      headers: {
        "Content-type": "multipart/form-data",
        "Authorization": `Bearer ${accessToken}`
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

const deleteDictionary = async (id: number): Promise<{ status: number }> => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${API_BASE_URL}/dictionary/${id}`, {
      method: "DELETE",
      "headers": {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    if (response.status === 404) {
      return {
        status: 404,
      }
    }
    if (response.status === 204) {
      return {
        status: 204,
      };

    }
  } catch (err) {
    console.error(err)
  }
  return {
    status: 503,
  }
}

export default {
  deleteDictionary,
  getDictionaryListings,
  postDictionary,
  putDictionary
}
