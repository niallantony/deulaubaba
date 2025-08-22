import { Student, StudentIdAvatar } from "@/types/student";
import { UserAvatar } from "@/types/user";
import * as ImageManipulator from "expo-image-manipulator";

export type StudentResponse = {
  status: number;
  student: Student | null;
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
  umessage?: string;
}

export const getStudentFromCode = async (code: string): Promise<StudentResponse> => {
  try {
    const api = process.env.EXPO_PUBLIC_API_ADDRESS;

    const response = await fetch(`${api}/student?id=${code}`, {
      method: "GET"
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
  const compressed = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1000 } }], // or whatever width makes sense
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
  );
  return compressed;
};

export const postStudent = async (student: Student, uid: string) => {
  try {
    const api = process.env.EXPO_PUBLIC_API_ADDRESS;

    const response = await fetch(`${api}/student`, {
      "method": "POST",
      "headers": {
        "Content-type": "application/json"
      },
      "body": JSON.stringify({ uid: uid, ...student }),
    })

    return response;
  } catch (err) {
    console.error("Thrown: ", err)
  }
}

export const putStudent = async (student: Student, studentId: string, uid: string) => {
  try {
    const api = process.env.EXPO_PUBLIC_API_ADDRESS;

    const response = await fetch(`${api}/student/${studentId}`, {
      "method": "PUT",
      "headers": {
        "Content-type": "application/json"
      },
      "body": JSON.stringify({ uid: uid, ...student }),
    })

    return response;

  } catch (err) {
    console.error("Thrown: ", err)
  }
}

export const getAllStudents = async (userid: string): Promise<StudentsResponse> => {
  try {
    const api = process.env.EXPO_PUBLIC_API_ADDRESS;

    const response = await fetch(`${api}/student/all?id=${userid}`, {
      method: "GET",
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

export const getUsersFromStudent = async (studentId: string): Promise<UsersResponse> => {
  try {
    const api = process.env.EXPO_PUBLIC_API_ADDRESS;

    const response = await fetch(`${api}/student/team?id=${studentId}`, {
      method: "GET",
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

