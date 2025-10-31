import { FeedItem, StudentFeedEmotionName } from "@/types/feed";
import auth0 from "./auth";
import { API_BASE_URL } from "./api";

export type GetFeedResponse = {
  feed?: FeedItem[];
  hasNext?: boolean;
  message?: string;
}

type PostFeedResponse = {
  message?: string;
}

export type PostFeedBody = {
  body: string;
  emotions: StudentFeedEmotionName[] | null;
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
      feed: json.feed,
      hasNext: json.hasNext
    }
  } catch (err) {
    console.error("Feed error: " + err)
  }
  return {
    message: "Server Error"
  }
}

const postFeed = async ({ id, body }: { id: string, body: PostFeedBody }): Promise<PostFeedResponse> => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${API_BASE_URL}/feed/${id}`, {
      method: "POST",
      "headers": {
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    })
    if (response.status === 403 || response.status === 401 || response.status === 404) {
      const json = await response.json();
      return { message: json.message }
    }
    if (response.status === 204) {
      return {
        message: "Comment Posted"
      }
    }
  } catch (err) {
    console.error(err)
  }
  return {
    message: "Server Error"
  }
}

export default {
  getFeed,
  postFeed
}
