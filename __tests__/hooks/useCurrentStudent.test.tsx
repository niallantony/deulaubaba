/**
  * @jest-environment jsdom
*/
import { ReactNode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCurrentStudent } from "@/hooks/useCurrentStudent";
import { useUpdateStudent } from "@/hooks/useUpdateStudent";
import { useStudentStore } from "@/store/currentStudent";

import API from "@/api/student";

jest.mock("@/api/student", () => ({
  __esModule: true,
  default: {
    getAllStudents: jest.fn(),
    getStudentFromCode: jest.fn(),
    putStudentInfo: jest.fn(),
  }
}))

const wrapper = ({ children }: { children: ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

const useBoth = () => ({ current: useCurrentStudent(), update: useUpdateStudent() })

describe("useCurrentStudent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useStudentStore.setState({ studentId: "abc" });
  })

  it("returns the selected student from the student list", async () => {
    (API.getAllStudents as jest.Mock).mockResolvedValue([
      { studentId: "xyz", name: "Other" },
      { studentId: "abc", name: "Minjun", imagesrc: "a.png" },
    ]);
    const { result } = renderHook(() => useCurrentStudent(), { wrapper });

    await waitFor(() => expect(result.current).toEqual({ studentId: "abc", name: "Minjun", imagesrc: "a.png" }));
  })

  it("returns null when no student is selected", async () => {
    useStudentStore.setState({ studentId: null });
    (API.getAllStudents as jest.Mock).mockResolvedValue([{ studentId: "abc", name: "Minjun" }]);
    const { result } = renderHook(() => useCurrentStudent(), { wrapper });

    await waitFor(() => expect(API.getAllStudents).toHaveBeenCalled());
    expect(result.current).toBeNull();
  })

  it("picks up a new name after the student's details are edited", async () => {
    (API.getAllStudents as jest.Mock).mockResolvedValueOnce([{ studentId: "abc", name: "Minjun" }]);
    (API.putStudentInfo as jest.Mock).mockResolvedValue(undefined);
    const { result } = renderHook(useBoth, { wrapper });
    await waitFor(() => expect(result.current.current?.name).toBe("Minjun"));

    (API.getAllStudents as jest.Mock).mockResolvedValueOnce([{ studentId: "abc", name: "Seojun" }]);
    await act(async () => {
      await result.current.update.updateDetails.mutateAsync({
        studentId: "abc", name: "Seojun", school: "", age: 8, grade: 2, setting: "", disability: "",
      });
    });

    await waitFor(() => expect(result.current.current?.name).toBe("Seojun"));
  })
})
