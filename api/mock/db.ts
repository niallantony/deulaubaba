import { CommunicationCategory, ExpressionType } from "@/types/dictionary";
import { StudentFeedEmotionName } from "@/types/feed";
import { ProjectType } from "@/types/project";
import { UserAvatar } from "@/types/user";
import { ApiError } from "../errors";

// In-memory stand-in for the Spring/Postgres backend used in demo mode.
// State lives for the lifetime of the JS bundle, so reloading the app resets
// the demo to its seed data.

export type DbUser = {
  userId: string;
  username: string;
  name: string;
  email: string;
  userType: string;
  imagesrc?: string;
}

export type DbStudent = {
  studentId: string;
  name: string;
  school: string;
  age: number;
  grade: number;
  setting: string;
  disability: string;
  imagesrc?: string;
  communicationDetails?: string;
  challengesDetails?: string;
  userIds: string[];
}

export type DbDictionaryEntry = {
  id: number;
  studentId: string;
  type: ExpressionType;
  title: string;
  category: CommunicationCategory[];
  imgsrc?: string;
  description?: string;
}

export type DbFeedItem = {
  id: number;
  studentId: string;
  userId: string;
  emotions: StudentFeedEmotionName[];
  body: string;
  createdAt: string;
}

export type DbProjectUser = {
  userId: string;
  completed: boolean;
  completedOn: string | null;
}

export type DbProject = {
  id: number;
  studentId: string;
  createdBy: string;
  objective: string;
  description?: string;
  imgsrc?: string;
  startedOn: string;
  completed: boolean;
  completedOn: string | null;
  type: ProjectType;
  categories: CommunicationCategory[];
  users: DbProjectUser[];
}

export type DbProjectFeedItem = {
  id: number;
  projectId: number;
  userId: string | null;
  type: "COMMENT" | "NEW_USER" | "EVENT";
  body: string;
  createdAt: string;
}

const DAY = 1000 * 60 * 60 * 24;

const toDateString = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const today = () => toDateString(new Date());
export const now = () => new Date().toISOString();

const daysAgo = (days: number) => toDateString(new Date(Date.now() - days * DAY));
const daysFromNow = (days: number) => toDateString(new Date(Date.now() + days * DAY));
const timeAgo = (days: number, hours = 0) => new Date(Date.now() - days * DAY - hours * DAY / 24).toISOString();

const avatar = (seed: string, background: string) =>
  `https://api.dicebear.com/9.x/notionists/png?seed=${seed}&backgroundColor=${background}&size=256`;

export const USERS = {
  teacher: "demo|teacher",
  parent: "demo|parent",
  therapist: "demo|therapist",
  newUser: "demo|new",
} as const;

export const STUDENT_CODES = {
  minjun: "a3f9c2",
  seoyeon: "7b2e15",
  doyun: "c81d4e",
} as const;

