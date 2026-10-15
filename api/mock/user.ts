import type remote from "../remote/user";
import { GetUserResult, PostUserResult } from "../remote/user";
import { User } from "@/types/user";
import { db, findUser, getCurrentUserId, respond } from "./db";

const getUser = async (): Promise<GetUserResult> => {
  const user = findUser(getCurrentUserId());
  if (!user) {
    return respond({ ok: false, reason: "not_found", user: null });
  }
  return respond({
    ok: true,
    user: {
      name: user.name,
      email: user.email,
      imagesrc: user.imagesrc ?? "",
      role: { id: 1, name: "USER" },
      userType: user.userType,
      username: user.username,
    }
  });
}

const postUser = async (user: User): Promise<PostUserResult> => {
  const userId = getCurrentUserId();
  if (findUser(userId) || db.users.some(u => u.username === user.username)) {
    return respond({ success: false });
  }
  db.users.push({
    userId,
    username: user.username,
    name: user.name,
    email: user.email,
    userType: user.userType,
    imagesrc: user.imagesrc,
  });
  return respond({ success: true });
}

const api: typeof remote = {
  getUser,
  postUser,
}

export default api;
