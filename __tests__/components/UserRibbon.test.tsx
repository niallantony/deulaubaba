import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { UserRibbon } from "@/components/UserRibbon";

// Mocks
jest.mock("@/hooks/useUserRibbon", () => ({
  useUserRibbon: jest.fn(),
}));

jest.mock("@/store/currentStudent", () => ({
  useStudentStore: jest.fn(),
}));

jest.mock("@/hooks/useModal", () => ({
  useModal: jest.fn(),
}));

// Components
// eslint ignore-next-line
const mockUseUserRibbon = require("@/hooks/useUserRibbon").useUserRibbon;
const mockUseStudentStore = require("@/store/currentStudent").useStudentStore;
const mockUseModal = require("@/hooks/useModal").useModal;

describe("UserRibbon", () => {
  const handleShowStudentCode = jest.fn();
  const fetchUsers = jest.fn();
  const show = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseModal.mockReturnValue({ show });
  });

  it("shows loading state", () => {
    mockUseUserRibbon.mockReturnValue({
      loading: true,
      users: [],
      fetchUsers,
    });
    mockUseStudentStore.mockReturnValue({ student: { studentId: "123" } });

    render(<UserRibbon handleShowStudentCode={handleShowStudentCode} />);

    expect(screen.getByTestId("loading")).toBeTruthy();
  });

  it("renders users when provided", async () => {
    mockUseUserRibbon.mockReturnValue({
      loading: false,
      users: [{ id: "u1", src: "http://example.com/img.png", type: "teacher" }],
      fetchUsers,
    });
    mockUseStudentStore.mockReturnValue({ student: { studentId: "123" } });

    render(<UserRibbon handleShowStudentCode={handleShowStudentCode} />);

    expect(await screen.findByText("teacher")).toBeTruthy();
  });

  it("clicking add user button calls handleShowStudentCode", () => {
    mockUseUserRibbon.mockReturnValue({
      loading: false,
      users: [],
      fetchUsers,
    });
    mockUseStudentStore.mockReturnValue({ student: { studentId: "123" } });

    render(<UserRibbon handleShowStudentCode={handleShowStudentCode} />);


    const button = screen.getByTestId("show-code");
    fireEvent.press(button);
    expect(handleShowStudentCode).toHaveBeenCalled();
  });

  it("clicking a user avatar opens modal", async () => {
    mockUseUserRibbon.mockReturnValue({
      loading: false,
      users: [{ id: "u1", src: "http://example.com/img.png", type: "teacher" }],
      fetchUsers,
    });
    mockUseStudentStore.mockReturnValue({ student: { studentId: "123" } });

    render(<UserRibbon handleShowStudentCode={handleShowStudentCode} />);

    const avatar = await screen.findByText("teacher");
    fireEvent.press(avatar.parent as any); // press the wrapping Pressable
    expect(show).toHaveBeenCalledWith("userDialog", { user: { id: "u1", src: "http://example.com/img.png", type: "teacher" } });
  });
});
