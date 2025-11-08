import { Project } from "@/types/project";
import auth0 from "./auth";
import { API_BASE_URL } from "./api";

export type AllProjectsResponse = {
  current?: Project[];
  pending?: Project[];
  completed?: Project[];
  status: number;
  message?: string;
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

export default {
  getProjectsOfStudent,
}
