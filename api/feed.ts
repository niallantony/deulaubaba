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
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}/feed/${id}?page=${page}`, {
    method: "GET",
    "headers": {
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  const json = await response.json();
  if (response.ok) {
    return {
      feed: json.feed,
      hasNext: json.hasNext
    }
  }
  throw new Error(json.message ? json.message : "Server Error")
}

const postFeed = async ({ id, body }: { id: string, body: PostFeedBody }) => {
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}/feed/${id}`, {
    method: "POST",
    "headers": {
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    const json = await response.json();
    return { message: json.message }
  }
}

const deleteFeedItem = async (id: string) => {
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}/feed/${id}`, {
    method: "DELETE",
    "headers": {
      "Authorization": `Bearer ${accessToken}`,
    },
  })
  if (!response.ok) {
    const json = await response.json();
    return { message: json.message }
  }
}




export default {
  getFeed,
  postFeed,
  deleteFeedItem
}