const createSeed = () => {
  const users: DbUser[] = [
    {
      userId: USERS.teacher,
      username: "jiyoung_kim",
      name: "김지영",
      email: "teacher@demo.deulaubaba",
      userType: "특수교사",
      imagesrc: avatar("Jiyoung", "c0aede"),
    },
    {
      userId: USERS.parent,
      username: "sujin_park",
      name: "박수진",
      email: "parent@demo.deulaubaba",
      userType: "부모",
      imagesrc: avatar("Sujin", "ffd5dc"),
    },
    {
      userId: USERS.therapist,
      username: "hyunwoo_lee",
      name: "이현우",
      email: "therapist@demo.deulaubaba",
      userType: "치료사",
      imagesrc: avatar("Hyunwoo", "b6e3f4"),
    },
  ];

  const students: DbStudent[] = [
    {
      studentId: STUDENT_CODES.minjun,
      name: "김민준",
      school: "햇살초등학교",
      age: 9,
      grade: 3,
      setting: "특수학급",
      disability: "자폐성 장애",
      imagesrc: avatar("Minjun", "d1f4d9"),
      communicationDetails:
        "짧은 단어와 몸짓을 함께 사용해요. 그림 카드를 보여주면 원하는 것을 잘 골라요. 낯선 사람 앞에서는 말이 줄어들어요.",
      challengesDetails:
        "갑작스러운 일정 변화가 있으면 힘들어해요. 큰 소리가 나는 곳에서는 귀를 막고 자리를 피하려고 해요.",
      userIds: [USERS.teacher, USERS.parent, USERS.therapist],
    },
    {
      studentId: STUDENT_CODES.seoyeon,
      name: "이서연",
      school: "푸른숲특수학교",
      age: 11,
      grade: 5,
      setting: "특수학교",
      disability: "지적 장애",
      imagesrc: avatar("Seoyeon", "ffdfbf"),
      communicationDetails: "두세 단어로 된 문장으로 말할 수 있어요. 질문을 받으면 대답할 시간이 조금 더 필요해요.",
      challengesDetails: "새로운 활동을 시작할 때 거부하는 경우가 있어요.",
      userIds: [USERS.teacher],
    },
    {
      studentId: STUDENT_CODES.doyun,
      name: "박도윤",
      school: "햇살초등학교",
      age: 7,
      grade: 1,
      setting: "통합학급",
      disability: "언어 장애",
      imagesrc: avatar("Doyun", "c0aede"),
      communicationDetails: "그림 카드와 손짓을 주로 사용해요.",
      challengesDetails: "",
      userIds: [USERS.therapist],
    },
  ];

  const dictionary: DbDictionaryEntry[] = [
    { id: 1, studentId: STUDENT_CODES.minjun, type: "BODY", title: "화장실에 가고 싶어요", category: ["REQUEST"], description: "바지 허리춤을 잡고 문 쪽을 바라봐요." },
    { id: 2, studentId: STUDENT_CODES.minjun, type: "BODY", title: "싫어요", category: ["REJECTION"], description: "고개를 세게 젓고 물건을 손으로 밀어내요." },
    { id: 3, studentId: STUDENT_CODES.minjun, type: "BODY", title: "아파요", category: ["PAIN"], description: "배를 두드리거나 얼굴을 찡그리며 엎드려요." },
    { id: 4, studentId: STUDENT_CODES.minjun, type: "VOCAL", title: "도와주세요", category: ["HELP"], description: "'으-으' 소리를 내며 어른의 손을 끌어당겨요." },
    { id: 5, studentId: STUDENT_CODES.minjun, type: "VOCAL", title: "이것 보세요!", category: ["ATTENTION", "SHOWME"], description: "높은 소리를 내면서 손가락으로 가리켜요." },
    { id: 6, studentId: STUDENT_CODES.minjun, type: "PICTURE", title: "간식 주세요", category: ["REQUEST"], description: "그림 카드에서 과자 그림을 골라 건네줘요." },
    { id: 7, studentId: STUDENT_CODES.minjun, type: "PICTURE", title: "쉬고 싶어요", category: ["REQUEST", "REJECTION"], description: "'휴식' 카드를 책상 위에 올려놓아요." },
    { id: 8, studentId: STUDENT_CODES.minjun, type: "WORD", title: "물", category: ["REQUEST"], description: "'무' 라고 짧게 말해요." },
    { id: 9, studentId: STUDENT_CODES.minjun, type: "WORD", title: "엄마", category: ["ATTENTION"], description: "엄마를 부를 때 '엄마'라고 또렷하게 말해요." },
    { id: 10, studentId: STUDENT_CODES.seoyeon, type: "WORD", title: "같이 해요", category: ["ATTENTION"], description: "친구의 팔을 잡으며 '같이'라고 말해요." },
    { id: 11, studentId: STUDENT_CODES.seoyeon, type: "BODY", title: "그만할래요", category: ["REJECTION"], description: "두 손을 앞으로 내밀어 X자를 만들어요." },
    { id: 12, studentId: STUDENT_CODES.seoyeon, type: "MESSAGE", title: "배고파요", category: ["REQUEST"], description: "태블릿에 '밥'이라고 입력해요." },
  ];

  const feed: DbFeedItem[] = [
    { id: 1, studentId: STUDENT_CODES.minjun, userId: USERS.parent, emotions: ["SLEEPY"], body: "어젯밤에 늦게 잠들어서 오늘 아침에 조금 피곤해 보여요.", createdAt: timeAgo(0, 2) },
    { id: 2, studentId: STUDENT_CODES.minjun, userId: USERS.teacher, emotions: ["HAPPY"], body: "오늘 미술 시간에 그림 카드로 '도와주세요'를 표현했어요! 처음이에요 👏", createdAt: timeAgo(1, 3) },
    { id: 3, studentId: STUDENT_CODES.minjun, userId: USERS.therapist, emotions: ["THOUGHTFUL"], body: "언어치료 시간에 '물', '엄마' 외에 '더'라는 단어를 시도했어요. 가정에서도 간식 시간에 연습해 주세요.", createdAt: timeAgo(2, 1) },
    { id: 4, studentId: STUDENT_CODES.minjun, userId: USERS.parent, emotions: ["SAVORING", "HAPPY"], body: "저녁에 좋아하는 떡볶이를 먹으면서 그림 카드로 '더 주세요'를 했어요.", createdAt: timeAgo(3, 4) },
    { id: 5, studentId: STUDENT_CODES.minjun, userId: USERS.teacher, emotions: ["ANGRY"], body: "체육관 소리가 커서 힘들어했어요. 교실로 돌아와서 금방 진정했어요.", createdAt: timeAgo(4, 2) },
    { id: 6, studentId: STUDENT_CODES.minjun, userId: USERS.parent, emotions: ["SICK"], body: "감기 기운이 있어서 오늘은 약을 먹고 등교해요.", createdAt: timeAgo(6, 6) },
    { id: 7, studentId: STUDENT_CODES.minjun, userId: USERS.teacher, emotions: ["QUIET"], body: "오늘은 전체적으로 조용히 지냈어요. 점심은 잘 먹었어요.", createdAt: timeAgo(7, 1) },
    { id: 8, studentId: STUDENT_CODES.minjun, userId: USERS.therapist, emotions: ["HAPPY"], body: "차례 기다리기 활동을 끝까지 해냈어요!", createdAt: timeAgo(9, 2) },
    { id: 9, studentId: STUDENT_CODES.minjun, userId: USERS.parent, emotions: ["TIRED"], body: "주말에 가족 여행을 다녀와서 조금 지쳐 있어요.", createdAt: timeAgo(11, 3) },
    { id: 10, studentId: STUDENT_CODES.minjun, userId: USERS.teacher, emotions: ["SAD"], body: "짝꿍이 결석해서 아침에 많이 찾았어요.", createdAt: timeAgo(13, 5) },
    { id: 11, studentId: STUDENT_CODES.minjun, userId: USERS.teacher, emotions: ["HAPPY"], body: "새 시간표 그림을 보고 일정을 잘 따라왔어요.", createdAt: timeAgo(15, 2) },
    { id: 12, studentId: STUDENT_CODES.minjun, userId: USERS.parent, emotions: [], body: "이번 주부터 아침 등교 시간이 30분 빨라져요.", createdAt: timeAgo(17, 1) },
    { id: 13, studentId: STUDENT_CODES.seoyeon, userId: USERS.teacher, emotions: ["HAPPY"], body: "음악 시간에 친구와 함께 악기를 연주했어요.", createdAt: timeAgo(1, 2) },
  ];

  const projects: DbProject[] = [
    {
      id: 1,
      studentId: STUDENT_CODES.minjun,
      createdBy: USERS.teacher,
      objective: "그림 카드로 간식 요청하기",
      description: "간식 시간에 말 대신 울거나 손을 뻗는 대신, 그림 카드를 건네 원하는 간식을 요청해요. 학교와 가정에서 같은 카드를 사용해요.",
      startedOn: daysAgo(21),
      completed: false,
      completedOn: null,
      type: "COMMUNICATION",
      categories: ["REQUEST"],
      users: [
        { userId: USERS.teacher, completed: false, completedOn: null },
        { userId: USERS.parent, completed: true, completedOn: daysAgo(2) },
        { userId: USERS.therapist, completed: false, completedOn: null },
      ],
    },
    {
      id: 2,
      studentId: STUDENT_CODES.minjun,
      createdBy: USERS.parent,
      objective: "시끄러운 곳에서 '쉬고 싶어요' 표현하기",
      description: "소리가 큰 장소에서 귀를 막고 뛰쳐나가는 대신 '휴식' 카드를 보여주도록 연습해요.",
      startedOn: daysAgo(10),
      completed: false,
      completedOn: null,
      type: "CHALLENGE",
      categories: ["REJECTION", "HELP"],
      users: [
        { userId: USERS.parent, completed: false, completedOn: null },
        { userId: USERS.teacher, completed: false, completedOn: null },
      ],
    },
    {
      id: 3,
      studentId: STUDENT_CODES.minjun,
      createdBy: USERS.teacher,
      objective: "'도와주세요' 카드 사용하기",
      description: "어려운 과제를 만났을 때 소리를 지르는 대신 '도와주세요' 카드를 사용해요.",
      startedOn: daysFromNow(7),
      completed: false,
      completedOn: null,
      type: "COMMUNICATION",
      categories: ["HELP"],
      users: [
        { userId: USERS.teacher, completed: false, completedOn: null },
        { userId: USERS.therapist, completed: false, completedOn: null },
      ],
    },
    {
      id: 4,
      studentId: STUDENT_CODES.minjun,
      createdBy: USERS.therapist,
      objective: "'싫어요' 손짓으로 표현하기",
      description: "싫은 것을 밀어내거나 던지는 대신 손을 흔들어 '싫어요'를 표현해요.",
      startedOn: daysAgo(45),
      completed: true,
      completedOn: daysAgo(12),
      type: "COMMUNICATION",
      categories: ["REJECTION"],
      users: [
        { userId: USERS.therapist, completed: true, completedOn: daysAgo(14) },
        { userId: USERS.teacher, completed: true, completedOn: daysAgo(13) },
        { userId: USERS.parent, completed: true, completedOn: daysAgo(12) },
      ],
    },
  ];

  const projectFeed: DbProjectFeedItem[] = [
    { id: 1, projectId: 1, userId: null, type: "EVENT", body: "프로젝트 등록되었다", createdAt: timeAgo(21, 3) },
    { id: 2, projectId: 1, userId: USERS.teacher, type: "NEW_USER", body: "New user added: 특수교사", createdAt: timeAgo(21, 3) },
    { id: 3, projectId: 1, userId: USERS.parent, type: "NEW_USER", body: "New user added: 부모", createdAt: timeAgo(21, 3) },
    { id: 4, projectId: 1, userId: USERS.therapist, type: "NEW_USER", body: "New user added: 치료사", createdAt: timeAgo(21, 3) },
    { id: 5, projectId: 1, userId: USERS.teacher, type: "COMMENT", body: "학교에서 사용할 카드 세트를 가방에 넣어 보냈어요. 가정에서도 같은 카드로 연습해 주세요.", createdAt: timeAgo(20, 2) },
    { id: 6, projectId: 1, userId: USERS.parent, type: "COMMENT", body: "받았어요! 냉장고에 붙여두었더니 스스로 카드를 가져와요 😊", createdAt: timeAgo(15, 5) },
    { id: 7, projectId: 1, userId: USERS.therapist, type: "COMMENT", body: "치료실에서는 카드를 건넨 뒤 '주세요'를 따라 말하도록 함께 연습하고 있어요.", createdAt: timeAgo(8, 1) },
    { id: 8, projectId: 1, userId: USERS.parent, type: "COMMENT", body: "가정에서는 목표를 달성했어요. 완료로 표시할게요!", createdAt: timeAgo(2, 4) },
    { id: 9, projectId: 2, userId: null, type: "EVENT", body: "프로젝트 등록되었다", createdAt: timeAgo(10, 2) },
    { id: 10, projectId: 2, userId: USERS.parent, type: "NEW_USER", body: "New user added: 부모", createdAt: timeAgo(10, 2) },
    { id: 11, projectId: 2, userId: USERS.teacher, type: "NEW_USER", body: "New user added: 특수교사", createdAt: timeAgo(10, 2) },
    { id: 12, projectId: 2, userId: USERS.parent, type: "COMMENT", body: "마트에서 귀를 막고 뛰어나가는 일이 있었어요. 학교에서도 비슷한 상황이 있나요?", createdAt: timeAgo(9, 6) },
    { id: 13, projectId: 2, userId: USERS.teacher, type: "COMMENT", body: "체육관에서 자주 그래요. 이번 주부터 '휴식' 카드를 책상에 두고 있어요.", createdAt: timeAgo(9, 2) },
    { id: 14, projectId: 3, userId: null, type: "EVENT", body: "프로젝트 등록되었다", createdAt: timeAgo(1, 3) },
    { id: 15, projectId: 3, userId: USERS.teacher, type: "NEW_USER", body: "New user added: 특수교사", createdAt: timeAgo(1, 3) },
    { id: 16, projectId: 3, userId: USERS.therapist, type: "NEW_USER", body: "New user added: 치료사", createdAt: timeAgo(1, 3) },
    { id: 17, projectId: 4, userId: null, type: "EVENT", body: "프로젝트 등록되었다", createdAt: timeAgo(45, 2) },
    { id: 18, projectId: 4, userId: USERS.therapist, type: "COMMENT", body: "손을 흔드는 동작을 매번 사용하고 있어요. 모두 수고하셨습니다!", createdAt: timeAgo(14, 1) },
    { id: 19, projectId: 4, userId: null, type: "EVENT", body: "프로젝트 완료되었다", createdAt: timeAgo(12, 1) },
  ];

  return { users, students, dictionary, feed, projects, projectFeed };
}

