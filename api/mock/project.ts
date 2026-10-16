import type remote from "../remote/project";
import { AllProjectsResponse, ProjectFeedResponse } from "../remote/project";
import { ApiError } from "../errors";
import { categoryKeys, CommunicationCategory } from "@/types/dictionary";
import { Project, ProjectDetails, ProjectFeedItem, ProjectPostDTO, ProjectPreview } from "@/types/project";
import { authorisedStudent, db, DbProject, DbUser, findUser, getCurrentUserId, newId, now, respond, toAvatar, today } from "./db";

const toCategoryDTO = (label: CommunicationCategory) => ({ id: categoryKeys.indexOf(label) + 1, label });


const findProject = (id: string | number) => {
  const project = db.projects.find(p => p.id === Number(id));
  if (!project) throw new ApiError(404, "Project not found");
  return project;
}

const assignedProject = (id: string | number) => {
  const project = findProject(id);
  if (!project.users.some(u => u.userId === getCurrentUserId())) throw new ApiError(401, "Unauthorized access");
  return project;
}

const createdProject = (id: string | number) => {
  const project = findProject(id);
  if (project.createdBy !== getCurrentUserId()) throw new ApiError(401, "Unauthorized access");
  return project;
}

const addEvent = (project: DbProject, body: string) => {
  db.projectFeed.push({ id: newId(), projectId: project.id, userId: null, type: "EVENT", body, createdAt: now() });
}

const addNewUserMessage = (project: DbProject, user: DbUser) => {
  db.projectFeed.push({
    id: newId(),
    projectId: project.id,
    userId: user.userId,
    type: "NEW_USER",
    body: `New user added: ${user.userType}`,
    createdAt: now(),
  });
}

const getProjectsOfStudent = async (id: string): Promise<AllProjectsResponse> => {
  const student = authorisedStudent(id);
  const userId = getCurrentUserId();
  const collections: Required<AllProjectsResponse> = { current: [], pending: [], completed: [] };
  db.projects
    .filter(p => p.studentId === student.studentId && p.users.some(u => u.userId === userId))
    .forEach(p => {
      const preview: ProjectPreview = {
        id: p.id,
        completed: p.completed,
        description: p.description,
        objective: p.objective,
        imagesrc: p.imagesrc,
        startedOn: p.startedOn,
        completedOn: p.completedOn,
      };
      if (p.completed) collections.completed.push(preview);
      else if (p.startedOn > today()) collections.pending.push(preview);
      else collections.current.push(preview);
    });
  return respond(collections);
}

const getProject = async (id: string | number): Promise<Project> => {
  const project = assignedProject(id);
  return respond({
    id: project.id,
    objective: project.objective,
    description: project.description,
    imagesrc: project.imagesrc,
    startedOn: project.startedOn,
    completed: project.completed,
    completedOn: project.completedOn,
    type: project.type,
    studentId: project.studentId,
    categories: project.categories.map(toCategoryDTO),
    ownProject: project.createdBy === getCurrentUserId(),
    userStatuses: project.users.map(u => ({
      user: toAvatar(findUser(u.userId)),
      completed: u.completed,
      completedOn: u.completedOn,
    })),
  });
}

const postProject = async (post: ProjectPostDTO) => {
  authorisedStudent(post.studentId);
  if (!post.startedOn || !post.type || post.usernames.length === 0) {
    throw new ApiError(400, "Invalid request");
  }
  const users = db.users.filter(u => post.usernames.includes(u.username));
  const project: DbProject = {
    id: newId(),
    studentId: post.studentId,
    createdBy: getCurrentUserId(),
    objective: post.objective,
    description: post.description,
    imagesrc: post.imagesrc,
    startedOn: post.startedOn,
    completed: false,
    completedOn: null,
    type: post.type,
    categories: post.categories,
    users: users.map(u => ({ userId: u.userId, completed: false, completedOn: null })),
  };
  db.projects.push(project);
  addEvent(project, "프로젝트 등록되었다");
  users.forEach(u => addNewUserMessage(project, u));
  return respond(undefined);
}

