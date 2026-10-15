import type remote from "../remote/student";
import { ApiError } from "../errors";
import { Student, StudentIdAvatar } from "@/types/student";
import { UserAvatar } from "@/types/user";
import { authorisedStudent, db, DbStudent, findUser, getCurrentUserId, respond, toAvatar } from "./db";

const toStudent = ({ userIds, ...student }: DbStudent): Student => student;

const findStudent = (code: string) => {
  const student = db.students.find(s => s.studentId === code.toLowerCase());
  if (!student) throw new ApiError(404, "Student not found");
  return student;
}

const validate = (student: Omit<Student, "communicationDetails" | "challengesDetails">) => {
  if (!student.name || !student.school || student.age == null || student.grade == null || !student.disability || !student.setting) {
    throw new ApiError(400, "Invalid student data");
  }
}

const getStudentPreviewFromCode = async (code: string): Promise<StudentIdAvatar | null> => {
  const student = db.students.find(s => s.studentId === code.toLowerCase());
  return respond(student ? { studentId: student.studentId, name: student.name, imagesrc: student.imagesrc } : null);
}

const getStudentFromCode = async (code: string): Promise<Student> =>
  respond(toStudent(authorisedStudent(code)));

const linkStudentFromCode = async (code: string): Promise<Student> => {
  const student = findStudent(code);
  const userId = getCurrentUserId();
  if (!student.userIds.includes(userId)) {
    student.userIds.push(userId);
  }
  return respond(toStudent(student));
}

const generateCode = () => {
  const alphabet = "123456789abcdef";
  let code: string;
  do {
    code = Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  } while (db.students.some(s => s.studentId === code));
  return code;
}

const postStudent = async (student: Student) => {
  validate(student);
  db.students.push({
    ...student,
    studentId: generateCode(),
    userIds: [getCurrentUserId()],
  });
  return respond(undefined);
}

const putStudentInfo = async (student: Omit<Student, "communicationDetails" | "challengesDetails">) => {
  validate(student);
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
  return respond(undefined);
}

const putStudentCommunication = async (student: Pick<Student, "communicationDetails" | "studentId">) => {
  authorisedStudent(student.studentId!).communicationDetails = student.communicationDetails;
  return respond(undefined);
}

const putStudentChallenge = async (student: Pick<Student, "challengesDetails" | "studentId">) => {
  authorisedStudent(student.studentId!).challengesDetails = student.challengesDetails;
  return respond(undefined);
}

const getAllStudents = async (): Promise<StudentIdAvatar[]> => {
  const userId = getCurrentUserId();
  return respond(db.students
    .filter(s => s.userIds.includes(userId))
    .map(s => ({ studentId: s.studentId, name: s.name, imagesrc: s.imagesrc })));
}

const getUsersFromStudent = async (studentId: string): Promise<UserAvatar[]> =>
  respond(authorisedStudent(studentId).userIds.map(id => toAvatar(findUser(id))));

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
