import { UserAvatar } from "./user";

export type Student = {
  studentId?: string;
  name: string;
  school: string;
  age: number;
  grade: number;
  setting: string;
  disability: string;
  imagesrc?: string;
  communicationDetails?: string;
  challengesDetails?: string;
  team?: UserAvatar[];
}

export type StudentIdAvatar = {
  name: string;
  studentId: string;
  imagesrc?: string;
  empty?: boolean;
}
