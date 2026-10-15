import { User, UserResponse } from "@/types/user";
import { isApiError } from "../errors";
import { buildFormData } from "../formData";
import { request } from "../request";

// Returns null when the signed-in account hasn't registered a profile yet.
const getUser = async (): Promise<UserResponse | null> => {
  try {
    return await request<UserResponse>("/me");
  } catch (error) {
    if (isApiError(error, 404)) return null;
    throw error;
  }
}

const postUser = async ({ imagesrc, ...user }: User) => {
  const body = await buildFormData(user, imagesrc ? { uri: imagesrc, name: user.username } : undefined);
  await request("/me", { method: "POST", body });
}

export default {
  getUser,
  postUser,
}
