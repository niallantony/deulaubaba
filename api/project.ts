import { ProjectPostDTO, ProjectPreview } from "@/types/project";
import auth0 from "./auth";
import { API_BASE_URL } from "./api";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

export type AllProjectsResponse = {
  current?: ProjectPreview[];
  pending?: ProjectPreview[];
  completed?: ProjectPreview[];
  status: number;
  message?: string;
}

export type PostProjectResponse = {
  status: number,
  message?: string,
}
const getAccessToken = async () => {
  const credentials = await auth0.credentialsManager.getCredentials();
  return credentials.accessToken;
}

const getProjectsOfStudent = async (id: string): Promise<AllProjectsResponse> => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${API_BASE_URL}/project/all/${id}`, {
      method: "GET",
      "headers": {
        "Authorization": `Bearer ${accessToken}`,
      }
    })
    if (response.status === 404) {
      return {
        message: "Student Not Found",
        status: 404
      }
    }
    if (response.status === 204) {
      return {
        message: "No projects",
        status: 204
      }
    }
    if (response.status === 401) {
      return {
        message: "Unauthorized",
        status: 401
      }
    }
    const json: AllProjectsResponse = await response.json();
    return { ...json, status: 200 }

  } catch (e) {
    console.error(e)
    return {
      message: "Server Error",
      status: 500,
    }
  }
}

const compressImage = async (uri: string) => {
  const imageContext = ImageManipulator.manipulate(uri);
  const manipulated = await imageContext
    .resize({ width: 1000 })
    .renderAsync()

  return await manipulated.saveAsync({ compress: 0.7, format: SaveFormat.JPEG })
};

const postProject = async (project: ProjectPostDTO): Promise<PostProjectResponse> => {
  try {
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
    console.log(formData)

    const response = await fetch(`${API_BASE_URL}/project`, {
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data",
        "Authorization": `Bearer ${accessToken}`
      },
      body: formData
    })
    const json = await response.json();
    if (response.status === 201) {
      console.log(json)
      return {
        status: 201,
        message: "Successful"
      }
    } else {
      console.log(json)
      return {
        status: response.status,
        message: json.message
      }
    }
  } catch (err) {
    console.error(err)
  }
  console.log("Not firing...")
  return {
    status: 500
  }
}

export default {
  getProjectsOfStudent,
  postProject,
}
