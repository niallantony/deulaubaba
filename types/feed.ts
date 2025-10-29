import { StudentFeedEmotions } from "@/constants/studentFeedEmotions";
import { UserAvatar } from "./user";

export type StudentFeedEmotionName = keyof typeof StudentFeedEmotions;

export const feedEmotionKeys: StudentFeedEmotionName[] = Object.keys(StudentFeedEmotions) as StudentFeedEmotionName[]

export function getFeedEmotionEmoji(emotion: StudentFeedEmotionName) {
  return StudentFeedEmotions[emotion].emoji;
}

export type FeedItem = {
  id: number;
  user: UserAvatar;
  emotions: StudentFeedEmotionName[] | null;
  body: string;
  createdAt: Date;
}

export type FeedResponse = {
  feed: FeedItem[] | null;
  hasNext: boolean;
}
