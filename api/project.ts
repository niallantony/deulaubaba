import { Project, ProjectDetails, ProjectFeedItem, ProjectPostDTO, ProjectPreview } from "@/types/project";
import auth0 from "./auth";
import { API_BASE_URL } from "./api";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

export type AllProjectsResponse = {
  current?: ProjectPreview[];
  pending?: ProjectPreview[];
  completed?: ProjectPreview[];
}

export type ProjectFeedResponse = {
  feed: ProjectFeedItem[]
}

const getAccessToken = async () => {
  const credentials = await auth0.credentialsManager.getCredentials();
  return credentials.accessToken;
}

const getProjectsOfStudent = async (id: string): Promise<AllProjectsResponse> => {
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}/project/all/${id}`, {
    method: "GET",
    "headers": {
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message)
  }
  return {
    current: json.current,
    pending: json.pending,
    completed: json.completed
  }
}


const getProject = async (id: string): Promise<Project> => {
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}/project?id=${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
  if (response.ok) {
    const json: Project = await response.json()
    return json
  }
  else throw new Error(response.toString())


}

const compressImage = async (uri: string) => {
  const imageContext = ImageManipulator.manipulate(uri);
  const manipulated = await imageContext
    .resize({ width: 1000 })
    .renderAsync()

  return await manipulated.saveAsync({ compress: 0.7, format: SaveFormat.JPEG })
};

const postProject = async (project: ProjectPostDTO) => {
  const accessToken = await getAccessToken();
  const formData = new FormData();
  const { imgsrc, ...projectData } = project;
  formData.append("data", JSON.stringify(projectData))

  if (imgsrc) {
    const compressed = await compressImage(imgsrc);
    formData.append("image", {
      uri: compressed.uri,
      name: `${project.studentId}.jpg`,
      type: "image/jpeg"
    } as any)
  }
  const response = await fetch(`${API_BASE_URL}/project`, {
    method: "POST",
    headers: {
      "Content-type": "multipart/form-data",
      "Authorization": `Bearer ${accessToken}`
    },
    body: formData
  })
  const json = await response.json();
  if (response.ok) {
    return;
  } else {
    throw new Error(json.message)
  }
}

const updateProjectStatus = async ({ id, value }: { id: string, value: boolean }) => {
  const accessToken = await getAccessToken();
  const data = { isCompleted: value }
  const response = await fetch(`${API_BASE_URL}/project/status/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    return
  } else {
    const json = await response.json()
    throw new Error(json.message)
  }
}

const updateProjectDetails = async ({
  id,
  projectDetails,
  studentId,
}: {
  id: string,
  projectDetails: ProjectDetails,
  studentId: string,
}) => {
  const accessToken = await getAccessToken();
  const formData = new FormData();
  const { imgsrc, ...projectData } = projectDetails;
  formData.append("data", JSON.stringify(projectData))
  if (imgsrc) {
    const compressed = await compressImage(imgsrc);
    formData.append("image", {
      uri: compressed.uri,
      name: `${studentId}.jpg`,
      type: "image/jpeg"
    } as any)
  }
  const response = await fetch(`${API_BASE_URL}/project/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "multipart/form-data",
      "Authorization": `Bearer ${accessToken}`
    },
    body: formData
  })
  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.message)
  }
}

const addUserToProject = async ({
  id,
  toAdd,
}: {
  id: string,
  toAdd: string[],
}) => {
  const accessToken = await getAccessToken();
  console.log(JSON.stringify({ "toAdd": toAdd }))
  const response = await fetch(`${API_BASE_URL}/project/${id}/add-user`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({ "toAdd": toAdd })
  })
  if (!response.ok) {
    const json = await response.json()
    throw new Error(json.message)
  }
}

const deleteProject = async (id: string) => {
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}/project/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    },
  })
  if (!response.ok) {
    const json = await response.json()
    throw new Error(json.message)
  }
}

const getProjectFeed = async (id: string): Promise<ProjectFeedResponse> => {
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}/project/${id}/feed`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    },
  })
  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.message)
  }
  const json: ProjectFeedResponse = await response.json();
  return json
}

const postProjectComment = async ({ id, body }: { id: string, body: string }) => {
  const accessToken = await getAccessToken();
  const data = { body: body }
  const response = await fetch(`${API_BASE_URL}/project/${id}/comment`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify(data),

  })
  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.message)
  }
}

const deleteComment = async (id: string) => {
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}/project/comment/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    },

  })
  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.message)
  }
}

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
