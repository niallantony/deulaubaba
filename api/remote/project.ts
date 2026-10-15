import { Project, ProjectDetails, ProjectFeedItem, ProjectPostDTO, ProjectPreview } from "@/types/project";
import { buildFormData } from "../formData";
import { request } from "../request";

export type AllProjectsResponse = {
  current: ProjectPreview[];
  pending: ProjectPreview[];
  completed: ProjectPreview[];
}

export type ProjectFeedResponse = {
  feed: ProjectFeedItem[]
}

// Project and comment IDs are numbers on the server, but arrive as strings from
// route params, so accept either.
type Id = number | string;

const getProjectsOfStudent = (studentId: string) =>
  request<AllProjectsResponse>(`/project/all/${studentId}`);

const getProject = (id: Id) =>
  request<Project>(`/project?id=${id}`);

const postProject = async ({ imgsrc, ...project }: ProjectPostDTO) => {
  const body = await buildFormData(project, imgsrc ? { uri: imgsrc, name: project.studentId } : undefined);
  await request("/project", { method: "POST", body });
}

const updateProjectStatus = ({ id, value }: { id: Id, value: boolean }) =>
  request(`/project/status/${id}`, { method: "PATCH", body: { isCompleted: value } });

const updateProjectDetails = async ({ id, projectDetails, studentId }: {
  id: Id,
  projectDetails: ProjectDetails,
  studentId: string,
}) => {
  const { imgsrc, ...details } = projectDetails;
  const body = await buildFormData(details, imgsrc ? { uri: imgsrc, name: studentId } : undefined);
  await request(`/project/${id}`, { method: "PATCH", body });
}

const addUserToProject = ({ id, toAdd }: { id: Id, toAdd: string[] }) =>
  request(`/project/${id}/add-user`, { method: "PATCH", body: { toAdd } });

const deleteProject = (id: Id) =>
  request(`/project/${id}`, { method: "DELETE" });

const getProjectFeed = (id: Id) =>
  request<ProjectFeedResponse>(`/project/${id}/feed`);

const postProjectComment = ({ id, body }: { id: Id, body: string }) =>
  request(`/project/${id}/comment`, { method: "POST", body: { body } });

const deleteComment = (id: Id) =>
  request(`/project/comment/${id}`, { method: "DELETE" });

export default {
  getProjectsOfStudent,
  postProject,
  getProject,
  updateProjectStatus,
  updateProjectDetails,
  addUserToProject,
  deleteProject,
  getProjectFeed,
  postProjectComment,
  deleteComment
}
