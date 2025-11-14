import { CommunicationCategory, CommunicationCategoryDTO } from "./dictionary"
import { UserAvatar } from "./user"

export type Project = {
  id: number,
  completed: boolean,
  description?: string,
  objective: string,
  imgsrc?: string,
  startedOn: string,
  categories: CommunicationCategoryDTO[],
  isOwnProject: boolean,
  completedOn: Date | null,
  type: ProjectType,
  userStatuses: {
    user: UserAvatar,
    completed: boolean,
    completedOn: Date | null
  }[],
  studentId: string
}

export type ProjectPostDTO = Omit<Project, "id" | "completed" | "isOwnProject" | "completedOn" | "userStatuses"> & { usernames: string[] }

export type ProjectDetails = Pick<Project, "objective" | "categories" | "imgsrc" | "startedOn" | "description">;

export type ProjectType = "COMMUNICATION" | "CHALLENGE"

export type ProjectPreview = Omit<Project, "categories" | "isOwnProject" | "completedOn" | "projectType" | "userStatuses" | "studentId">

export type ProjectFeedItem = {
  id: number,
  body: string,
  type: "COMMENT" | "NEW_USER" | "EVENT",
  user: UserAvatar,
  createdAt: Date
}
