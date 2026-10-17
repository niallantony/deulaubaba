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


    (API.getUsersFromStudent as jest.Mock).mockResolvedValueOnce(mockUsers.users)

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

  it("handles a student with no team", async () => {
    (API.getUsersFromStudent as jest.Mock).mockResolvedValue([]);
    const { result } = renderHook(() => useUserRibbon());

    await act(async () => {
      await result.current.fetchUsers("student123");
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it("resets loading on error", async () => {
    (API.getUsersFromStudent as jest.Mock).mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useUserRibbon());

    await act(async () => {
      await result.current.fetchUsers("student123");
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.users).toBe(null);
  });
});
