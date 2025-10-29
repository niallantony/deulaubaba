import { FeedResponse } from "@/types/feed";
import auth0 from "./auth";
import { API_BASE_URL } from "./api";

export type GetFeedResponse = {
  body?: FeedResponse;
  message?: string;
}

const getAccessToken = async () => {
  const credentials = await auth0.credentialsManager.getCredentials();
  return credentials.accessToken;
}

const getFeed = async (id: string, page: number = 0): Promise<GetFeedResponse> => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${API_BASE_URL}/feed/${id}?page=${page}`, {
      method: "GET",
      "headers": {
        "Authorization": `Bearer ${accessToken}`,
      }
    })
    const json = await response.json();
    if (response.status === 404 || response.status === 401 || response.status === 400) {
      return {
        message: json.message
      }
    }
    return {
      body: json.body
    }
  } catch (err) {
    console.error("Feed error: " + err)
  }
  return {
    message: "Server Error"
  }
}

export default {
  getFeed
}
