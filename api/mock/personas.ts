import { USERS } from "./db";

export type DemoPersona = {
  id: string;
  label: string;
}

export const DEMO_PERSONAS: DemoPersona[] = [
  { id: USERS.teacher, label: "교사로 로그인" },
  { id: USERS.parent, label: "부모로 로그인" },
  { id: USERS.newUser, label: "새 사용자로 가입" },
];
