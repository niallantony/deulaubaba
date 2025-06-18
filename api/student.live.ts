import { Student, StudentIdAvatar } from "@/types/student";
import { UserAvatar } from "@/types/user";

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
  message?: string;
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
    console.log("Fetched student", code, student)
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

export const getAllStudents = async (userid: string): Promise<StudentsResponse> => {
  try {
    const api = process.env.EXPO_PUBLIC_API_ADDRESS;

    const response = await fetch(`${api}/student/all?id=${userid}`, {
      method: "GET",
    })
    console.log("API: ", response)
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
  await wait(500)
  return {
    status: 200,
    users: [
      {
        id: "1",
        src: "@userexample",
        type: "엄마",
      },
      {
        id: "2",
        src: "@userexample2",
        type: "특수교사",
      },
      {
        id: "3",
        src: "@userexample2",
        type: "언어치료사",
      },
      {
        id: "4",
        src: "@userexample2",
        type: "통합교사",
      },
      {
        id: "5",
        src: "@userexample2",
        type: "활동지원사",
      },
    ]
  }
}

const wait = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms))
}

