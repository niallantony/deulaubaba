import type remote from "../remote/user";
import { ApiError } from "../errors";
import { User, UserResponse } from "@/types/user";
import { db, findUser, getCurrentUserId, respond } from "./db";

const getUser = async (): Promise<UserResponse | null> => {
  const user = findUser(getCurrentUserId());
  if (!user) return respond(null);
  return respond({
    name: user.name,
    email: user.email,
    imagesrc: user.imagesrc ?? "",
    role: { id: 1, name: "USER" },
    userType: user.userType,
    username: user.username,
  });
}

const postUser = async (user: User) => {
  const userId = getCurrentUserId();
  if (!user.name || !user.username || !user.userType) {
    throw new ApiError(400, "Missing required user fields");
  }
  if (db.users.some(u => u.username === user.username)) {
    throw new ApiError(400, "Username is already taken");
  }
  if (findUser(userId)) {
    throw new ApiError(400, "User already registered");
  }
  db.users.push({
    userId,
    username: user.username,
    name: user.name,
    email: user.email,
    userType: user.userType,
    imagesrc: user.imagesrc,
  });
  return respond(undefined);
}

const api: typeof remote = {
  getUser,
  postUser,
}

export default api;
