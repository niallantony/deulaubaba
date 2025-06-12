import { Student, StudentIdAvatar } from "@/types/student";

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

export const getStudentFromCode = async (code: string): Promise<StudentResponse> => {
  await wait(500)
  if (code === "123456") {
    return {
      status: 200,
      student: {
        name: "엄수민",
        school: "지행초등학교",
        age: 11,
        grade: 4,
        setting: "시간제 특수학급",
        disability: "자폐성장애",
        imagesrc: "@example",
        communicationDetails: "구어를 조금 사용할 수 있고 손담을 익히고 있음. 원하는 사물이나 장소를 손으로 가리키기도 하고 집에서는 태블릿에 저장된 사진을 가리켜서 표현하기도 함.",
        challengesDetails: "원하는 것을 얻지 못하면 울면서 굵은 소리를 내거나 자신의 손을 꺾음. 화가 많이 나면 상대방의 손을 잡고 뒤로 꺾기도 함. 상대방이 자신의 말을 못 알아들으면 답답해서 가슴을 칠 때가 있음."
      }
    }
  }
  return {
    status: 401,
    student: null,
    message: "Incorrect Code"
  }
}

export const getAllStudents = async (userid: string): Promise<StudentsResponse> => {
  await wait(500)
  return {
    status: 200,
    students: [
      {
        id: "123456",
        name: "엄수민",
        imagesrc: "@example",
      },
    ]
  }
}

const wait = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms))
}

