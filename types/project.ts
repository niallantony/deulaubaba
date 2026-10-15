import { CommunicationCategory, CommunicationCategoryDTO } from "./dictionary"
import { UserAvatar } from "./user"

export type Project = {
  id: number,
  completed: boolean,
  description?: string,
  objective: string,
  imagesrc?: string,
  startedOn: string,
  categories: CommunicationCategoryDTO[],
  ownProject: boolean,
  completedOn: string | null,
  type: ProjectType,
  userStatuses: {
    user: UserAvatar,
    completed: boolean,
    completedOn: Date | null
  }[],
  studentId: string
}

// What the app sends: categories go up as plain labels, but come back from the
// server as { id, label } objects (see Project above).
export type ProjectDetails = Pick<Project, "objective" | "imagesrc" | "startedOn" | "description"> & {
  categories: CommunicationCategory[],
}

export type ProjectPostDTO = ProjectDetails & Pick<Project, "type" | "studentId"> & { usernames: string[] }

export type ProjectType = "COMMUNICATION" | "CHALLENGE"

export type ProjectPreview = Omit<Project, "categories" | "ownProject" | "type" | "userStatuses" | "studentId">

export type ProjectFeedItem = {
  id: number,
  body: string,
  type: "COMMENT" | "NEW_USER" | "EVENT",
  user: UserAvatar,
  createdAt: Date
}
