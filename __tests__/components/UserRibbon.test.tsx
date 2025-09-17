import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { UserRibbon } from "@/components/UserRibbon";
import { useUserRibbon } from "@/hooks/useUserRibbon";
import { useModal } from "@/hooks/useModal";

jest.mock("@/hooks/useUserRibbon", () => ({
  __esModule: true,
  useUserRibbon: jest.fn(),
}));

jest.mock("@/hooks/useModal", () => ({
  __esModule: true,
  useModal: jest.fn()

}));

// TODO: add test for fetchUsers effect
describe("UserRibbon", () => {
  const handleShowStudentCode = jest.fn();
  const fetchUsers = jest.fn();
  const show = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state", () => {
    (useUserRibbon as jest.Mock).mockReturnValue({
      loading: true,
      users: [],
      fetchUsers,
    });
    // @ts-ignore
    render(
      <UserRibbon
        onPressShowStudentCode={handleShowStudentCode}
        studentId="123"
      />
    );

    expect(screen.getByTestId("loading")).toBeTruthy();
  });


  it("renders users when provided", async () => {
    (useUserRibbon as jest.Mock).mockReturnValue({
      loading: false,
      users: [{ id: "u1", src: "http://example.com/img.png", type: "teacher" }],
      fetchUsers,
    });
    (useModal as jest.Mock).mockReturnValue({
      show: show
    })

    render(
      <UserRibbon
        onPressShowStudentCode={handleShowStudentCode}
        studentId="123"
      />
    );

    expect(await screen.findByText("teacher")).toBeTruthy();
  });

  it("clicking add user button calls handleShowStudentCode", () => {
    (useUserRibbon as jest.Mock).mockReturnValue({
      loading: false,
      users: [],
      fetchUsers,
    });
    (useModal as jest.Mock).mockReturnValue({
      show: show
    })

    render(
      <UserRibbon
        onPressShowStudentCode={handleShowStudentCode}
        studentId="123"
      />
    )


    const button = screen.getByTestId("show-code");
    fireEvent.press(button);
    expect(handleShowStudentCode).toHaveBeenCalled();
  });

  it("clicking a user avatar opens modal", async () => {
    (useUserRibbon as jest.Mock).mockReturnValue({
      loading: false,
      users: [{ id: "u1", src: "http://example.com/img.png", type: "teacher" }],
      fetchUsers,
    });

    render(
      <UserRibbon
        onPressShowStudentCode={handleShowStudentCode}
        studentId="123"
      />
    )

    const avatar = await screen.findByText("teacher");
    fireEvent.press(avatar.parent as any); // press the wrapping Pressable
    expect(show).toHaveBeenCalledWith("userDialog", { user: { id: "u1", src: "http://example.com/img.png", type: "teacher" } });
  });
});
