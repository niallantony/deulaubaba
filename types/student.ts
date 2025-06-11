import { UserAvatar } from "./user";

export type Student = {
  id?: string;
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
