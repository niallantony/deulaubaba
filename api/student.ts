import { Student, StudentIdAvatar } from "@/types/student";
import { UserAvatar } from "@/types/user";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import auth0 from "./auth";
import { API_BASE_URL } from "./api";

const getAccessTokenHeader = async () => {
  const credentials = await auth0.credentialsManager.getCredentials();
  return credentials.accessToken;
}

export type StudentResponse = {
  status: number;
  student: Student | null;
  message?: string;
}

export type StudentSmallResponse = {
  status: number;
  student: StudentIdAvatar | null;
  message?: string;
}

export type StudentsResponse = {
  status: number;
  students: StudentIdAvatar[] | null;
  message?: string;
}

export type UsersResponse = {
  status: number;
  users: UserAvatar[] | null;
  message?: string;
}

const getStudentPreviewFromCode = async (code: string): Promise<StudentSmallResponse> => {
  try {
    const accessToken = await getAccessTokenHeader();

    const response = await fetch(`${API_BASE_URL}/student/preview?id=${code}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    })
    if (response.status === 404) {
      return {
        status: 404,
        student: null,
        message: "Student Not Found"
      }
    }
    const student = await response.json();
    if (response.status === 200) {
      return {
        status: 200,
        student: student,
      }
    }
  } catch (err) {
    console.error(err)
  }
  return {
    status: 401,
    student: null,
    message: "Incorrect Code"
  }
}

const getStudentFromCode = async (code: string): Promise<StudentResponse> => {
  try {
    const accessToken = await getAccessTokenHeader();
    const response = await fetch(`${API_BASE_URL}/student?id=${code}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    })
    if (response.status === 404) {
      return {
        status: 404,
        student: null,
        message: "Student Not Found"
      }
    }
    const student = await response.json();
    if (response.status === 200) {
      return {
        status: 200,
        student: student,
      }
    }
  } catch (err) {
    console.error(err)
  }
  return {
    status: 401,
    student: null,
    message: "Incorrect Code"
  }
}

const linkStudentFromCode = async (code: string): Promise<StudentResponse> => {
  try {
    const accessToken = await getAccessTokenHeader();

    const response = await fetch(`${API_BASE_URL}/me/link-student?code=${code}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    })
    if (response.status === 404) {
      return {
        status: 404,
        student: null,
        message: "Student Not Found"
      }
    }
    const student = await response.json();
    if (response.status === 200) {
      return {
        status: 200,
        student: student,
      }
    }
  } catch (err) {
    console.error(err)
  }
  return {
    status: 401,
    student: null,
    message: "Incorrect Code"
  }
}

const compressImage = async (uri: string) => {
  const imageContext = ImageManipulator.manipulate(uri);
  const manipulated = await imageContext
    .resize({ width: 1000 })
    .renderAsync()

  return await manipulated.saveAsync({ compress: 0.7, format: SaveFormat.JPEG })
};

const postStudent = async (student: Student) => {
  try {
    const api = process.env.EXPO_PUBLIC_API_ADDRESS;
    const accessToken = await getAccessTokenHeader();
    const formData = new FormData()
    formData.append("data", JSON.stringify(student))
    if (student.imagesrc) {
      const compressed = await compressImage(student.imagesrc);
      formData.append("image", {
        uri: compressed.uri,
        name: `${student.name}.jpg`,
        type: "image/jpeg",
      } as any)
    }

    return await fetch(`${api}/student`, {
      "method": "POST",
      "headers": {
        "Content-type": "multipart/form-data",
        "Authorization": `Bearer ${accessToken}`,
      },
      "body": formData,
    });
  } catch (err) {
    console.error("Thrown: ", err)
    return Promise.reject(err);
  }
}

const putStudent = async (student: Student, studentId: string) => {
  try {
    const api = process.env.EXPO_PUBLIC_API_ADDRESS;
    const accessToken = await getAccessTokenHeader();
    const formData = new FormData()
    formData.append("data", JSON.stringify(student))
    if (student.imagesrc) {
      const compressed = await compressImage(student.imagesrc);
      formData.append("image", {
        uri: compressed.uri,
        name: `${studentId}.jpg`,
        type: "image/jpeg",
      } as any)
    }

    return await fetch(`${api}/student/${studentId}`, {
      "method": "PUT",
      "headers": {
        "Content-type": "multipart/form-data",
        "Authorization": `Bearer ${accessToken}`,
      },
      "body": formData,
    });

  } catch (err) {
    console.error("Thrown: ", err)
    return {
      status: 401,
      students: null,
      message: "Post Failed"
    }
  }
}

const getAllStudents = async (): Promise<StudentsResponse> => {
  try {
    const accessToken = await getAccessTokenHeader();

    const response = await fetch(`${API_BASE_URL}/student/all`, {
      method: "GET",
      "headers": {
        "Authorization": `Bearer ${accessToken}`,
      },
    })
    if (response.status === 404) {
      return {
        status: 404,
        students: null,
        message: "Students not found"
      }
    }
    const students = await response.json()
    if (response.status === 200) {
      return {
        status: response.status,
        students,
      }
    }

  } catch (err) {
    console.log("Error thrown: ", err)
  }
  return {
    status: 401,
    students: null,
    message: "Not found"
  }

}

const getUsersFromStudent = async (studentId: string): Promise<UsersResponse> => {
  try {
    const accessToken = await getAccessTokenHeader();
    const response = await fetch(`${API_BASE_URL}/student/team?id=${studentId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    })
    if (response.status === 404) {
      return {
        status: 404,
        users: null,
        message: "Students not found"
      }
    }
    const users = await response.json()
    if (response.status === 200) {
      return {
        status: response.status,
        users,
      }
    }

  } catch (err) {
    console.log("Error thrown: ", err)
  }
  return {
    status: 401,
    users: null,
    message: "Not found"
  }
}

export default {
  getStudentFromCode,
  linkStudentFromCode,
  getStudentPreviewFromCode,
  getUsersFromStudent,
  getAllStudents,
  postStudent,
  putStudent
}