const updateProjectStatus = async ({ id, value }: { id: string | number, value: boolean }) => {
  const project = findProject(id);
  const relation = project.users.find(u => u.userId === getCurrentUserId());
  if (!relation) throw new ApiError(404, "Project user not found");
  if (relation.completed !== value) {
    relation.completed = value;
    relation.completedOn = value ? today() : null;
    if (project.users.every(u => u.completed) && !project.completed) {
      project.completed = true;
      project.completedOn = today();
      addEvent(project, "프로젝트 완료되었다");
    } else if (project.users.some(u => !u.completed) && project.completed) {
      project.completed = false;
      project.completedOn = null;
    }
  }
  return respond(undefined);
}

const updateProjectDetails = async ({ id, projectDetails }: { id: string | number, projectDetails: ProjectDetails, studentId: string }) => {
  const project = createdProject(id);
  if (!projectDetails.objective || !projectDetails.startedOn || projectDetails.categories.length === 0) {
    throw new ApiError(400, "Invalid patch request");
  }
  project.objective = projectDetails.objective;
  project.description = projectDetails.description;
  project.startedOn = projectDetails.startedOn;
  project.categories = projectDetails.categories;
  if (projectDetails.imagesrc) project.imagesrc = projectDetails.imagesrc;
  addEvent(project, "프로젝트 업데이트 되었습니다");
  return respond(undefined);
}

const addUserToProject = async ({ id, toAdd }: { id: string | number, toAdd: string[] }) => {
  const project = createdProject(id);
  const newUsers = db.users.filter(u =>
    toAdd.includes(u.username) && !project.users.some(pu => pu.userId === u.userId)
  );
  newUsers.forEach(u => {
    project.users.push({ userId: u.userId, completed: false, completedOn: null });
    addNewUserMessage(project, u);
  });
  return respond(undefined);
}

const deleteProject = async (id: string | number) => {
  const project = createdProject(id);
  db.projects = db.projects.filter(p => p !== project);
  db.projectFeed = db.projectFeed.filter(item => item.projectId !== project.id);
  return respond(undefined);
}

const getProjectFeed = async (id: string | number): Promise<ProjectFeedResponse> => {
  const project = assignedProject(id);
  const feed = db.projectFeed
    .filter(item => item.projectId === project.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id - a.id)
    .map(({ projectId, userId, ...item }): ProjectFeedItem =>
      item.type === "EVENT"
        ? { ...item, type: item.type, user: null }
        : { ...item, type: item.type, user: toAvatar(findUser(userId!)) }
    );
  return respond({ feed });
}

const postProjectComment = async ({ id, body }: { id: string | number, body: string }) => {
  const project = assignedProject(id);
  if (!body.trim()) throw new ApiError(400, "Comment is empty");
  db.projectFeed.push({
    id: newId(),
    projectId: project.id,
    userId: getCurrentUserId(),
    type: "COMMENT",
    body,
    createdAt: now(),
  });
  return respond(undefined);
}

const deleteComment = async (id: string | number) => {
  const comment = db.projectFeed.find(item => item.id === Number(id));
  if (!comment) throw new ApiError(404, "Comment not found");
  if (comment.type !== "COMMENT") throw new ApiError(403, "Feed item cannot be deleted");
  const userId = getCurrentUserId();
  if (comment.userId !== userId && findProject(comment.projectId).createdBy !== userId) {
    throw new ApiError(401, "Unauthorized access");
  }
  db.projectFeed = db.projectFeed.filter(item => item !== comment);
  return respond(undefined);
}

const api: typeof remote = {
  getProjectsOfStudent,
  postProject,
  getProject,
  updateProjectStatus,
  updateProjectDetails,
  addUserToProject,
  deleteProject,
  getProjectFeed,
  postProjectComment,
  deleteComment,
}

export default api;
