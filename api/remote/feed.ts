import { FeedItem, StudentFeedEmotionName } from "@/types/feed";
import { request } from "../request";

export type GetFeedResponse = {
  feed: FeedItem[];
  hasNext: boolean;
}

export type PostFeedBody = {
  body: string;
  emotions: StudentFeedEmotionName[] | null;
}

const getFeed = (id: string, page: number = 0) =>
  request<GetFeedResponse>(`/feed/${id}?page=${page}`);

const postFeed = ({ id, body }: { id: string, body: PostFeedBody }) =>
  request(`/feed/${id}`, { method: "POST", body });

const deleteFeedItem = (id: string) =>
  request(`/feed/${id}`, { method: "DELETE" });

export default {
  getFeed,
  postFeed,
  deleteFeedItem
}
