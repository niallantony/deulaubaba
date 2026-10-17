import userApi from "@/api/mock/user";
import studentApi from "@/api/mock/student";
import dictionaryApi from "@/api/mock/dictionary";
import feedApi from "@/api/mock/feed";
import projectApi from "@/api/mock/project";
import { setCurrentUserId, STUDENT_CODES, USERS } from "@/api/mock/db";
import { ApiError } from "@/api/errors";

jest.mock("expo-image-manipulator", () => ({}));

describe("mock API (demo mode)", () => {
  beforeAll(() => jest.useFakeTimers({ advanceTimers: true }));
  afterAll(() => jest.useRealTimers());
  beforeEach(() => setCurrentUserId(USERS.teacher));

  it("returns the logged in persona", async () => {
    expect((await userApi.getUser())?.name).toBe("김지영");
  });

  it("registers a new user", async () => {
    setCurrentUserId(USERS.newUser);
    expect(await userApi.getUser()).toBeNull();
    await userApi.postUser({ name: "최유나", username: "yuna", userType: "부모", email: "" });
    expect(await userApi.getUser()).toMatchObject({ username: "yuna" });
  });

  it("rejects a username that's already taken", async () => {
    setCurrentUserId("demo|another");
    await expect(userApi.postUser({ name: "김", username: "jiyoung_kim", userType: "부모", email: "" }))
      .rejects.toEqual(new ApiError(400, "Username is already taken"));
  });

  it("links a student by share code", async () => {
    expect(await studentApi.getAllStudents()).toHaveLength(2);
    const preview = await studentApi.getStudentPreviewFromCode(STUDENT_CODES.doyun.toUpperCase());
    expect(preview?.name).toBe("박도윤");
    await studentApi.linkStudentFromCode(STUDENT_CODES.doyun);
    expect(await studentApi.getAllStudents()).toHaveLength(3);
  });

  it("returns null for an unknown share code", async () => {
    expect(await studentApi.getStudentPreviewFromCode("999999")).toBeNull();
  });

  it("returns no students for a new user", async () => {
    setCurrentUserId("demo|nobody");
    await expect(studentApi.getAllStudents()).resolves.toEqual([]);
  });

  it("rejects an invalid student", async () => {
    await expect(studentApi.postStudent({ name: "", school: "", age: 1, grade: 1, setting: "", disability: "" }))
      .rejects.toMatchObject({ status: 400 });
  });

  it("won't show a student to someone not linked to them", async () => {
    setCurrentUserId(USERS.parent);
    await expect(studentApi.getStudentFromCode(STUDENT_CODES.seoyeon)).rejects.toMatchObject({ status: 403 });
  });

  it("adds a dictionary entry", async () => {
    const before = await dictionaryApi.getDictionaryListings(STUDENT_CODES.minjun);
    await dictionaryApi.postDictionary({
      studentId: STUDENT_CODES.minjun, type: "MISC", title: "안아주세요", category: ["ATTENTION"],
    });
    const after = await dictionaryApi.getDictionaryListings(STUDENT_CODES.minjun);
    expect(after.listings).toHaveLength(before.listings.length + 1);
    expect(after.expressiontypes).toContain("MISC");
  });

  it("returns empty lists for a student with no dictionary entries", async () => {
    setCurrentUserId(USERS.therapist);
    await expect(dictionaryApi.getDictionaryListings(STUDENT_CODES.doyun))
      .resolves.toEqual({ listings: [], expressiontypes: [] });
  });

  it("rejects an invalid dictionary entry", async () => {
    await expect(dictionaryApi.postDictionary({
      studentId: STUDENT_CODES.minjun, type: "MISC", title: "", category: [],
    })).rejects.toMatchObject({ status: 400 });
  });

  it("returns 404 when deleting a missing dictionary entry", async () => {
    await expect(dictionaryApi.deleteDictionary(99999)).rejects.toMatchObject({ status: 404 });
  });

  it("pages the student feed newest first", async () => {
    const first = await feedApi.getFeed(STUDENT_CODES.minjun, 0);
    expect(first.feed).toHaveLength(10);
    expect(first.hasNext).toBe(true);
    await feedApi.postFeed({ id: STUDENT_CODES.minjun, body: { body: "새 글", emotions: ["HAPPY"] } });
    const updated = await feedApi.getFeed(STUDENT_CODES.minjun, 0);
    expect(updated.feed![0]).toMatchObject({ body: "새 글", user: { username: "jiyoung_kim" } });
  });

  it("rejects an empty feed post", async () => {
    await expect(feedApi.postFeed({ id: STUDENT_CODES.minjun, body: { body: "  ", emotions: [] } }))
      .rejects.toEqual(new ApiError(400, "Empty body"));
  });

  it("only lets the author delete a feed post", async () => {
    const { feed } = await feedApi.getFeed(STUDENT_CODES.minjun, 0);
    const parentPost = feed.find(item => item.user.username === "sujin_park")!;
    await expect(feedApi.deleteFeedItem(String(parentPost.id))).rejects.toMatchObject({ status: 403 });
  });

  it("groups projects and completes one when every member finishes", async () => {
    const projects = await projectApi.getProjectsOfStudent(STUDENT_CODES.minjun);
    expect(projects.current).toHaveLength(2);
    expect(projects.pending).toHaveLength(1);
    expect(projects.completed).toHaveLength(1);

    await projectApi.updateProjectStatus({ id: "1", value: true });
    setCurrentUserId(USERS.therapist);
    await projectApi.updateProjectStatus({ id: "1", value: true });

    const project = await projectApi.getProject("1");
    expect(project.completed).toBe(true);
    const feed = await projectApi.getProjectFeed("1");
    expect(feed.feed[0]).toMatchObject({ type: "EVENT", body: "프로젝트 완료되었다" });
  });

  it("returns project feed events without a user and comments with one", async () => {
    const { feed } = await projectApi.getProjectFeed(1);
    expect(feed.filter(item => item.type === "EVENT").every(item => item.user === null)).toBe(true);
    expect(feed.filter(item => item.type !== "EVENT").every(item => item.user?.username)).toBe(true);
    expect(feed[0].createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("refuses to delete system events from a project feed", async () => {
    const { feed } = await projectApi.getProjectFeed(1);
    const event = feed.find(item => item.type === "EVENT")!;
    await expect(projectApi.deleteComment(event.id)).rejects.toMatchObject({ status: 403 });
  });

  it("returns 404 for a missing project", async () => {
    await expect(projectApi.getProject(99999)).rejects.toMatchObject({ status: 404 });
  });

  it("only lets the creator edit a project", async () => {
    expect((await projectApi.getProject("1")).ownProject).toBe(true);
    expect((await projectApi.getProject("2")).ownProject).toBe(false);
    await expect(projectApi.deleteProject("2")).rejects.toMatchObject({ status: 403, message: "Unauthorized access" });
  });
});
