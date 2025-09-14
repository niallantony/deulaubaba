/**
  * @jest-environment jsdom
*/
import { ReactNode } from "react";
import { addStudentReducer, useAddStudent } from "@/hooks/useAddStudent";
import { Student } from '@/types/student'
import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import API from '@/api/student'

jest.mock("@/api/student", () => ({
  __esModule: true,
  default: {
    getStudentPreviewFromCode: jest.fn(),
    linkStudentFromCode: jest.fn(),
    postStudent: jest.fn()
  }
}))

const wrapper = ({ children }: { children: ReactNode }) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

describe("addStudentReducer", () => {
  const baseState = {
    screen: "add" as const,
    student: null,
    studentPreview: null,
    error: ""
  }

  it("resets to initial state", () => {
    const state = {
      ...baseState,
      screen: "confirm_new" as const,
      error: "bad",
    }
    const next = addStudentReducer(state, { type: "RESET" })
    expect(next).toEqual(baseState);
  })

  it("sets student", () => {
    const fakeStudent = {
      name: "Niall",
      school: "School",
      age: 1,
      grade: 2,
      setting: "Test",
      disability: "Test"
    } as Student
    const next = addStudentReducer(baseState, { type: "SET_STUDENT", student: fakeStudent })
    expect(next.student).toEqual(fakeStudent)
  })

  it("moves to confirm link screen", () => {
    const next = addStudentReducer(baseState, { type: "CONFIRM_LINK" })
    expect(next.screen).toBe("confirm_link")
  })

  it("moves to confirm new screen", () => {
    const next = addStudentReducer(baseState, { type: "CONFIRM_NEW" })
    expect(next.screen).toBe("confirm_new")
  })

  it("moves to code screen", () => {
    const next = addStudentReducer(baseState, { type: "INPUT_CODE" })
    expect(next.screen).toBe("code")
  })

  it("moves to register screen", () => {
    const next = addStudentReducer(baseState, { type: "MAKE_CODE" })
    expect(next.screen).toBe("register")
  })

  it("sets an error", () => {
    const next = addStudentReducer(baseState, { type: "SET_ERROR", error: "bad" })
    expect(next.error).toBe("bad")
  })

  it("sets a preview", () => {
    const fakePreview = {
      studentId: "abc",
      name: "niall",
    }
    const next = addStudentReducer(baseState, { type: "SET_PREVIEW", studentPreview: fakePreview })
    expect(next.studentPreview).toEqual(fakePreview)
  })

  it("returns previous state on unhandled action", () => {
    const next = addStudentReducer(baseState, { type: "UNHANDLED" })
    expect(next).toEqual(baseState)
  })
})


