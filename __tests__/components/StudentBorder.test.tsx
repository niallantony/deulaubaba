import { render, fireEvent } from "@testing-library/react-native";
import { StudentBorder } from "@/components/StudentBorder";
import { Text } from 'react-native'

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() })
}));

describe("StudentBorder", () => {
  const mockStudent = { imagesrc: "avatar.png", studentId: "123", name: "student" };


  it("renders header and StudentAvatar when student is provided", () => {
    const { getByText, getByTestId } = render(
      <StudentBorder showModal={jest.fn()} student={mockStudent} title="Hello" subtitle="World">
        <></>
      </StudentBorder>
    );

    expect(getByText("Hello")).toBeTruthy();
    expect(getByText("World")).toBeTruthy();
    expect(getByTestId("image")).toBeTruthy();
  });

  it("does not render header when student is null", () => {
    const { queryByText } = render(
      <StudentBorder showModal={jest.fn()} student={null} title="Hello" subtitle="World">
        <></>
      </StudentBorder>
    );

    expect(queryByText("Hello")).toBeNull();
    expect(queryByText("World")).toBeNull();
  });

  it("renders children regardless of student", () => {
    const { getByText } = render(
      <StudentBorder showModal={jest.fn()} student={null} title="T" subtitle="S">
        <Text>Child content</Text>
      </StudentBorder>
    );
    expect(getByText("Child content")).toBeTruthy();
  });

  it("calls show with correct args when avatar pressed", () => {
    const mockShow = jest.fn();
    const { getByTestId } = render(
      <StudentBorder
        showModal={mockShow}
        student={mockStudent}
        title="T"
        subtitle="S"
      >
        <></>
      </StudentBorder>
    );

    jest.mock('@/hooks/useModal', () => ({
      useModal: () => ({
        show: mockShow,
        hide: jest.fn()
      })
    }))

    fireEvent.press(getByTestId("avatar-pressable"));

    expect(mockShow).toHaveBeenCalledWith(
      "studentAvatar",
      expect.objectContaining({
        onRequestSelect: expect.any(Function),
        onRequestEdit: expect.any(Function),
      })
    );
  });
});
