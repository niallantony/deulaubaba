import type remote from "../remote/feed";
import { GetFeedResponse, PostFeedBody } from "../remote/feed";
import { ApiError } from "../errors";
import { authorisedStudent, db, findUser, getCurrentUserId, newId, now, respond, toAvatar } from "./db";

const PAGE_SIZE = 10;

const getFeed = async (id: string, page: number = 0): Promise<GetFeedResponse> => {
  const student = authorisedStudent(id);
  const items = db.feed
    .filter(item => item.studentId === student.studentId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const feed = items
    .slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
    .map(({ studentId, userId, ...item }) => ({ ...item, user: toAvatar(findUser(userId)) }));
  return respond({ feed, hasNext: items.length > (page + 1) * PAGE_SIZE });
}

const postFeed = async ({ id, body }: { id: string, body: PostFeedBody }) => {
  if (!body.body.trim()) {
    throw new ApiError(400, "Empty body");
  }
  const student = authorisedStudent(id);
  db.feed.push({
    id: newId(),
    studentId: student.studentId,
    userId: getCurrentUserId(),
    emotions: body.emotions ?? [],
    body: body.body,
    createdAt: now(),
  });
  return respond(undefined);
}

const deleteFeedItem = async (id: string) => {
  const item = db.feed.find(i => i.id === Number(id));
  if (!item) {
    throw new ApiError(404, "Comment not found");
  }
  if (item.userId !== getCurrentUserId()) {
    throw new ApiError(401, "Unauthorized access");
  }
  db.feed = db.feed.filter(i => i !== item);
  return respond(undefined);
}

const api: typeof remote = {
  getFeed,
  postFeed,
  deleteFeedItem,
}

export default api;
