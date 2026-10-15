import type remote from "../remote/student";
import { StudentResponse, StudentSmallResponse, StudentsResponse, UsersResponse } from "../remote/student";
import { Student } from "@/types/student";
import { authorisedStudent, db, DbStudent, findUser, getCurrentUserId, respond, toAvatar } from "./db";

const ok = () => new Response(null, { status: 200 });

const toStudent = ({ userIds, ...student }: DbStudent): Student => student;

const findStudent = (code: string) => db.students.find(s => s.studentId === code.toLowerCase());

const getStudentPreviewFromCode = async (code: string): Promise<StudentSmallResponse> => {
  const student = findStudent(code);
  if (!student) {
    return respond({ status: 404, student: null, message: "학생을 찾을 수 없습니다" });
  }
  return respond({
    status: 200,
    student: { studentId: student.studentId, name: student.name, imagesrc: student.imagesrc },
  });
}

const getStudentFromCode = async (code: string): Promise<StudentResponse> => {
  const student = findStudent(code);
  if (!student) {
    return respond({ status: 404, student: null, message: "Student Not Found" });
  }
  return respond({ status: 200, student: toStudent(student) });
}

const linkStudentFromCode = async (code: string): Promise<StudentResponse> => {
  const student = findStudent(code);
  if (!student) {
    return respond({ status: 404, student: null, message: "Student Not Found" });
  }
  const userId = getCurrentUserId();
  if (!student.userIds.includes(userId)) {
    student.userIds.push(userId);
  }
  return respond({ status: 200, student: toStudent(student) });
}

const generateCode = () => {
  const alphabet = "123456789abcdef";
  let code: string;
  do {
    code = Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  } while (findStudent(code));
  return code;
}

const postStudent = async (student: Student) => {
  db.students.push({
    ...student,
    studentId: generateCode(),
    userIds: [getCurrentUserId()],
  });
  return respond(undefined).then(ok);
}

const putStudentInfo = async (student: Omit<Student, "communicationDetails" | "challengesDetails">) => {
  const existing = authorisedStudent(student.studentId!);
  Object.assign(existing, {
    name: student.name,
    school: student.school,
    age: student.age,
    grade: student.grade,
    disability: student.disability,
    setting: student.setting,
    imagesrc: student.imagesrc ?? existing.imagesrc,
  });
  return respond(undefined).then(ok);
}

const putStudentCommunication = async (student: Pick<Student, "communicationDetails" | "studentId">) => {
  authorisedStudent(student.studentId!).communicationDetails = student.communicationDetails;
  return respond(undefined).then(ok);
}

const putStudentChallenge = async (student: Pick<Student, "challengesDetails" | "studentId">) => {
  authorisedStudent(student.studentId!).challengesDetails = student.challengesDetails;
  return respond(undefined).then(ok);
}

const getAllStudents = async (): Promise<StudentsResponse> => {
  const userId = getCurrentUserId();
  const students = db.students
    .filter(s => s.userIds.includes(userId))
    .map(s => ({ studentId: s.studentId, name: s.name, imagesrc: s.imagesrc }));
  if (students.length === 0) {
    return respond({ status: 404, students: null, message: "Students not found" });
  }
  return respond({ status: 200, students });
}

const getUsersFromStudent = async (studentId: string): Promise<UsersResponse> => {
  const student = findStudent(studentId);
  if (!student) {
    return respond({ status: 404, users: null, message: "Students not found" });
  }
  return respond({ status: 200, users: student.userIds.map(id => toAvatar(findUser(id))) });
}

const api: typeof remote = {
  getStudentFromCode,
  linkStudentFromCode,
  getStudentPreviewFromCode,
  getUsersFromStudent,
  getAllStudents,
  postStudent,
  putStudentInfo,
  putStudentCommunication,
  putStudentChallenge,
}

export default api;