describe("useAddStudent", () => {
  let consoleErrorSpy: jest.SpyInstance

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });
  })

  afterEach(() => {
    (API.postStudent as jest.Mock).mockReset();
    (API.linkStudentFromCode as jest.Mock).mockReset();

  })

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  })

  it("handles valid student code", async () => {
    (API.getStudentPreviewFromCode as jest.Mock).mockResolvedValue({
      status: 200,
      student: { studentId: "123", name: "Jane", imagesrc: "/img" }
    })

    const { result } = renderHook(() => useAddStudent(), { wrapper })


    await act(async () => {
      const ok = await result.current.handleStudentCode("123")
      expect(ok).toBe(true)
    })

    expect(result.current.studentPreview?.studentId).toBe("123")
    expect(result.current.screen).toBe("confirm_link")
  })

  it("handles error from student code", async () => {
    (API.getStudentPreviewFromCode as jest.Mock).mockResolvedValueOnce({
      status: 401,
      message: "invalid code"
    })

    const { result } = renderHook(() => useAddStudent(), { wrapper })

    await act(async () => {
      const ok = await result.current.handleStudentCode("bad")
      expect(ok).toBe(false)
    })

    expect(result.current.error).toBe("invalid code")
  })

  it("handles error when thrown", async () => {
    (API.getStudentPreviewFromCode as jest.Mock).mockRejectedValue(new Error("error"))

    const { result } = renderHook(() => useAddStudent(), { wrapper })

    await act(async () => {
      const ok = await result.current.handleStudentCode("bad")
      expect(ok).toBe(false)
    })

    expect(result.current.error).toBe("Attempt Failed: Error: error ")
  })

  it("handles new student", async () => {

    const fakeStudent = {
      name: "Niall",
      school: "School",
      age: 1,
      grade: 2,
      setting: "Test",
      disability: "Test"
    } as Student

    const { result } = renderHook(() => useAddStudent(), { wrapper })

    await act(async () => {
      result.current.handleNewStudent(fakeStudent);
    })
    expect(result.current.student).toEqual(fakeStudent)
    expect(result.current.studentPreview).toEqual({
      name: fakeStudent.name,
    })
    expect(result.current.screen).toBe("confirm_new")
  })

  it("handles reset", async () => {
    const fakeStudent = {
      name: "Niall",
      school: "School",
      age: 1,
      grade: 2,
      setting: "Test",
      disability: "Test"
    } as Student

    const { result } = renderHook(() => useAddStudent(), { wrapper })

    await act(async () => {
      result.current.handleNewStudent(fakeStudent);
    })

    expect(result.current.student).toEqual(fakeStudent)

    await act(async () => {
      result.current.reset();
    })

    expect(result.current.student).toBeNull()
  })

  it("moves screens to input code", async () => {
    const { result } = renderHook(() => useAddStudent(), { wrapper })

    await act(async () => {
      result.current.inputCode();
    })

    expect(result.current.screen).toBe("code")
  })

  it("moves screens to make code", async () => {
    const { result } = renderHook(() => useAddStudent(), { wrapper })

    await act(async () => {
      result.current.makeCode();
    })

    expect(result.current.screen).toBe("register")
  })

  it("posts a student on submit student", async () => {
    const fakeStudent = {
      name: "Niall",
      school: "School",
      age: 1,
      grade: 2,
      setting: "Test",
      disability: "Test"
    } as Student

    const { result } = renderHook(() => useAddStudent(), { wrapper })

    await act(async () => {
      result.current.handleNewStudent(fakeStudent)
    })
    await act(async () => {
      result.current.submitStudent()
    })

    expect(API.postStudent).toHaveBeenCalled();
    expect(API.postStudent).toHaveBeenCalledWith(fakeStudent);
  })

  it("does nothing when submitted with no student", async () => {

    const { result } = renderHook(() => useAddStudent(), { wrapper })

    await act(async () => {
      result.current.submitStudent()
    })

    expect(API.postStudent).not.toHaveBeenCalled();
  })

  it("handles error when post fails", async () => {
    (API.postStudent as jest.Mock).mockRejectedValue(new Error("Not Posted"))
    const fakeStudent = {
      name: "Niall",
      school: "School",
      age: 1,
      grade: 2,
      setting: "Test",
      disability: "Test"
    } as Student

    const { result } = renderHook(() => useAddStudent(), { wrapper })

    await act(async () => {
      result.current.handleNewStudent(fakeStudent)
    })
    await act(async () => {
      result.current.submitStudent()
    })
    expect(result.current.error).toBe("Student Submission failed: Not Posted")

  })

  it("calls linkStudent with student preview's code", async () => {
    (API.getStudentPreviewFromCode as jest.Mock).mockResolvedValue({
      status: 200,
      student: { studentId: "123", name: "Jane", imagesrc: "/img" }
    })

    const { result } = renderHook(() => useAddStudent(), { wrapper })

    await act(async () => {
      const ok = await result.current.handleStudentCode("123")
      expect(ok).toBe(true)
    })

    await act(async () => {
      result.current.linkStudent();
    })

    expect(API.linkStudentFromCode).toHaveBeenCalled()
    expect(API.linkStudentFromCode).toHaveBeenCalledWith("123")
  })

  it("handles errors when linkStudent fails", async () => {
    (API.getStudentPreviewFromCode as jest.Mock).mockResolvedValue({
      status: 200,
      student: { studentId: "123", name: "Jane", imagesrc: "/img" }
    });
    (API.linkStudentFromCode as jest.Mock).mockRejectedValue(new Error("No such student"))

    const { result } = renderHook(() => useAddStudent(), { wrapper })

    await act(async () => {
      const ok = await result.current.handleStudentCode("123")
      expect(ok).toBe(true)
    })

    await act(async () => {
      result.current.linkStudent();
    })

    expect(result.current.error).toBe("Link failed: No such student")
  })

  it("doesn't link when studentId is missing", async () => {
    const { result } = renderHook(() => useAddStudent(), { wrapper })

    await act(async () => {
      result.current.linkStudent();
    })

    expect(API.linkStudentFromCode).not.toHaveBeenCalled();
  })
})
