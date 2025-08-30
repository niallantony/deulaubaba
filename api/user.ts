import { User, UserResponse } from "@/types/user";
import { API_BASE_URL } from "./api";
import auth0 from "./auth";
import { RegistrationErrorType } from "@/types/registrationErrors";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

type GetUserResult =
  | { ok: true; user: UserResponse }
  | { ok: false; user: null; reason: "not_found" }
  | { ok: false; user: null; reason: "error"; error: unknown }

export type PostUserResult = {
  success: boolean;
  errors?: RegistrationErrorType;
}

const getAccessToken = async () => {
  const credentials = await auth0.credentialsManager.getCredentials();
  return credentials.accessToken;
}

const getUser = async (): Promise<GetUserResult> => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: "GET",
      "headers": {
        "Authorization": `Bearer ${accessToken}`,
        "Content-type": "application/json",
      }
    })
    if (response.status === 404) {
      return { ok: false, reason: "not_found", user: null };
    } else if (response.status === 401) {
      throw new Error("Invalid Token");
    }
    const json: UserResponse = await response.json();
    return { ok: true, user: json };
  } catch (e) {
    return { ok: false, reason: "error", error: e, user: null };
  }
}

const compressImage = async (uri: string) => {
  const imageContext = ImageManipulator.manipulate(uri);
  const manipulated = await imageContext
    .resize({ width: 1000 })
    .renderAsync()

  return await manipulated.saveAsync({ compress: 0.7, format: SaveFormat.JPEG })
};

const postUser = async (user: User): Promise<PostUserResult> => {
  try {
    const formData = new FormData()
    const accessToken = await getAccessToken();
    formData.append("data", JSON.stringify({
      name: user.name,
      userType: user.userType,
      username: user.username,
      email: user.email,
    }))
    if (user.imagesrc) {
      const compressed = await compressImage(user.imagesrc);
      formData.append("image", {
        uri: compressed.uri,
        name: `${user.username}.jpg`,
        type: "image/jpeg",
      } as any)
    }
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: "POST",
      "headers": {
        "Authorization": `Bearer ${accessToken}`,
        "Content-type": "multipart/form-data",
      },
      "body": formData
    })

    console.log(response)
    if (response.status === 200) {
      return { success: true }
    }
  } catch (e) {
    console.error(e)
    return { success: false }
  }
  return { success: false }
}

export default {
  getUser,
  postUser,
}

