/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import { useUserRibbon } from "@/hooks/useUserRibbon";

import API from "@/api/student";

jest.mock("@/api/student", () => ({
  __esModule: true,
  default: {
    getUsersFromStudent: jest.fn()
  }
}));



describe("useUserRibbon", () => {
  it("fetches users an sets state correctly", async () => {
    const mockUsers = {
      users:
        [
          { username: "u1", userType: "student", imagesrc: "abc.png" },
        ]
    };


    (API.getUsersFromStudent as jest.Mock).mockResolvedValueOnce(mockUsers)

    const { result } = renderHook(() => useUserRibbon());

    expect(result.current.loading).toBe(false);
    expect(result.current.users).toBe(null);

    await act(async () => {
      await result.current.fetchUsers("student123");
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.users).toEqual(mockUsers.users);
    expect(API.getUsersFromStudent).toHaveBeenCalledWith("student123");
  });

  it("handles empty response", async () => {
    (API.getUsersFromStudent as jest.Mock).mockResolvedValue({ users: null });
    const { result } = renderHook(() => useUserRibbon());

    await act(async () => {
      await result.current.fetchUsers("student123");
    });

    expect(result.current.users).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it("resets loading on error", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => { });
    (API.getUsersFromStudent as jest.Mock).mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useUserRibbon());

    await act(async () => {
      await result.current.fetchUsers("student123");
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.users).toBe(null);
    spy.mockRestore();
  });
});