export const db = createSeed();

let nextId = 1000;
export const newId = () => nextId++;

let currentUserId: string | null = null;

export const setCurrentUserId = (userId: string | null) => {
  currentUserId = userId;
}

export const getCurrentUserId = () => {
  if (!currentUserId) throw new ApiError(401, "Not logged in");
  return currentUserId;
}

export const findUser = (userId: string) => db.users.find(u => u.userId === userId);

export const currentUser = () => {
  const user = findUser(getCurrentUserId());
  if (!user) throw new ApiError(404, "User not found");
  return user;
}

export const toAvatar = (user: DbUser | undefined): UserAvatar => ({
  username: user?.username ?? "",
  imagesrc: user?.imagesrc ?? "",
  userType: user?.userType ?? "",
});

export const authorisedStudent = (studentId: string) => {
  const student = db.students.find(s => s.studentId === studentId.toLowerCase());
  if (!student) throw new ApiError(404, "Student not found");
  if (!student.userIds.includes(getCurrentUserId())) throw new ApiError(401, "Unauthorized access");
  return student;
}

// Round-trip through JSON so the UI receives the same shapes it would from the
// real server, and can't mutate the store by accident.
export const respond = async <T>(value: T): Promise<T> => {
  await new Promise(resolve => setTimeout(resolve, 250));
  return value === undefined ? value : JSON.parse(JSON.stringify(value));
}
