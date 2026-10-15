import { Student, StudentIdAvatar } from "@/types/student";
import { UserAvatar } from "@/types/user";
import { isApiError } from "../errors";
import { buildFormData } from "../formData";
import { request } from "../request";

type StudentDetails = Omit<Student, "communicationDetails" | "challengesDetails">;

// Returns null when no student has this code, so callers can show a message
// instead of handling an error.
const getStudentPreviewFromCode = async (code: string): Promise<StudentIdAvatar | null> => {
  try {
    return await request<StudentIdAvatar>(`/student/preview?id=${code}`);
  } catch (error) {
    if (isApiError(error, 404)) return null;
    throw error;
  }
}

const getStudentFromCode = (code: string) =>
  request<Student>(`/student?id=${code}`);

const linkStudentFromCode = (code: string) =>
  request<Student>(`/me/link-student?code=${code}`, { method: "POST" });

const toFormData = async ({ imagesrc, ...student }: StudentDetails, imageName: string) =>
  buildFormData(student, imagesrc ? { uri: imagesrc, name: imageName } : undefined);

const postStudent = async (student: Student) => {
  await request("/student", { method: "POST", body: await toFormData(student, student.name) });
}

const putStudentInfo = async (student: StudentDetails) => {
  await request(`/student/${student.studentId}`, {
    method: "PUT",
    body: await toFormData(student, student.studentId!),
  });
}

const putStudentCommunication = ({ studentId, communicationDetails }: Pick<Student, "communicationDetails" | "studentId">) =>
  request(`/student/${studentId}/communication`, { method: "PUT", body: { communicationDetails } });

const putStudentChallenge = ({ studentId, challengesDetails }: Pick<Student, "challengesDetails" | "studentId">) =>
  request(`/student/${studentId}/challenge`, { method: "PUT", body: { challengesDetails } });

// The server answers 404 when the user has no students yet, which is a normal state.
const getAllStudents = async (): Promise<StudentIdAvatar[]> => {
  try {
    return await request<StudentIdAvatar[]>("/student/all");
  } catch (error) {
    if (isApiError(error, 404)) return [];
    throw error;
  }
}

const getUsersFromStudent = (studentId: string) =>
  request<UserAvatar[]>(`/student/team?id=${studentId}`);

export default {
  getStudentFromCode,
  linkStudentFromCode,
  getStudentPreviewFromCode,
  getUsersFromStudent,
  getAllStudents,
  postStudent,
  putStudentInfo,
  putStudentCommunication,
  putStudentChallenge
}
