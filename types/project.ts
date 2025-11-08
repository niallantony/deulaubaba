import { UserAvatar } from "./user"

export type Project = {
  id: number,
  completed: boolean,
  description: string,
  objective: string,
  imgsrc: string,
  startedOn: Date
}

export type ProjectFeedItem = {
  id: number,
  body: string,
  type: "COMMENT" | "NEW_USER" | "EVENT",
  user: UserAvatar,
  createdAt: Date
}
